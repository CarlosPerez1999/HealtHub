import { Field, ObjectType } from '@nestjs/graphql';
import { VisibilityLevelEnum } from '../enums/visibility-level.enum';

@ObjectType()
export class VisibilityLevelObject {
  @Field(() => VisibilityLevelEnum)
  code: VisibilityLevelEnum;
}
