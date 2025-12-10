import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class VisibilityLevelObject {
  @Field()
  code: string;

  @Field({ nullable: true })
  description?: string;
  
  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
 
}
