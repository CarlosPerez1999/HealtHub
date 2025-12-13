import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class SpecialtyObject {
  @Field()
  code: string;

  @Field()
  name: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
 
}
