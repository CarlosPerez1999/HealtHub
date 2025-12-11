import { ObjectType, Field, ID } from '@nestjs/graphql';
import { RegulatoryClassObject } from '../../regulatory-classes/models/regulatory-class.model';

@ObjectType('Medication')
export class MedicationObject {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  atcCode?: string;

  @Field({ nullable: true })
  strength?: string;

  @Field({ nullable: true })
  form?: string;

  @Field({ nullable: true })
  unit?: string;

  @Field(() => RegulatoryClassObject, { nullable: true })
  regulatoryClass?: RegulatoryClassObject;

  @Field({ nullable: true })
  indications?: string;

  @Field({ nullable: true })
  dosageGuidelines?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
