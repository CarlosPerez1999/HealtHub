import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PrescriptionStatusService } from './prescription-status.service';
import { PrescriptionStatusObject } from './models/prescription-status.model';
import { CreatePrescriptionStatusInput } from './dto/create-prescription-status.input';
import { UpdatePrescriptionStatusInput } from './dto/update-prescription-status.input';
import { PaginatedPrescriptionStatuses } from './models/paginated-prescription-statuses.object';

@Resolver(() => PrescriptionStatusObject)
export class PrescriptionStatusResolver {
  constructor(private readonly service: PrescriptionStatusService) {}

  @Mutation(() => PrescriptionStatusObject)
  createPrescriptionStatus(@Args('input') input: CreatePrescriptionStatusInput) {
    return this.service.create(input);
  }

  @Query(() => PaginatedPrescriptionStatuses)
  async prescriptionStatuses() {
    const items = await this.service.findAll();
    return { items, total: items.length };
  }

  @Query(() => PrescriptionStatusObject, { nullable: true })
  prescriptionStatus(@Args('code') code: string) {
    return this.service.findOne(code);
  }

  @Mutation(() => PrescriptionStatusObject)
  updatePrescriptionStatus(
    @Args('code') code: string,
    @Args('input') input: UpdatePrescriptionStatusInput,
  ) {
    return this.service.update(code, input);
  }

  @Mutation(() => Boolean)
  removePrescriptionStatus(@Args('code') code: string) {
    return this.service.remove(code);
  }
}
