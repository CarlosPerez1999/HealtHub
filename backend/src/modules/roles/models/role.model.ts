import { Field, Int, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { RoleEnum } from 'src/modules/roles/enums/roles.enum';

@ObjectType()
export class RoleObject {
  @Field((type) => Int)
  id: number;
  @Field((type) => RoleEnum)
  code: RoleEnum;
  @Field()
  description: string;
  @Field(() => GraphQLISODateTime)
  createdAt: Date;
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
