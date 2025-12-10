import { InputType, Field } from '@nestjs/graphql';
import { IsString, Length, IsUUID } from 'class-validator';

@InputType()
export class CreateStateInput {
  @Field()
  @IsString()
  @Length(1, 100)
  name: string;

  @Field()
  @IsString()
  @Length(1, 16)
  stateCode: string;

  @Field()
  @IsString()
  @Length(1, 8)
  countryCode: string;
}
