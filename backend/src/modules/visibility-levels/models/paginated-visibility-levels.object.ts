import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/factories/pagination.factory';
import { VisibilityLevelObject } from './visibility-level.model';

@ObjectType()
export class PaginatedVisibilityLevels extends Paginated(VisibilityLevelObject) {}
