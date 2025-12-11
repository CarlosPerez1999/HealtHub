import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../../common/factories/pagination.factory';
import { PrescriptionObject } from './prescription.model';

@ObjectType()
export class PaginatedPrescriptions extends Paginated(PrescriptionObject) {}
