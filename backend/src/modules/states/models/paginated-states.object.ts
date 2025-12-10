import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/factories/pagination.factory';
import { StateObject } from './state.model';

@ObjectType()
export class PaginatedStates extends Paginated(StateObject) {}
