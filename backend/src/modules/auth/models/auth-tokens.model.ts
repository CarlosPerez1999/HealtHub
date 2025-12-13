import { Field, ObjectType } from '@nestjs/graphql';
import { UserObject } from '../../users/models/user.model';

@ObjectType()
export class AuthTokensObject {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => UserObject, { nullable: true })
  user?: UserObject;
}
