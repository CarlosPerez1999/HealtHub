import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { GoogleStrategy } from './startegies/google.strategy';
import { TokenService } from './token.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => ({
        secret: configService.get<string>('JWT_SECRET') ?? 'change_this_secret',
        signOptions: { expiresIn: (configService.get<string>('JWT_EXPIRES') ?? '15m') as any },
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthResolver, AuthService, GoogleStrategy, TokenService],
})
export class AuthModule {}
