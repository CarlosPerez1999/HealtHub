import { Injectable, Logger, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalEventType } from './entities/medical-event-type.entity';
import { CreateMedicalEventTypeInput } from './dto/create-medical-event-type.input';
import { UpdateMedicalEventTypeInput } from './dto/update-medical-event-type.input';
import { PaginatedMedicalEventTypes } from './models/paginated-medical-event-types.object';
import { PaginationInput } from 'src/common/dto/pagination.input';
import { handleServiceError } from 'src/common/utils/error-handler';

@Injectable()
export class MedicalEventTypesService {
  private readonly logger = new Logger(MedicalEventTypesService.name);

  constructor(
    @InjectRepository(MedicalEventType)
    private readonly repo: Repository<MedicalEventType>,
  ) {}

  async create(input: CreateMedicalEventTypeInput): Promise<MedicalEventType> {
    try {
      const exists = await this.repo.findOneBy({ code: input.code });
      if (exists) throw new ConflictException(`MedicalEventType ${input.code} already exists`);
      const entity = this.repo.create(input as Partial<MedicalEventType>);
      return await this.repo.save(entity);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findAll(pagination?: PaginationInput): Promise<PaginatedMedicalEventTypes> {
    try {
      const take = pagination?.take ?? 10;
      const skip = pagination?.skip ?? 0;
      const [items, total] = await this.repo.findAndCount({ take, skip });
      return { items, total, take, skip } as PaginatedMedicalEventTypes;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findOne(code: string): Promise<MedicalEventType> {
    try {
      const item = await this.repo.findOne({ where: { code } });
      if (!item) throw new NotFoundException(`MedicalEventType with code ${code} not found`);
      return item;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async update(input: UpdateMedicalEventTypeInput): Promise<MedicalEventType> {
    try {
      const entity = await this.repo.preload(input as Partial<MedicalEventType>);
      if (!entity) throw new NotFoundException(`MedicalEventType with code ${input.code} not found`);
      return await this.repo.save(entity);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async remove(code: string): Promise<MedicalEventType> {
    try {
      const entity = await this.findOne(code);
      await this.repo.remove(entity);
      return entity;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }
}
