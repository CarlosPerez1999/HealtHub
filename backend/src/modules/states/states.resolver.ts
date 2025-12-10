import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { StatesService } from './states.service';
import { StateObject } from './models/state.model';
import { PaginatedStates } from './models/paginated-states.object';
import { CreateStateInput } from './dto/create-state.input';
import { UpdateStateInput } from './dto/update-state.input';
import { PaginationInput } from 'src/common/dto/pagination.input';

@Resolver(() => StateObject)
export class StatesResolver {
  constructor(private readonly statesService: StatesService) {}

  @Mutation(() => StateObject)
  createState(@Args('input') input: CreateStateInput) {
    return this.statesService.create(input);
  }

  @Query(() => PaginatedStates)
  states(
    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination?: PaginationInput,
  ) {
    return this.statesService.findAll(pagination);
  }

  @Query(() => StateObject, { nullable: true })
  state(@Args('id', { type: () => ID }) id: string) {
    return this.statesService.findOne(id);
  }

  @Mutation(() => StateObject)
  updateState(@Args('input') input: UpdateStateInput) {
    return this.statesService.update(input);
  }

  @Mutation(() => StateObject)
  removeState(@Args('id', { type: () => ID }) id: string) {
    return this.statesService.remove(id);
  }
}
