import { InputType, Field } from '@nestjs/graphql';
import { IsString, MaxLength } from 'class-validator';

@InputType()
export class CreatePrescriptionStatusInput {
  @Field()
  @IsString()
  @MaxLength(32)
  code: string;
}
