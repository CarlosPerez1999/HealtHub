import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsOptional, IsString } from 'class-validator';

@InputType()
export class PatientProfileInput {
  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;

  @Field()
  @IsDateString()
  dateOfBirth: string;

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
