import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/factories/pagination.factory';
import { PrescriptionItemObject } from './prescription-item.model';

@ObjectType()
export class PaginatedPrescriptionItems extends Paginated(PrescriptionItemObject) {}
