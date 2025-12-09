import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { RoleObject } from 'src/modules/roles/models/role.model';

@ObjectType()
export class UserObject {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field(() => RoleObject, { nullable: true })
  role?: RoleObject;

  @Field()
  active: boolean;

  @Field({ name: 'emailVerified' })
  emailVerified: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  lastLogin?: Date;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
