import { ObjectType, Field, ID } from '@nestjs/graphql';
import { AppointmentObject } from '../../appointments/models/appointment.model';
import { DoctorObject } from '../../doctors/models/doctor.model';

@ObjectType('MedicalNote')
export class MedicalNoteObject {
  @Field(() => ID)
  id: string;
  @Field(() => AppointmentObject)
  appointment: AppointmentObject;
  @Field(() => DoctorObject)
  doctor: DoctorObject;
  @Field()
  content: string;
  @Field()
  createdAt: Date;
}
