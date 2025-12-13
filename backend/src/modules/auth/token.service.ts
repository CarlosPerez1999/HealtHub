import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async generateTokens(payload: { sub: string; role: Role }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET') ?? 'change_this_secret',
        expiresIn: (this.configService.get<string>('JWT_EXPIRES') ?? '15m') as any,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET') ?? 'change_this_refresh_secret',
        expiresIn: (this.configService.get<string>('JWT_REFRESH_EXPIRES') ?? '7d') as any,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async saveRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async verifyRefreshToken(userId: string, refreshToken: string): Promise<boolean> {
    if (!refreshToken) return false;
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'refreshToken'],
    });
    if (!user || !user.refreshToken) return false;
    try {
      const match = await bcrypt.compare(refreshToken, user.refreshToken);
      return match;
    } catch (e) {
      this.logger.warn(`Error verifying refresh token for user ${userId}`);
      return false;
    }
  }

  async verifyAccessToken(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('JWT_SECRET') ?? 'change_this_secret',
    });
  }
}
