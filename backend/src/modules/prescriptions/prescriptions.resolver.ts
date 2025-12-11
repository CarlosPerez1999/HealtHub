import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PrescriptionsService } from './prescriptions.service';
import { PrescriptionObject } from './models/prescription.model';
import { CreatePrescriptionInput } from './dto/create-prescription.input';
import { UpdatePrescriptionInput } from './dto/update-prescription.input';
import { PaginatedPrescriptions } from './models/paginated-prescriptions.object';

@Resolver(() => PrescriptionObject)
export class PrescriptionsResolver {
  constructor(private readonly service: PrescriptionsService) {}

  @Mutation(() => PrescriptionObject)
  createPrescription(@Args('input') input: CreatePrescriptionInput) {
    return this.service.create(input);
  }

  @Query(() => PaginatedPrescriptions)
  async prescriptions() {
    const items = await this.service.findAll();
    return { items, total: items.length };
  }

  @Query(() => PrescriptionObject, { nullable: true })
  prescription(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => PrescriptionObject)
  updatePrescription(
    @Args('id') id: string,
    @Args('input') input: UpdatePrescriptionInput,
  ) {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean)
  removePrescription(@Args('id') id: string) {
    return this.service.remove(id);
  }
}
