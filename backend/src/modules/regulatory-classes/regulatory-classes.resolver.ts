import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RegulatoryClassesService } from './regulatory-classes.service';
import { RegulatoryClassObject } from './models/regulatory-class.model';
import { CreateRegulatoryClassInput } from './dto/create-regulatory-class.input';
import { UpdateRegulatoryClassInput } from './dto/update-regulatory-class.input';
import { PaginationInput } from 'src/common/dto/pagination.input';
import { PaginatedRegulatoryClasses } from './models/paginated-regulatory-classes.object';

@Resolver(() => RegulatoryClassObject)
export class RegulatoryClassesResolver {
  constructor(private readonly service: RegulatoryClassesService) {}

  @Mutation(() => RegulatoryClassObject)
  createRegulatoryClass(@Args('input') input: CreateRegulatoryClassInput) {
    return this.service.create(input);
  }

  @Query(() => [RegulatoryClassObject])
  regulatoryClasses() {
    return this.service.findAll();
  }

  @Query(() => PaginatedRegulatoryClasses)
  regulatoryClassesPaginated(@Args('pagination', { nullable: true }) pagination?: PaginationInput) {
    return this.service.findAllPaginated(pagination);
  }

  @Query(() => RegulatoryClassObject)
  regulatoryClass(@Args('code') code: string) {
    return this.service.findOne(code);
  }

  @Mutation(() => RegulatoryClassObject)
  updateRegulatoryClass(@Args('code') code: string, @Args('input') input: UpdateRegulatoryClassInput) {
    return this.service.update(code, input);
  }

  @Mutation(() => Boolean)
  async removeRegulatoryClass(@Args('code') code: string) {
    await this.service.remove(code);
    return true;
  }
}
