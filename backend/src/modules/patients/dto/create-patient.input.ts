import { Field, ID, InputType, GraphQLISODateTime } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID, IsDateString } from 'class-validator';

@InputType()
export class CreatePatientInput {
  @Field(() => ID)
  @IsUUID()
  userId: string;

  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;

  @Field(() => GraphQLISODateTime)
  @IsDateString()
  dateOfBirth: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  identityTypeId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  nationalId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  nationalityCode?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;
}
