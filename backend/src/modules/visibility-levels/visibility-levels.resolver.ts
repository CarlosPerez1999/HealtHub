import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VisibilityLevelsService } from './visibility-levels.service';
import { VisibilityLevelObject } from './models/visibility-level.model';
import { PaginatedVisibilityLevels } from './models/paginated-visibility-levels.object';
import { CreateVisibilityLevelInput } from './dto/create-visibility-level.input';
import { UpdateVisibilityLevelInput } from './dto/update-visibility-level.input';
import { PaginationInput } from 'src/common/dto/pagination.input';

@Resolver(() => VisibilityLevelObject)
export class VisibilityLevelsResolver {
  constructor(private readonly service: VisibilityLevelsService) {}

  @Mutation(() => VisibilityLevelObject)
  createVisibilityLevel(@Args('input') input: CreateVisibilityLevelInput) {
    return this.service.create(input);
  }

  @Query(() => PaginatedVisibilityLevels)
  visibilityLevels(@Args('pagination', { nullable: true }) pagination?: PaginationInput) {
    return this.service.findAll(pagination);
  }

  @Query(() => VisibilityLevelObject, { nullable: true })
  visibilityLevel(@Args('code') code: string) {
    return this.service.findOne(code);
  }

  @Mutation(() => VisibilityLevelObject)
  updateVisibilityLevel(@Args('input') input: UpdateVisibilityLevelInput) {
    return this.service.update(input);
  }

  @Mutation(() => VisibilityLevelObject)
  removeVisibilityLevel(@Args('code') code: string) {
    return this.service.remove(code);
  }
}
