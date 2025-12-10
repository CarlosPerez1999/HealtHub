import { Field, ID, ObjectType } from '@nestjs/graphql';

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
}
