import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { PatientObject } from '../../patients/models/patient.model';
import { MedicalEventTypeObject } from '../../medical-event-types/models/medical-event-type.model';
import { VisibilityLevelObject } from '../../visibility-levels/models/visibility-level.model';

@ObjectType()
export class MedicalHistoryObject {
  @Field(() => ID)
  id: string;

  @Field(() => PatientObject)
  patient: PatientObject;

  @Field(() => MedicalEventTypeObject)
  eventType: MedicalEventTypeObject;

  @Field({ nullable: true })
  icd10Code?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => VisibilityLevelObject, { nullable: true })
  visibility?: VisibilityLevelObject;

  @Field(() => GraphQLISODateTime, { nullable: true })
  occurredAt?: Date;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
