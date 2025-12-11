import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../../common/factories/pagination.factory';
import { AppointmentStatusObject } from './appointment-status.model';

@ObjectType()
export class PaginatedAppointmentStatuses extends Paginated(AppointmentStatusObject) {}
