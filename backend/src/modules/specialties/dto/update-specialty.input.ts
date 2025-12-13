import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';
import { CreateSpecialtyInput } from './create-specialty.input';
import { IsString } from 'class-validator';

@InputType()
export class UpdateSpecialtyInput extends PartialType(OmitType(CreateSpecialtyInput, ['code'])) {
  @Field()
  @IsString()
  code: string;
}
