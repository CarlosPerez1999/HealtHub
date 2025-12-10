import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SpecialtyObject {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  code?: string;

  @Field()
  name: string;
}
