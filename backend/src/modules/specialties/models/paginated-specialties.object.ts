import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../../common/factories/pagination.factory';
import { SpecialtyObject } from './specialty.model';

@ObjectType()
export class PaginatedSpecialties extends Paginated(SpecialtyObject) {}
