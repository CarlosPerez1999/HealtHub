import { InputType, Field } from '@nestjs/graphql';
import { IsUUID, IsString } from 'class-validator';

@InputType()
export class CreateMedicalNoteInput {
  @Field()
  @IsUUID()
  appointmentId: string;

  @Field()
  @IsUUID()
  doctorId: string;

  @Field()
  @IsString()
  content: string;
}
