import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PrescriptionItemsService } from './prescription-items.service';
import { PrescriptionItemObject } from './models/prescription-item.model';
import { CreatePrescriptionItemInput } from './dto/create-prescription-item.input';
import { UpdatePrescriptionItemInput } from './dto/update-prescription-item.input';
import { PaginatedPrescriptionItems } from './models/paginated-prescription-items.object';

@Resolver(() => PrescriptionItemObject)
export class PrescriptionItemsResolver {
  constructor(private readonly service: PrescriptionItemsService) {}

  @Mutation(() => PrescriptionItemObject)
  createPrescriptionItem(@Args('input') input: CreatePrescriptionItemInput) {
    return this.service.create(input);
  }

  @Query(() => PaginatedPrescriptionItems)
  async prescriptionItems() {
    const items = await this.service.findAll();
    return { items, total: items.length };
  }

  @Query(() => PrescriptionItemObject, { nullable: true })
  prescriptionItem(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => PrescriptionItemObject)
  updatePrescriptionItem(
    @Args('id') id: string,
    @Args('input') input: UpdatePrescriptionItemInput,
  ) {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean)
  removePrescriptionItem(@Args('id') id: string) {
    return this.service.remove(id);
  }
}
