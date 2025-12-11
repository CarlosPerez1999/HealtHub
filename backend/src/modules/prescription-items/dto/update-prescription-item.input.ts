import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsUUID, IsString, IsOptional } from 'class-validator';
import { CreatePrescriptionItemInput } from './create-prescription-item.input';

@InputType()
export class UpdatePrescriptionItemInput extends PartialType(CreatePrescriptionItemInput) {
	@Field({ nullable: true })
	@IsUUID()
	@IsOptional()
	prescriptionId?: string;

	@Field({ nullable: true })
	@IsUUID()
	@IsOptional()
	medicationId?: string;

	@Field({ nullable: true })
	@IsString()
	@IsOptional()
	dose?: string;

	@Field({ nullable: true })
	@IsString()
	@IsOptional()
	frequency?: string;

	@Field({ nullable: true })
	@IsString()
	@IsOptional()
	duration?: string;

	@Field({ nullable: true })
	@IsString()
	@IsOptional()
	route?: string;

	@Field({ nullable: true })
	@IsString()
	@IsOptional()
	instructions?: string;
}
