import { InputType, Field } from '@nestjs/graphql';
import { IsUUID, IsString, IsOptional, IsDateString } from 'class-validator';

@InputType()
export class CreatePrescriptionInput {
  @Field()
  @IsUUID()
  medicalNoteId: string;

  @Field()
  @IsUUID()
  doctorId: string;

  @Field()
  @IsUUID()
  patientId: string;

  @Field()
  @IsDateString()
  issuedAt: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  expiresAt?: Date;

  @Field()
  @IsString()
  statusCode: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;
}
