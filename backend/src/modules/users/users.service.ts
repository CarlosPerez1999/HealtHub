import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginatedUsers } from './models/paginated-users.object';
import { PaginationInput } from '../../common/dto/pagination.input';
import { handleServiceError } from '../../common/utils/error-handler';
import { Role } from '../roles/entities/role.entity';
import { Patient } from '../patients/entities/patient.entity';
import { Doctor } from '../doctors/entities/doctor.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    try {
      const { password, roleCode: rawRoleCode, patientProfile, doctorProfile, ...userRes } = createUserInput;
      
      // Normalize roleCode to uppercase for consistent comparison
      const roleCode = rawRoleCode?.toUpperCase();

      // Validate presence of profile data when role requires it
      if (roleCode === 'PATIENT' && !patientProfile) {
        throw new BadRequestException('patientProfile is required when roleCode is "PATIENT"');
      }
      if (roleCode === 'DOCTOR' && !doctorProfile) {
        throw new BadRequestException('doctorProfile is required when roleCode is "DOCTOR"');
      }
      const exist = await this.usersRepository.findOneBy({
        email: createUserInput.email.toLowerCase(),
      });
      if (exist) throw new ConflictException('Email already in use');

      const hashed = password ? await bcrypt.hash(password, 10) : undefined;

      const createData: Partial<User> = {
        ...userRes,
        ...(hashed ? { password: hashed } : {}),
      };

      if (roleCode !== undefined && roleCode !== null) {
        if (typeof roleCode !== 'string' || roleCode.trim() === '') {
          throw new BadRequestException('roleCode must be a non-empty string');
        }
        createData.role = { code: roleCode } as Role;
      }


      const result = await this.usersRepository.manager.transaction(async (manager) => {
        const userRepo = manager.getRepository(User);
        const patientRepo = manager.getRepository(Patient);
        const doctorRepo = manager.getRepository(Doctor);

        const user = userRepo.create(createData as Partial<User>);
        const saved = await userRepo.save(user);
        this.logger.log(`User created with id: ${saved.id}, roleCode: ${roleCode}`);

        if (roleCode === 'PATIENT') {
          if (!patientProfile) {
            throw new BadRequestException('patientProfile is required for PATIENT role');
          }
          const pData: Partial<Patient> = {
            user: saved,
            firstName: patientProfile.firstName,
            lastName: patientProfile.lastName,
            dateOfBirth: new Date(patientProfile.dateOfBirth),
            nationalId: patientProfile?.nationalId,
            nationalityCode: patientProfile?.nationalityCode,
            phone: patientProfile?.phone,
          };
          this.logger.log(`Creating patient with data: ${JSON.stringify(pData)}`);
          const patient = patientRepo.create(pData);
          const savedPatient = await patientRepo.save(patient);
          this.logger.log(`Patient profile created with id: ${savedPatient.id}`);
        } else if (roleCode === 'DOCTOR') {
          if (!doctorProfile) {
            throw new BadRequestException('doctorProfile is required for DOCTOR role');
          }
          const dData: Partial<Doctor> = {
            user: saved,
            firstName: doctorProfile.firstName,
            lastName: doctorProfile.lastName,
            licenseNumber: doctorProfile.licenseNumber,
            licenseCountry: doctorProfile?.licenseCountry,
            boardCertified: doctorProfile?.boardCertified ?? false,
            phone: doctorProfile?.phone,
          };
          this.logger.log(`Creating doctor with data: ${JSON.stringify(dData)}`);
          const doctor = doctorRepo.create(dData);
          const savedDoctor = await doctorRepo.save(doctor);
          this.logger.log(`Doctor profile created with id: ${savedDoctor.id}`);
        }

        return saved;
      });

      return await this.findOne(result.id);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findAll(pagination?: PaginationInput): Promise<PaginatedUsers> {
    const take = pagination?.take ?? 10;
    const skip = pagination?.skip ?? 0;

    const [items, total] = await this.usersRepository.findAndCount({
      take,
      skip,
      relations: ['role'],
    });

    return {
      items,
      total,
      take,
      skip,
    } as PaginatedUsers;
  }

  async findOne(id: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        relations: ['role', 'patients', 'patients.identityType'],
      });
      if (!user) throw new NotFoundException(`User with id ${id} not found`);
      return user;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async update(updateUserInput: UpdateUserInput) {
    try {
      const { password, roleCode, ...userRes } = updateUserInput;

      const hashed = password ? await bcrypt.hash(password, 10) : undefined;

      const preloadData: Partial<User> = {
        ...userRes,
        ...(hashed ? { password: hashed } : {}),
      };

      if (roleCode !== undefined && roleCode !== null) {
        if (typeof roleCode !== 'string' || roleCode.trim() === '') {
          throw new BadRequestException('roleCode must be a non-empty string');
        }
        preloadData.role = { code: roleCode } as Role;
      }

      const user = await this.usersRepository.preload(preloadData);
      if (!user) throw new NotFoundException('User not found');

      const saved = await this.usersRepository.save(user);
      return await this.findOne(saved.id);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.findOne(id);
      await this.usersRepository.softDelete(id);
      return user;
    } catch (error) {
      handleServiceError(error, this.logger, {
        warnMessage: `Remove attempted on non-existing user: ${id}`,
      });
    }
  }

  async findByEmail(email: string) {
    try {
      if (!email) return null;
      const user = await this.usersRepository.findOne({
        where: { email: email.toLowerCase().trim() },
        relations: ['role'],
      });
      return user ?? null;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }
}
