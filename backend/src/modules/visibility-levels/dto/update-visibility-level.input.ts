import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateVisibilityLevelInput } from './create-visibility-level.input';
import { IsEnum } from 'class-validator';
import { VisibilityLevelEnum } from '../enums/visibility-level.enum';

@InputType()
export class UpdateVisibilityLevelInput extends PartialType(CreateVisibilityLevelInput) {
  @Field(() => VisibilityLevelEnum)
  @IsEnum(VisibilityLevelEnum)
  code: VisibilityLevelEnum;
}
