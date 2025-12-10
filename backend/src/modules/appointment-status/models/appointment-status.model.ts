import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('AppointmentStatus')
export class AppointmentStatusObject {
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
