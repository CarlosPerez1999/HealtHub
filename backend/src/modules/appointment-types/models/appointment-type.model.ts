import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('AppointmentType')
export class AppointmentTypeObject {
  @Field(() => ID)
  id: string;

  @Field()
  code: string;

  @Field()
  description: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
