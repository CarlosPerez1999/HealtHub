import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, MaxLength, IsUUID } from 'class-validator';

@InputType()
export class CreateMedicationInput {
  @Field()
  @IsString()
  @MaxLength(255)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  atcCode?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  strength?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  form?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  unit?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  regulatoryClassId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  indications?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  dosageGuidelines?: string;
}
