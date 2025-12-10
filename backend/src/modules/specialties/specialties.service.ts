import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Specialty } from './entities/specialty.entity';
import { CreateSpecialtyInput } from './dto/create-specialty.input';
import { UpdateSpecialtyInput } from './dto/update-specialty.input';
import { PaginationInput } from 'src/common/dto/pagination.input';
import { PaginatedSpecialties } from './models/paginated-specialties.object';
import { handleServiceError } from 'src/common/utils/error-handler';

@Injectable()
export class SpecialtiesService {
  private readonly logger = new Logger(SpecialtiesService.name);

  constructor(
    @InjectRepository(Specialty)
    private readonly specialtyRepository: Repository<Specialty>,
  ) {}

  async create(input: CreateSpecialtyInput): Promise<Specialty> {
    try {
      const entity = this.specialtyRepository.create(input);
      return await this.specialtyRepository.save(entity);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findAll(pagination?: PaginationInput): Promise<PaginatedSpecialties> {
    try {
      const take = pagination?.take ?? 10;
      const skip = pagination?.skip ?? 0;
      const [items, total] = await this.specialtyRepository.findAndCount({ take, skip });
      return { items, total, take, skip } as PaginatedSpecialties;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findOne(id: string): Promise<Specialty> {
    try {
      const item = await this.specialtyRepository.findOne({ where: { id } });
      if (!item) throw new NotFoundException(`Specialty with id ${id} not found`);
      return item;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async update(input: UpdateSpecialtyInput) {
    try {
      const entity = await this.specialtyRepository.preload(input as any);
      if (!entity) throw new NotFoundException(`Specialty with id ${input.id} not found`);
      return await this.specialtyRepository.save(entity);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async remove(id: string) {
    try {
      const item = await this.findOne(id);
      await this.specialtyRepository.remove(item);
      return item;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }
}
