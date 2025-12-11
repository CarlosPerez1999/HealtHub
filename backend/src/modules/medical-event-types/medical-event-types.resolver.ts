import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MedicalEventTypesService } from './medical-event-types.service';
import { MedicalEventTypeObject } from './models/medical-event-type.model';
import { PaginatedMedicalEventTypes } from './models/paginated-medical-event-types.object';
import { CreateMedicalEventTypeInput } from './dto/create-medical-event-type.input';
import { UpdateMedicalEventTypeInput } from './dto/update-medical-event-type.input';
import { PaginationInput } from '../../common/dto/pagination.input';

@Resolver(() => MedicalEventTypeObject)
export class MedicalEventTypesResolver {
  constructor(private readonly medicalEventTypesService: MedicalEventTypesService) {}

  @Mutation(() => MedicalEventTypeObject)
  createMedicalEventType(@Args('input') input: CreateMedicalEventTypeInput) {
    return this.medicalEventTypesService.create(input);
  }

  @Query(() => PaginatedMedicalEventTypes)
  medicalEventTypes(@Args('pagination', { nullable: true }) pagination?: PaginationInput) {
    return this.medicalEventTypesService.findAll(pagination);
  }

  @Query(() => MedicalEventTypeObject, { nullable: true })
  medicalEventType(@Args('code') code: string) {
    return this.medicalEventTypesService.findOne(code);
  }

  @Mutation(() => MedicalEventTypeObject)
  updateMedicalEventType(@Args('input') input: UpdateMedicalEventTypeInput) {
    return this.medicalEventTypesService.update(input);
  }

  @Mutation(() => MedicalEventTypeObject)
  removeMedicalEventType(@Args('code') code: string) {
    return this.medicalEventTypesService.remove(code);
  }
}
