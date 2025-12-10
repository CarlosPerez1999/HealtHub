import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { IdentityTypesService } from './identity-types.service';
import { IdentityTypeObject } from './models/identity-type.model';
import { PaginatedIdentityTypes } from './models/paginated-identity-types.object';
import { CreateIdentityTypeInput } from './dto/create-identity-type.input';
import { UpdateIdentityTypeInput } from './dto/update-identity-type.input';
import { PaginationInput } from 'src/common/dto/pagination.input';

@Resolver(() => IdentityTypeObject)
export class IdentityTypesResolver {
  constructor(private readonly identityTypesService: IdentityTypesService) {}

  @Mutation(() => IdentityTypeObject)
  createIdentityType(@Args('input') input: CreateIdentityTypeInput) {
    return this.identityTypesService.create(input);
  }

  @Query(() => PaginatedIdentityTypes)
  identityTypes(@Args('pagination', { nullable: true }) pagination?: PaginationInput) {
    return this.identityTypesService.findAll(pagination);
  }

  @Query(() => IdentityTypeObject, { nullable: true })
  identityType(@Args('code') code: string) {
    return this.identityTypesService.findOne(code);
  }

  @Mutation(() => IdentityTypeObject)
  updateIdentityType(@Args('input') input: UpdateIdentityTypeInput) {
    return this.identityTypesService.update(input);
  }

  @Mutation(() => IdentityTypeObject)
  removeIdentityType(@Args('code') code: string) {
    return this.identityTypesService.remove(code);
  }
}
