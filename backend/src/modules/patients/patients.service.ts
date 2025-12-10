import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePatientInput } from './dto/create-patient.input';
import { UpdatePatientInput } from './dto/update-patient.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { PaginatedPatients } from './models/paginated-patients.object';
import { PaginationInput } from 'src/common/dto/pagination.input';
import { handleServiceError } from 'src/common/utils/error-handler';
import { User } from '../users/entities/user.entity';
import { IdentityType } from 'src/modules/identity-types/entities/identity-type.entity';

@Injectable()
export class PatientsService {
  private readonly logger = new Logger(PatientsService.name);

  constructor(
    @InjectRepository(Patient)
    private readonly patientsRepository: Repository<Patient>,
  ) {}

  async create(createPatientInput: CreatePatientInput): Promise<Patient> {
    try {
      const { userId, dateOfBirth, ...rest } = createPatientInput;
      if (!userId) throw new BadRequestException('userId is required');

      const { identityTypeId, ...remaining } = rest as any;
      const createData: Partial<Patient> = {
        ...remaining,
        dateOfBirth: this.parseDateOfBirth(dateOfBirth),
      };
      createData.user = { id: userId } as unknown as User;
      if (identityTypeId) createData.identityType = { code: identityTypeId } as unknown as IdentityType;

      const patient = this.patientsRepository.create(createData);
      const saved = await this.patientsRepository.save(patient);
      return await this.findOne(saved.id);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findAll(pagination?: PaginationInput): Promise<PaginatedPatients> {
    const take = pagination?.take ?? 10;
    const skip = pagination?.skip ?? 0;

    const [items, total] = await this.patientsRepository.findAndCount({
      take,
      skip,
      relations: ['user', 'identityType'],
    });

    return {
      items,
      total,
      take,
      skip,
    } as PaginatedPatients;
  }

  async findOne(id: string) {
    try {
      const patient = await this.patientsRepository.findOne({
        where: { id },
        relations: ['user', 'identityType'],
      });
      if (!patient)
        throw new NotFoundException(`Patient with id ${id} not found`);
      return patient;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async update(updatePatientInput: UpdatePatientInput) {
    try {
      const { userId, dateOfBirth, ...rest } = updatePatientInput;

      const { identityTypeId, ...remaining } = rest as any;

      const preloadData: Partial<Patient> = { ...remaining };

      if (dateOfBirth !== undefined) {
        preloadData.dateOfBirth = this.parseDateOfBirth(dateOfBirth);
      }

      if (userId) preloadData.user = { id: userId } as unknown as User;
      if (identityTypeId !== undefined) preloadData.identityType = { code: identityTypeId } as unknown as IdentityType;

      const patient = await this.patientsRepository.preload(preloadData);
      if (!patient) throw new NotFoundException('Patient not found');

      const saved = await this.patientsRepository.save(patient);
      return await this.findOne(saved.id);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  private parseDateOfBirth(dateInput?: string | Date): Date {
    if (!dateInput) {
      throw new BadRequestException('dateOfBirth is required');
    }

    if (dateInput instanceof Date) return dateInput;

    const parsed = new Date(dateInput);
    if (Number.isNaN(parsed.getTime())) {
      throw new BadRequestException('Invalid dateOfBirth');
    }

    return parsed;
  }

  async remove(id: string) {
    try {
      const patient = await this.findOne(id);
      await this.patientsRepository.softDelete(id);
      return patient;
    } catch (error) {
      handleServiceError(error, this.logger, {
        warnMessage: `Remove attempted on non-existing patient: ${id}`,
      });
    }
  }
}
