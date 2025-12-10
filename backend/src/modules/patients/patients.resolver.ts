import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PatientsService } from './patients.service';
import { PatientObject } from './models/patient.model';
import { CreatePatientInput } from './dto/create-patient.input';
import { UpdatePatientInput } from './dto/update-patient.input';
import { PaginatedPatients } from './models/paginated-patients.object';
import { PaginationInput } from 'src/common/dto/pagination.input';

@Resolver(() => PatientObject)
export class PatientsResolver {
  constructor(private readonly patientsService: PatientsService) {}

  @Mutation(() => PatientObject)
  createPatient(
    @Args('createPatientInput') createPatientInput: CreatePatientInput,
  ) {
    return this.patientsService.create(createPatientInput);
  }

  @Query(() => PaginatedPatients, { name: 'patients' })
  findAll(
    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination?: PaginationInput,
  ) {
    return this.patientsService.findAll(pagination);
  }

  @Query(() => PatientObject, { name: 'patient' })
  findOne(@Args('id') id: string) {
    return this.patientsService.findOne(id);
  }

  @Mutation(() => PatientObject)
  updatePatient(
    @Args('updatePatientInput') updatePatientInput: UpdatePatientInput,
  ) {
    return this.patientsService.update(updatePatientInput);
  }

  @Mutation(() => PatientObject)
  removePatient(@Args('id') id: string) {
    return this.patientsService.remove(id);
  }
}
