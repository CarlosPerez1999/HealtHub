import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../../common/factories/pagination.factory';
import { MedicationObject } from './medication.model';

@ObjectType()
export class PaginatedMedications extends Paginated(MedicationObject) {}
