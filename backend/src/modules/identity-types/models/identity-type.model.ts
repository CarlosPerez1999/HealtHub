import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IdentityTypeObject {
  @Field()
  code: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  value?: string;
}
