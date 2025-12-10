import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateMedicalEventTypeInput } from './create-medical-event-type.input';
import { IsString } from 'class-validator';

@InputType()
export class UpdateMedicalEventTypeInput extends PartialType(CreateMedicalEventTypeInput) {
  @Field()
  @IsString()
  code: string;
}
