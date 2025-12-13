import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, Length, IsOptional, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PatientProfileInput } from '../../patients/dto/patient-profile.input';
import { DoctorProfileInput } from '../../doctors/dto/doctor-profile.input';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @Length(6, 128)
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  roleCode?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  emailVerified?: boolean;

  @Field(() => PatientProfileInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => PatientProfileInput)
  patientProfile?: PatientProfileInput;

  @Field(() => DoctorProfileInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => DoctorProfileInput)
  doctorProfile?: DoctorProfileInput;
}
