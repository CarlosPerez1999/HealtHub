import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class IdentityTypeObject {
  @Field()
  code: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  value?: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
 
}
