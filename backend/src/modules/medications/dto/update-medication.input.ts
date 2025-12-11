import { InputType, PartialType } from '@nestjs/graphql';
import { CreateMedicationInput } from './create-medication.input';

@InputType()
export class UpdateMedicationInput extends PartialType(CreateMedicationInput) {}
