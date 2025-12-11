import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../../common/factories/pagination.factory';
import { DoctorObject } from './doctor.model';

@ObjectType()
export class PaginatedDoctors extends Paginated(DoctorObject) {}
