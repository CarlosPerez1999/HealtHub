import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { UserObject } from 'src/modules/users/models/user.model';
import { SpecialtyObject } from 'src/modules/specialties/models/specialty.model';

@ObjectType()
export class DoctorObject {
  @Field(() => ID)
  id: string;

  @Field(() => UserObject)
  user: UserObject;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => SpecialtyObject, { nullable: true })
  specialty?: SpecialtyObject;

  @Field()
  licenseNumber: string;

  @Field({ nullable: true })
  licenseCountry?: string;

  @Field()
  boardCertified: boolean;

  @Field({ nullable: true })
  phone?: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
