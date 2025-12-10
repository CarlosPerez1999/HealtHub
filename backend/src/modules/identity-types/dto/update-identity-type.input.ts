import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateIdentityTypeInput } from './create-identity-type.input';
import { IsString } from 'class-validator';

@InputType()
export class UpdateIdentityTypeInput extends PartialType(CreateIdentityTypeInput) {
  @Field()
  @IsString()
  code: string;
}
