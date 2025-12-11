import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MedicationsService } from './medications.service';
import { MedicationObject } from './models/medication.model';
import { CreateMedicationInput } from './dto/create-medication.input';
import { UpdateMedicationInput } from './dto/update-medication.input';
import { PaginationInput } from '../../common/dto/pagination.input';
import { PaginatedMedications } from './models/paginated-medications.object';

@Resolver(() => MedicationObject)
export class MedicationsResolver {
  constructor(private readonly service: MedicationsService) {}

  @Mutation(() => MedicationObject)
  createMedication(@Args('input') input: CreateMedicationInput) {
    return this.service.create(input);
  }

  @Query(() => [MedicationObject])
  medications() {
    return this.service.findAll();
  }

  @Query(() => PaginatedMedications)
  medicationsPaginated(@Args('pagination', { nullable: true }) pagination?: PaginationInput) {
    return this.service.findAllPaginated(pagination);
  }

  @Query(() => MedicationObject)
  medication(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => MedicationObject)
  updateMedication(@Args('id') id: string, @Args('input') input: UpdateMedicationInput) {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeMedication(@Args('id') id: string) {
    await this.service.remove(id);
    return true;
  }
}
