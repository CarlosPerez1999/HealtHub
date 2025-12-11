import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { UserObject } from '../../users/models/user.model';
import { StateObject } from '../../states/models/state.model';
import { CountryObject } from '../../countries/models/country.model';

@ObjectType()
export class AddressObject {
  @Field(() => ID)
  id: string;

  @Field(() => UserObject)
  user: UserObject;

  @Field()
  line1: string;

  @Field()
  line2: string;

  @Field()
  city: string;

  @Field()
  postalCode: string;

  @Field(() => StateObject)
  state: StateObject;

  @Field(() => CountryObject)
  country: CountryObject;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
