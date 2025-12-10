import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PatientObject } from '../../patients/models/patient.model';
import { DoctorObject } from '../../doctors/models/doctor.model';
import { AppointmentTypeObject } from '../../appointment-types/models/appointment-type.model';
import { AppointmentStatusObject } from '../../appointment-status/models/appointment-status.model';

@ObjectType('Appointment')
export class AppointmentObject {
  @Field(() => ID)
  id: string;

  @Field(() => PatientObject)
  patient: PatientObject;

  @Field(() => DoctorObject)
  doctor: DoctorObject;

  @Field(() => AppointmentTypeObject)
  appointmentType: AppointmentTypeObject;

  @Field(() => AppointmentStatusObject)
  status: AppointmentStatusObject;

  @Field()
  scheduledAt: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
