import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/factories/pagination.factory';
import { PrescriptionStatusObject } from './prescription-status.model';

@ObjectType()
export class PaginatedPrescriptionStatuses extends Paginated(PrescriptionStatusObject) {}
