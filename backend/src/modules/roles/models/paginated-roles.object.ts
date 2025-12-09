import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/factories/pagination.factory';
import { RoleObject } from './role.model';

@ObjectType()
export class PaginatedRoles extends Paginated(RoleObject) {}
