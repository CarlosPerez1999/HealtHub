import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MedicalEventTypeObject {
  @Field()
  code: string;

  @Field()
  description: string;
}
