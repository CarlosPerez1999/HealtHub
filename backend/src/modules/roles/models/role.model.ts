import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class RoleObject {
  @Field()
  code: string;

  @Field()
  description: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
