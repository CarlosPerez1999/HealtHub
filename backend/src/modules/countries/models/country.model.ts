import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CountryObject {
  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  phonePrefix: string;
}
