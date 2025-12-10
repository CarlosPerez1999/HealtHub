import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { AddressesService } from './addresses.service';
import { AddressObject } from './models/address.model';
import { PaginatedAddresses } from './models/paginated-addresses.object';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { PaginationInput } from 'src/common/dto/pagination.input';

@Resolver(() => AddressObject)
export class AddressesResolver {
  constructor(private readonly addressesService: AddressesService) {}

  @Mutation(() => AddressObject)
  createAddress(@Args('input') input: CreateAddressInput) {
    return this.addressesService.create(input);
  }

  @Query(() => PaginatedAddresses)
  addresses(@Args('pagination', { nullable: true }) pagination?: PaginationInput) {
    return this.addressesService.findAll(pagination);
  }

  @Query(() => AddressObject, { nullable: true })
  address(@Args('id', { type: () => ID }) id: string) {
    return this.addressesService.findOne(id);
  }

  @Mutation(() => AddressObject)
  updateAddress(@Args('input') input: UpdateAddressInput) {
    return this.addressesService.update(input);
  }

  @Mutation(() => AddressObject)
  removeAddress(@Args('id', { type: () => ID }) id: string) {
    return this.addressesService.remove(id);
  }
}
