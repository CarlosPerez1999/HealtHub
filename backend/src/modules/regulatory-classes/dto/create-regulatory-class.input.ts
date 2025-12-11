import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreateRegulatoryClassInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  code: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;
}
