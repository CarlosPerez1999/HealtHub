import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('RegulatoryClass')
export class RegulatoryClassObject {
  @Field()
  code: string;

  @Field()
  description: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
