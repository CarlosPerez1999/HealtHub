import { InputType, PartialType } from '@nestjs/graphql';
import { CreateAppointmentStatusInput } from './create-appointment-status.input';

@InputType()
export class UpdateAppointmentStatusInput extends PartialType(CreateAppointmentStatusInput) {}
