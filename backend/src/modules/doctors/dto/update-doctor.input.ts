import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateDoctorInput } from './create-doctor.input';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateDoctorInput extends PartialType(CreateDoctorInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
