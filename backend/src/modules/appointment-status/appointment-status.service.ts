import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentStatus } from './entities/appointment-status.entity';
import { CreateAppointmentStatusInput } from './dto/create-appointment-status.input';
import { UpdateAppointmentStatusInput } from './dto/update-appointment-status.input';
import { PaginationInput } from '../../common/dto/pagination.input';

@Injectable()
export class AppointmentStatusService {
  private readonly logger = new Logger(AppointmentStatusService.name);

  constructor(
    @InjectRepository(AppointmentStatus)
    private readonly appointmentStatusRepository: Repository<AppointmentStatus>,
  ) {}

  async create(input: CreateAppointmentStatusInput) {
    try {
      const existing = await this.appointmentStatusRepository.findOne({ where: { code: input.code } });
      if (existing) {
        throw new Error('AppointmentStatus with this code already exists');
      }

      const entity = this.appointmentStatusRepository.create(input as Partial<AppointmentStatus>);
      return this.appointmentStatusRepository.save(entity);
    } catch (error) {
      this.logger.error(error?.message ?? error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.appointmentStatusRepository.find();
    } catch (error) {
      this.logger.error(error?.message ?? error);
      throw error;
    }
  }

  async findAllPaginated(pagination?: PaginationInput) {
    const take = pagination?.take ?? 10;
    const skip = pagination?.skip ?? 0;
    try {
      const [items, total] = await this.appointmentStatusRepository.findAndCount({ take, skip });

      return { items, total, take, skip };
    } catch (error) {
      this.logger.error(error?.message ?? error);
      throw error;
    }
  }

  async findOne(code: string) {
    try {
      return await this.appointmentStatusRepository.findOne({ where: { code } });
    } catch (error) {
      this.logger.error(error?.message ?? error);
      throw error;
    }
  }

  async update(id: string, input: UpdateAppointmentStatusInput) {
    try {
      const entity = await this.appointmentStatusRepository.preload({ id, ...input } as Partial<AppointmentStatus>);
      if (!entity) throw new Error('AppointmentStatus not found');
      return await this.appointmentStatusRepository.save(entity);
    } catch (error) {
      this.logger.error(error?.message ?? error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.appointmentStatusRepository.softDelete(id);
    } catch (error) {
      this.logger.error(error?.message ?? error);
      throw error;
    }
  }
}
