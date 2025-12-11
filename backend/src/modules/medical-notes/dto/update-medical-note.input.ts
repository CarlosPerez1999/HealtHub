import { InputType, PartialType } from '@nestjs/graphql';
import { CreateMedicalNoteInput } from './create-medical-note.input';

@InputType()
export class UpdateMedicalNoteInput extends PartialType(CreateMedicalNoteInput) {}
