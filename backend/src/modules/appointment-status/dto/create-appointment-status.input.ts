import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateAppointmentStatusInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  code: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;
}
