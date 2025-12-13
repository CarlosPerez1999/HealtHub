import { InputType, Field } from '@nestjs/graphql';
import { IsUUID, IsNotEmpty, IsString, IsDateString } from 'class-validator';

@InputType()
export class CreateAppointmentInput {
  @Field()
  @IsUUID()
  patientId: string;

  @Field()
  @IsUUID()
  doctorId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  appointmentTypeCode: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  statusCode: string;

  @Field()
  @IsDateString()
  scheduledAt: string;
}
