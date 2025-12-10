import { InputType, Field } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class CreateCountryInput {
  @Field()
  @IsString()
  @Length(1, 8)
  code: string;

  @Field()
  @IsString()
  @Length(1, 100)
  name: string;

  @Field()
  @IsString()
  @Length(1, 8)
  phonePrefix: string;
}
