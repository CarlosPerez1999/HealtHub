import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../../common/factories/pagination.factory';
import { MedicalHistoryObject } from './medical-history.model';

@ObjectType()
export class PaginatedMedicalHistories extends Paginated(MedicalHistoryObject) {}
