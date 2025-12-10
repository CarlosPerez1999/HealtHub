import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { UserObject } from 'src/modules/users/models/user.model';

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

  @Field({ nullable: true })
  identityTypeId?: string;

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
