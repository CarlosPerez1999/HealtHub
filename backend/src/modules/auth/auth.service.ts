import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenService } from './token.service';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload';
import { access } from 'fs';
import { Role } from '../roles/entities/role.entity';
import { handleServiceError } from 'src/common/utils/error-handler';
import { CreateUserInput } from '../users/dto/create-user.input';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const { username, password } = loginDto;
      const user = await this.userRepository.findOne({
        where: {
          username,
        },
        select: ['id', 'email', 'username', 'password', 'role', 'active'],
      });
      if (!user) {
        throw new NotFoundException(`User with username ${username} not found`);
      }
      if (!user.active) {
        throw new UnauthorizedException('User account is inactive');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = {
        sub: user.id,
        role: user.role,
      };

      const tokens = await this.tokenService.generateTokens(payload);
      await this.tokenService.saveRefreshToken(user.id, tokens.refreshToken);
      return { user, tokens };
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async register(createUserDto: CreateUserInput) {
    return await this.usersService.create(createUserDto);
  }

  async logout(id: string) {
    await this.userRepository.update(id, {
      refreshToken: null,
    });
  }

  async me(token: string) {
    try {
      const payload = await this.tokenService.verifyAccessToken(token);
      return { valid: true, payload };
    } catch (error) {
      return { valid: false, error: 'Token inválido o expirado' };
    }
  }

  async refreshTokens(id: string, refreshToken: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'role'],
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const valid = await this.tokenService.verifyRefreshToken(id, refreshToken);
    if (!valid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload = {
      sub: user.id,
      role: user.role,
    };

    const tokens = await this.tokenService.generateTokens(payload);
    await this.tokenService.saveRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async validateOAuthLogin(oauthUser: any) {
    try {
      const email = oauthUser?.email?.toLowerCase?.() ?? null;

      let user: User | null = null;
      if (email) {
        user = await this.usersService.findByEmail(email);
      }

      if (!user) {
        const base = oauthUser.displayName
          ? oauthUser.displayName.replace(/\s+/g, '').toLowerCase()
          : email
            ? email.split('@')[0]
            : 'user';
        const username = `${base}${Math.floor(Math.random() * 10000)}`;
        const randomPassword =
          Math.random().toString(36).slice(-12) +
          Date.now().toString(36).slice(-4);

        const createInput: Partial<CreateUserInput> = {
          username,
          email: email,
          password: randomPassword,
          active: true,
          emailVerified: true,
        } as Partial<CreateUserInput>;

        user = await this.usersService.create(createInput as CreateUserInput);
      }

      // generate tokens and update refresh token
      const payload = { sub: user.id, role: user.role };
      const tokens = await this.tokenService.generateTokens(payload);
      await this.tokenService.saveRefreshToken(user.id, tokens.refreshToken);

      return { user, tokens };
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }
}
