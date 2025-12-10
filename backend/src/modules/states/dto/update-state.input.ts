import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateStateInput } from './create-state.input';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateStateInput extends PartialType(CreateStateInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
