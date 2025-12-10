import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AppointmentsService } from './appointments.service';
import { AppointmentObject } from './models/appointment.model';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { PaginationInput } from 'src/common/dto/pagination.input';
import { PaginatedAppointments } from './models/paginated-appointments.object';

@Resolver(() => AppointmentObject)
export class AppointmentsResolver {
  constructor(private readonly service: AppointmentsService) {}

  @Mutation(() => AppointmentObject)
  createAppointment(@Args('input') input: CreateAppointmentInput) {
    return this.service.create(input);
  }

  @Query(() => [AppointmentObject])
  appointments() {
    return this.service.findAll();
  }

  @Query(() => PaginatedAppointments)
  appointmentsPaginated(@Args('pagination', { nullable: true }) pagination?: PaginationInput) {
    return this.service.findAllPaginated(pagination);
  }

  @Query(() => AppointmentObject)
  appointment(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => AppointmentObject)
  updateAppointment(@Args('id') id: string, @Args('input') input: UpdateAppointmentInput) {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeAppointment(@Args('id') id: string) {
    await this.service.remove(id);
    return true;
  }
}
