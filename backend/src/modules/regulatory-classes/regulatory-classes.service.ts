import { Injectable, Logger } from '@nestjs/common';
import { handleServiceError } from '../../common/utils/error-handler';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegulatoryClass } from './entities/regulatory-class.entity';
import { CreateRegulatoryClassInput } from './dto/create-regulatory-class.input';
import { UpdateRegulatoryClassInput } from './dto/update-regulatory-class.input';
import { PaginationInput } from '../../common/dto/pagination.input';

@Injectable()
export class RegulatoryClassesService {
  private readonly logger = new Logger(RegulatoryClassesService.name);

  constructor(
    @InjectRepository(RegulatoryClass)
    private readonly regulatoryClassesRepository: Repository<RegulatoryClass>,
  ) {}

  async create(input: CreateRegulatoryClassInput) {
    try {
      const existing = await this.regulatoryClassesRepository.findOne({ where: { code: input.code } });
      if (existing) throw new Error('RegulatoryClass with this code already exists');

      const entity = this.regulatoryClassesRepository.create(input as Partial<RegulatoryClass>);
      return await this.regulatoryClassesRepository.save(entity);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findAll() {
    try {
      return await this.regulatoryClassesRepository.find();
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findAllPaginated(pagination?: PaginationInput) {
    const take = pagination?.take ?? 10;
    const skip = pagination?.skip ?? 0;

    try {
      const [items, total] = await this.regulatoryClassesRepository.findAndCount({ take, skip });
      return { items, total, take, skip };
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findOne(code: string) {
    try {
      return await this.regulatoryClassesRepository.findOne({ where: { code } });
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async update(code: string, input: UpdateRegulatoryClassInput) {
    try {
      const entity = await this.regulatoryClassesRepository.preload({ code, ...input } as Partial<RegulatoryClass>);
      if (!entity) throw new Error('RegulatoryClass not found');
      return await this.regulatoryClassesRepository.save(entity);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async remove(code: string) {
    try {
      return await this.regulatoryClassesRepository.softDelete({ code } as any);
    } catch (error) {
      this.logger.error(error?.message ?? error);
      throw error;
    }
  }
}
