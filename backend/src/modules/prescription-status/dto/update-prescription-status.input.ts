import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePrescriptionStatusInput } from './create-prescription-status.input';

@InputType()
export class UpdatePrescriptionStatusInput extends PartialType(CreatePrescriptionStatusInput) {}
