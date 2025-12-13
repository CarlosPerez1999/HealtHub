import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateDoctorInput } from './dto/create-doctor.input';
import { UpdateDoctorInput } from './dto/update-doctor.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { PaginatedDoctors } from './models/paginated-doctors.object';
import { PaginationInput } from '../../common/dto/pagination.input';
import { handleServiceError } from '../../common/utils/error-handler';
import { User } from '../users/entities/user.entity';
import { Specialty } from '../specialties/entities/specialty.entity';

@Injectable()
export class DoctorsService {
  private readonly logger = new Logger(DoctorsService.name);

  constructor(
    @InjectRepository(Doctor)
    private readonly doctorsRepository: Repository<Doctor>,
  ) {}

  async create(createDoctorInput: CreateDoctorInput): Promise<Doctor> {
    try {
      if (!createDoctorInput.userId) throw new BadRequestException('userId is required');
      
      const doctor = this.doctorsRepository.create({
        ...createDoctorInput,
        user: { id: createDoctorInput.userId } as User,
        specialty: createDoctorInput.specialtyCode 
          ? { code: createDoctorInput.specialtyCode } as Specialty 
          : undefined,
      });
      
      const saved = await this.doctorsRepository.save(doctor);
      return await this.findOne(saved.id);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findAll(pagination?: PaginationInput): Promise<PaginatedDoctors> {
    const take = pagination?.take ?? 10;
    const skip = pagination?.skip ?? 0;
    const [items, total] = await this.doctorsRepository.findAndCount({
      take,
      skip,
      relations: ['user', 'specialty'],
    });
    return { items, total, take, skip } as PaginatedDoctors;
  }

  async findOne(id: string) {
    try {
      const doctor = await this.doctorsRepository.findOne({
        where: { id },
        relations: ['user', 'specialty'],
      });
      if (!doctor)
        throw new NotFoundException(`Doctor with id ${id} not found`);
      return doctor;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async update(updateDoctorInput: UpdateDoctorInput) {
    try {
      const { id, userId, specialtyCode, firstName, lastName, licenseNumber } = updateDoctorInput;
      const preloadData: Partial<Doctor> = { id };
      if (firstName !== undefined) preloadData.firstName = firstName;
      if (lastName !== undefined) preloadData.lastName = lastName;
      if (licenseNumber !== undefined) preloadData.licenseNumber = licenseNumber;
      if (userId) preloadData.user = { id: userId } as User;
      if (specialtyCode !== undefined) preloadData.specialty = { code: specialtyCode } as Specialty;
      const doctor = await this.doctorsRepository.preload(preloadData);
      if (!doctor) throw new NotFoundException('Doctor not found');
      const saved = await this.doctorsRepository.save(doctor);
      return await this.findOne(saved.id);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async remove(id: string) {
    try {
      const doctor = await this.findOne(id);
      await this.doctorsRepository.softDelete(id);
      return doctor;
    } catch (error) {
      handleServiceError(error, this.logger, {
        warnMessage: `Remove attempted on non-existing doctor: ${id}`,
      });
    }
  }
}
