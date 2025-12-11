import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../../common/factories/pagination.factory';
import { AppointmentTypeObject } from './appointment-type.model';

@ObjectType()
export class PaginatedAppointmentTypes extends Paginated(AppointmentTypeObject) {}
