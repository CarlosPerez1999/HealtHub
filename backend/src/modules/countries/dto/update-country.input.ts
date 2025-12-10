import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateCountryInput } from './create-country.input';
import { IsString, Length } from 'class-validator';

@InputType()
export class UpdateCountryInput extends PartialType(CreateCountryInput) {
  @Field()
  @IsString()
  @Length(1, 8)
  code: string;
}
