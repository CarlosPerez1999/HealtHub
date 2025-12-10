import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { SpecialtiesService } from './specialties.service';
import { SpecialtyObject } from './models/specialty.model';
import { PaginatedSpecialties } from './models/paginated-specialties.object';
import { CreateSpecialtyInput } from './dto/create-specialty.input';
import { UpdateSpecialtyInput } from './dto/update-specialty.input';
import { PaginationInput } from 'src/common/dto/pagination.input';

@Resolver(() => SpecialtyObject)
export class SpecialtiesResolver {
  constructor(private readonly specialtiesService: SpecialtiesService) {}

  @Mutation(() => SpecialtyObject)
  createSpecialty(@Args('input') input: CreateSpecialtyInput) {
    return this.specialtiesService.create(input);
  }

  @Query(() => PaginatedSpecialties)
  specialties(@Args('pagination', { nullable: true }) pagination?: PaginationInput) {
    return this.specialtiesService.findAll(pagination);
  }

  @Query(() => SpecialtyObject, { nullable: true })
  specialty(@Args('id', { type: () => ID }) id: string) {
    return this.specialtiesService.findOne(id);
  }

  @Mutation(() => SpecialtyObject)
  updateSpecialty(@Args('input') input: UpdateSpecialtyInput) {
    return this.specialtiesService.update(input);
  }

  @Mutation(() => SpecialtyObject)
  removeSpecialty(@Args('id', { type: () => ID }) id: string) {
    return this.specialtiesService.remove(id);
  }
}
