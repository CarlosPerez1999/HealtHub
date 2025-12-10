import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdentityType } from './entities/identity-type.entity';
import { CreateIdentityTypeInput } from './dto/create-identity-type.input';
import { UpdateIdentityTypeInput } from './dto/update-identity-type.input';
import { PaginatedIdentityTypes } from './models/paginated-identity-types.object';
import { PaginationInput } from 'src/common/dto/pagination.input';
import { handleServiceError } from 'src/common/utils/error-handler';

@Injectable()
export class IdentityTypesService {
  private readonly logger = new Logger(IdentityTypesService.name);

  constructor(
    @InjectRepository(IdentityType)
    private readonly identityRepository: Repository<IdentityType>,
  ) {}

  async create(input: CreateIdentityTypeInput): Promise<IdentityType> {
    try {
      const entity = this.identityRepository.create(input);
      return await this.identityRepository.save(entity);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findAll(pagination?: PaginationInput): Promise<PaginatedIdentityTypes> {
    try {
      const take = pagination?.take ?? 10;
      const skip = pagination?.skip ?? 0;
      const [items, total] = await this.identityRepository.findAndCount({ take, skip });
      return { items, total, take, skip } as PaginatedIdentityTypes;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findOne(code: string): Promise<IdentityType> {
    try {
      const item = await this.identityRepository.findOne({ where: { code } });
      if (!item) throw new NotFoundException(`IdentityType with code ${code} not found`);
      return item;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async update(input: UpdateIdentityTypeInput): Promise<IdentityType> {
    try {
      const entity = await this.identityRepository.preload(input as Partial<IdentityType>);
      if (!entity) throw new NotFoundException(`IdentityType with code ${input.code} not found`);
      return await this.identityRepository.save(entity);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async remove(code: string): Promise<IdentityType> {
    try {
      const entity = await this.findOne(code);
      await this.identityRepository.remove(entity);
      return entity;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }
}
