import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateAddressInput } from './create-address.input';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateAddressInput extends PartialType(CreateAddressInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
