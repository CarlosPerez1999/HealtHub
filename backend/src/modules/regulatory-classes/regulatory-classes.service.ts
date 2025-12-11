import { Injectable, Logger } from '@nestjs/common';
import { handleServiceError } from 'src/common/utils/error-handler';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegulatoryClass } from './entities/regulatory-class.entity';
import { CreateRegulatoryClassInput } from './dto/create-regulatory-class.input';
import { UpdateRegulatoryClassInput } from './dto/update-regulatory-class.input';
import { PaginationInput } from 'src/common/dto/pagination.input';

@Injectable()
export class RegulatoryClassesService {
  private readonly logger = new Logger(RegulatoryClassesService.name);

  constructor(
    @InjectRepository(RegulatoryClass)
    private readonly repo: Repository<RegulatoryClass>,
  ) {}

  async create(input: CreateRegulatoryClassInput) {
    try {
      const existing = await this.repo.findOne({ where: { code: input.code } });
      if (existing) throw new Error('RegulatoryClass with this code already exists');

      const entity = this.repo.create(input as Partial<RegulatoryClass>);
      return await this.repo.save(entity);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findAll() {
    try {
      return await this.repo.find();
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findAllPaginated(pagination?: PaginationInput) {
    const take = pagination?.take ?? 10;
    const skip = pagination?.skip ?? 0;

    try {
      const [items, total] = await this.repo.findAndCount({ take, skip });
      return { items, total, take, skip };
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findOne(code: string) {
    try {
      return await this.repo.findOne({ where: { code } });
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async update(code: string, input: UpdateRegulatoryClassInput) {
    try {
      const entity = await this.repo.preload({ code, ...input } as Partial<RegulatoryClass>);
      if (!entity) throw new Error('RegulatoryClass not found');
      return await this.repo.save(entity);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async remove(code: string) {
    try {
      return await this.repo.softDelete({ code } as any);
    } catch (error) {
      this.logger.error(error?.message ?? error);
      throw error;
    }
  }
}
