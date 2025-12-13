import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthTokensObject } from './models/auth-tokens.model';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Mutation(() => AuthTokensObject)
  async login(@Args('login') loginDto: LoginDto) {
    const result = await this.authService.login(loginDto as any);
    return {
      accessToken: result.tokens.accessToken,
      refreshToken: result.tokens.refreshToken,
      user: result.user,
    };
  }

  @Mutation(() => AuthTokensObject)
  async refreshTokens(@Args('refreshToken') refreshToken: string) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET') ?? 'change_this_refresh_secret',
    });
    const userId = payload.sub as string;
    const tokens = await this.authService.refreshTokens(userId, refreshToken);
    const user = await this.usersService.findOne(userId);
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user,
    };
  }
}
