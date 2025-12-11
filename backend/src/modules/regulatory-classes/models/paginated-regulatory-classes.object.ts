import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../../common/factories/pagination.factory';
import { RegulatoryClassObject } from './regulatory-class.model';

@ObjectType()
export class PaginatedRegulatoryClasses extends Paginated(RegulatoryClassObject) {}
