import { Inject, Injectable } from "@nestjs/common";
import {PassportStrategy} from '@nestjs/passport'
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy} from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt'){
constructor(@Inject(ConfigService) configService: ConfigService){
  super({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false,
    secretOrKey: configService.getOrThrow<string>('JWT_SECRET')
  })

} 
  async validate(payload: JwtPayload ){
    return {
      ...payload
    }
  }
}