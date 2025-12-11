import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { UserObject } from '../../users/models/user.model';
import { IdentityTypeObject } from '../../identity-types/models/identity-type.model';

@ObjectType()
export class PatientObject {
  @Field(() => ID)
  id: string;

  @Field(() => UserObject)
  user: UserObject;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => GraphQLISODateTime)
  dateOfBirth: Date;

  @Field(() => IdentityTypeObject, { nullable: true })
  identityType?: IdentityTypeObject;

  @Field({ nullable: true })
  nationalId?: string;

  @Field({ nullable: true })
  nationalityCode?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
