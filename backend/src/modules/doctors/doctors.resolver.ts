import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DoctorsService } from './doctors.service';
import { DoctorObject } from './models/doctor.model';
import { CreateDoctorInput } from './dto/create-doctor.input';
import { UpdateDoctorInput } from './dto/update-doctor.input';
import { PaginatedDoctors } from './models/paginated-doctors.object';
import { PaginationInput } from '../../common/dto/pagination.input';

@Resolver(() => DoctorObject)
export class DoctorsResolver {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Mutation(() => DoctorObject)
  createDoctor(
    @Args('createDoctorInput') createDoctorInput: CreateDoctorInput,
  ) {
    return this.doctorsService.create(createDoctorInput);
  }

  @Query(() => PaginatedDoctors, { name: 'doctors' })
  findAll(
    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination?: PaginationInput,
  ) {
    return this.doctorsService.findAll(pagination);
  }

  @Query(() => DoctorObject, { name: 'doctor' })
  findOne(@Args('id') id: string) {
    return this.doctorsService.findOne(id);
  }

  @Mutation(() => DoctorObject)
  updateDoctor(
    @Args('updateDoctorInput') updateDoctorInput: UpdateDoctorInput,
  ) {
    return this.doctorsService.update(updateDoctorInput);
  }

  @Mutation(() => DoctorObject)
  removeDoctor(@Args('id') id: string) {
    return this.doctorsService.remove(id);
  }
}
