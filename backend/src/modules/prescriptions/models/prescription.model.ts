import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PatientObject } from '../../patients/models/patient.model';
import { DoctorObject } from '../../doctors/models/doctor.model';
import { PrescriptionStatusObject } from '../../prescription-status/models/prescription-status.model';
import { MedicalNoteObject } from '../../medical-notes/models/medical-note.model';

@ObjectType('Prescription')
export class PrescriptionObject {
  @Field(() => ID)
  id: string;
  @Field(() => PatientObject)
  patient: PatientObject;
  @Field(() => DoctorObject)
  doctor: DoctorObject;
  @Field({ nullable: true })
  notes?: string;
  @Field(() => PrescriptionStatusObject)
  status: PrescriptionStatusObject;
  @Field(() => [MedicalNoteObject], { nullable: true })
  medicalNotes?: MedicalNoteObject[];
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
