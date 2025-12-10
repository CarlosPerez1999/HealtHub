import { InputType, Field } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class CreateMedicalEventTypeInput {
  @Field()
  @IsString()
  @Length(1, 64)
  code: string;

  @Field()
  @IsString()
  @Length(1, 255)
  description: string;
}
