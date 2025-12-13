import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateDoctorInput {
  @Field()
  @IsString()
  userId: string;

  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  specialtyCode?: string;

  @Field()
  @IsString()
  licenseNumber: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  licenseCountry?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  boardCertified?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;
}
