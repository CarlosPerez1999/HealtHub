import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VisibilityLevelObject {
  @Field()
  code: string;

  @Field({ nullable: true })
  description?: string;
}
