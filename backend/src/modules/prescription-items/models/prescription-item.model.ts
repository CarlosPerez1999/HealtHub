import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { PrescriptionObject } from '../../prescriptions/models/prescription.model';
import { MedicationObject } from '../../medications/models/medication.model';

@ObjectType('PrescriptionItem')
export class PrescriptionItemObject {
  @Field(() => ID)
  id: string;
  @Field(() => PrescriptionObject)
  prescription: PrescriptionObject;
  @Field(() => MedicationObject)
  medication: MedicationObject;
  @Field(() => Int)
  quantity: number;
  @Field()
  dosage: string;
  @Field()
  createdAt: Date;
}
