import { Field, ID, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateDoctorInput {
  @Field(() => ID)
  @IsUUID()
  userId: string;

  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  specialtyId?: string;

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
