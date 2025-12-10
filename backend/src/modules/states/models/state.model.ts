import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class StateObject {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  stateCode: string;

  @Field()
  countryCode: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
 
}
