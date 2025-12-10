import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateVisibilityLevelInput } from './create-visibility-level.input';
import { IsEnum } from 'class-validator';

@InputType()
export class UpdateVisibilityLevelInput extends PartialType(CreateVisibilityLevelInput) {
  @Field()
  @IsString()
  @Length(1, 64)
  code: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  description?: string;
}
