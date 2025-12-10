import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentType } from './entities/appointment-type.entity';
import { PaginationInput } from 'src/common/dto/pagination.input';
import { CreateAppointmentTypeInput } from './dto/create-appointment-type.input';
import { UpdateAppointmentTypeInput } from './dto/update-appointment-type.input';

@Injectable()
export class AppointmentTypesService {
  private readonly logger = new Logger(AppointmentTypesService.name);

  constructor(
    @InjectRepository(AppointmentType)
    private readonly repo: Repository<AppointmentType>,
  ) {}

  async create(input: CreateAppointmentTypeInput) {
    try {
      const existing = await this.repo.findOne({ where: { code: input.code } });
      if (existing) {
        throw new Error('AppointmentType with this code already exists');
      }

      const entity = this.repo.create(input as Partial<AppointmentType>);
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

  async update(id: string, input: UpdateAppointmentTypeInput) {
    try {
      const entity = await this.repo.preload({ id, ...input } as Partial<AppointmentType>);
      if (!entity) throw new Error('AppointmentType not found');
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
