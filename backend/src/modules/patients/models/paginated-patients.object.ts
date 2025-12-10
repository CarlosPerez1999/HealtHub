import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/factories/pagination.factory';
import { PatientObject } from './patient.model';

@ObjectType()
export class PaginatedPatients extends Paginated(PatientObject) {}
