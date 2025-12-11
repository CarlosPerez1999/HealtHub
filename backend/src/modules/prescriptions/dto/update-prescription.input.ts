import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsUUID, IsString, IsOptional, IsDateString } from 'class-validator';
import { CreatePrescriptionInput } from './create-prescription.input';

@InputType()
export class UpdatePrescriptionInput extends PartialType(CreatePrescriptionInput) {
	@Field({ nullable: true })
	@IsUUID()
	@IsOptional()
	medicalNoteId?: string;

	@Field({ nullable: true })
	@IsUUID()
	@IsOptional()
	doctorId?: string;

	@Field({ nullable: true })
	@IsUUID()
	@IsOptional()
	patientId?: string;

	@Field({ nullable: true })
	@IsDateString()
	@IsOptional()
	issuedAt?: Date;

	@Field({ nullable: true })
	@IsDateString()
	@IsOptional()
	expiresAt?: Date;

	@Field({ nullable: true })
	@IsString()
	@IsOptional()
	statusCode?: string;

	@Field({ nullable: true })
	@IsString()
	@IsOptional()
	notes?: string;
}
