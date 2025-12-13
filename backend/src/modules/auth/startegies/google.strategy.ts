import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService, private configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID') ?? 'dummy_client_id',
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET') ?? 'dummy_secret',
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL') ?? 'http://localhost:3000/auth/google/callback',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, displayName, name, emails, photos } = profile;

    const userInfo = {
      provider: 'google',
      providerId: id,
      displayName,
      email: emails && emails[0]?.value,
      firstName: name?.givenName,
      lastName: name?.familyName,
      accessToken,
      refreshToken,
    };

    const payload = await this.authService.validateOAuthLogin(userInfo);

    done(null, payload);
  }
}
