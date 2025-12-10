import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AppointmentStatusService } from './appointment-status.service';
import { AppointmentStatusObject } from './models/appointment-status.model';
import { CreateAppointmentStatusInput } from './dto/create-appointment-status.input';
import { UpdateAppointmentStatusInput } from './dto/update-appointment-status.input';
import { PaginationInput } from 'src/common/dto/pagination.input';
import { PaginatedAppointmentStatuses } from './models/paginated-appointment-statuses.object';

@Resolver(() => AppointmentStatusObject)
export class AppointmentStatusResolver {
  constructor(private readonly service: AppointmentStatusService) {}

  @Mutation(() => AppointmentStatusObject)
  createAppointmentStatus(@Args('input') input: CreateAppointmentStatusInput) {
    return this.service.create(input);
  }

  @Query(() => [AppointmentStatusObject])
  appointmentStatuses() {
    return this.service.findAll();
  }

  @Query(() => PaginatedAppointmentStatuses)
  appointmentStatusesPaginated(@Args('pagination', { nullable: true }) pagination?: PaginationInput) {
    return this.service.findAllPaginated(pagination);
  }

  @Query(() => AppointmentStatusObject)
  appointmentStatus(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => AppointmentStatusObject)
  updateAppointmentStatus(
    @Args('id') id: string,
    @Args('input') input: UpdateAppointmentStatusInput,
  ) {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeAppointmentStatus(@Args('id') id: string) {
    await this.service.remove(id);
    return true;
  }
}
