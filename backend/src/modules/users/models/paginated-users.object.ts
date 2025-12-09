import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/factories/pagination.factory';
import { UserObject } from './user.model';

@ObjectType()
export class PaginatedUsers extends Paginated(UserObject) {}
