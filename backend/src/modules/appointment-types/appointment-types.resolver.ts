import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AppointmentTypesService } from './appointment-types.service';
import { AppointmentTypeObject } from './models/appointment-type.model';
import { CreateAppointmentTypeInput } from './dto/create-appointment-type.input';
import { UpdateAppointmentTypeInput } from './dto/update-appointment-type.input';
import { PaginationInput } from '../../common/dto/pagination.input';
import { PaginatedAppointmentTypes } from './models/paginated-appointment-types.object';

@Resolver(() => AppointmentTypeObject)
export class AppointmentTypesResolver {
  constructor(private readonly service: AppointmentTypesService) {}

  @Mutation(() => AppointmentTypeObject)
  createAppointmentType(@Args('input') input: CreateAppointmentTypeInput) {
    return this.service.create(input);
  }

  @Query(() => [AppointmentTypeObject])
  appointmentTypes() {
    return this.service.findAll();
  }

  @Query(() => PaginatedAppointmentTypes)
  appointmentTypesPaginated(@Args('pagination', { nullable: true }) pagination?: PaginationInput) {
    return this.service.findAllPaginated(pagination);
  }

  @Query(() => AppointmentTypeObject)
  appointmentType(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => AppointmentTypeObject)
  updateAppointmentType(
    @Args('id') id: string,
    @Args('input') input: UpdateAppointmentTypeInput,
  ) {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeAppointmentType(@Args('id') id: string) {
    await this.service.remove(id);
    return true;
  }
}
