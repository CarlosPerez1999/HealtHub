import { Field, ID, InputType, GraphQLISODateTime } from '@nestjs/graphql';
import { IsUUID, IsString, IsOptional, IsDateString } from 'class-validator';

@InputType()
export class CreateMedicalHistoryInput {
  @Field(() => ID)
  @IsUUID()
  patientId: string;

  @Field()
  @IsString()
  eventTypeCode: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  icd10Code?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  visibilityCode?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  @IsDateString()
  occurredAt?: string;
}
