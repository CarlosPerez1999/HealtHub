import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateAppointmentTypeInput } from './create-appointment-type.input';

@InputType()
export class UpdateAppointmentTypeInput extends PartialType(CreateAppointmentTypeInput) {}
