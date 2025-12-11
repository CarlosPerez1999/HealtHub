import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../../common/factories/pagination.factory';
import { MedicalEventTypeObject } from './medical-event-type.model';

@ObjectType()
export class PaginatedMedicalEventTypes extends Paginated(MedicalEventTypeObject) {}
