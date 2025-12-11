import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('PrescriptionStatus')
export class PrescriptionStatusObject {
  @Field()
  code: string;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
