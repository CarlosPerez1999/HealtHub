import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateSpecialtyInput } from './create-specialty.input';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateSpecialtyInput extends PartialType(CreateSpecialtyInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
