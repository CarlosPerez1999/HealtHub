import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/factories/pagination.factory';
import { IdentityTypeObject } from './identity-type.model';

@ObjectType()
export class PaginatedIdentityTypes extends Paginated(IdentityTypeObject) {}
