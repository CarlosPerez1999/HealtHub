import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MedicalHistoryService } from './medical-history.service';
import { MedicalHistoryObject } from './models/medical-history.model';
import { PaginatedMedicalHistories } from './models/paginated-medical-histories.object';
import { CreateMedicalHistoryInput } from './dto/create-medical-history.input';
import { UpdateMedicalHistoryInput } from './dto/update-medical-history.input';
import { PaginationInput } from 'src/common/dto/pagination.input';

@Resolver(() => MedicalHistoryObject)
export class MedicalHistoryResolver {
  constructor(private readonly service: MedicalHistoryService) {}

  @Mutation(() => MedicalHistoryObject)
  createMedicalHistory(@Args('input') input: CreateMedicalHistoryInput) {
    return this.service.create(input);
  }

  @Query(() => PaginatedMedicalHistories)
  medicalHistories(@Args('pagination', { nullable: true }) pagination?: PaginationInput) {
    return this.service.findAll(pagination);
  }

  @Query(() => MedicalHistoryObject, { nullable: true })
  medicalHistory(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => MedicalHistoryObject)
  updateMedicalHistory(@Args('input') input: UpdateMedicalHistoryInput) {
    return this.service.update(input);
  }

  @Mutation(() => MedicalHistoryObject)
  removeMedicalHistory(@Args('id') id: string) {
    return this.service.remove(id);
  }
}
