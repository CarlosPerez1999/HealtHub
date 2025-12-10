import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/factories/pagination.factory';
import { AppointmentObject } from './appointment.model';

@ObjectType()
export class PaginatedAppointments extends Paginated(AppointmentObject) {}
