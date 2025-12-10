import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreatePatientInput } from './create-patient.input';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdatePatientInput extends PartialType(CreatePatientInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
