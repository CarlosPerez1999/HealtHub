import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentStatus } from './entities/appointment-status.entity';
import { CreateAppointmentStatusInput } from './dto/create-appointment-status.input';
import { UpdateAppointmentStatusInput } from './dto/update-appointment-status.input';
import { PaginationInput } from 'src/common/dto/pagination.input';

@Injectable()
export class AppointmentStatusService {
  private readonly logger = new Logger(AppointmentStatusService.name);

  constructor(
    @InjectRepository(AppointmentStatus)
    private readonly repo: Repository<AppointmentStatus>,
  ) {}

  async create(input: CreateAppointmentStatusInput) {
    try {
      const existing = await this.repo.findOne({ where: { code: input.code } });
      if (existing) {
        throw new Error('AppointmentStatus with this code already exists');
      }

      const entity = this.repo.create(input as Partial<AppointmentStatus>);
      return this.repo.save(entity);
    } catch (error) {
      this.logger.error(error?.message ?? error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.repo.find();
    } catch (error) {
      this.logger.error(error?.message ?? error);
      throw error;
    }
  }

  async findAllPaginated(pagination?: PaginationInput) {
    const take = pagination?.take ?? 10;
    const skip = pagination?.skip ?? 0;
    try {
      const [items, total] = await this.repo.findAndCount({ take, skip });

      return { items, total, take, skip };
    } catch (error) {
      this.logger.error(error?.message ?? error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      return await this.repo.findOne({ where: { id } });
    } catch (error) {
      this.logger.error(error?.message ?? error);
      throw error;
    }
  }

  async update(id: string, input: UpdateAppointmentStatusInput) {
    try {
      const entity = await this.repo.preload({ id, ...input } as Partial<AppointmentStatus>);
      if (!entity) throw new Error('AppointmentStatus not found');
      return await this.repo.save(entity);
    } catch (error) {
      this.logger.error(error?.message ?? error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.repo.softDelete(id);
    } catch (error) {
      this.logger.error(error?.message ?? error);
      throw error;
    }
  }
}
