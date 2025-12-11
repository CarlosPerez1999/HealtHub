import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../../common/factories/pagination.factory';
import { VisibilityLevelObject } from './visibility-level.model';

@ObjectType()
export class PaginatedVisibilityLevels extends Paginated(VisibilityLevelObject) {}
