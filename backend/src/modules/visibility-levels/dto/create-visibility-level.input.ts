import { InputType, Field } from '@nestjs/graphql';
import { VisibilityLevelEnum } from '../enums/visibility-level.enum';
import { IsEnum } from 'class-validator';

@InputType()
export class CreateVisibilityLevelInput {
  @Field(() => VisibilityLevelEnum)
  @IsEnum(VisibilityLevelEnum)
  code: VisibilityLevelEnum;
}
