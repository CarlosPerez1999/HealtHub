import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { RoleObject } from './models/role.model';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { PaginatedRoles } from './models/paginated-roles.object';
import { PaginationInput } from 'src/common/dto/pagination.input';

@Resolver(() => RoleObject)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Mutation(() => RoleObject)
  createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.rolesService.create(createRoleInput);
  }

  @Query(() => PaginatedRoles, { name: 'roles' })
  findAll(
    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination?: PaginationInput,
  ) {
    return this.rolesService.findAll(pagination);
  }

  @Query(() => RoleObject, { name: 'role' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.rolesService.findOne(id);
  }

  @Mutation(() => RoleObject)
  updateRole(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
    return this.rolesService.update(updateRoleInput);
  }

  @Mutation(() => RoleObject)
  removeRole(@Args('id', { type: () => Int }) id: number) {
    return this.rolesService.remove(id);
  }
}
