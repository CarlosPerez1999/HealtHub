import { Injectable, Logger, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VisibilityLevel } from './entities/visibility-level.entity';
import { CreateVisibilityLevelInput } from './dto/create-visibility-level.input';
import { UpdateVisibilityLevelInput } from './dto/update-visibility-level.input';
import { PaginatedVisibilityLevels } from './models/paginated-visibility-levels.object';
import { PaginationInput } from 'src/common/dto/pagination.input';
import { handleServiceError } from 'src/common/utils/error-handler';

@Injectable()
export class VisibilityLevelsService {
  private readonly logger = new Logger(VisibilityLevelsService.name);

  constructor(
    @InjectRepository(VisibilityLevel)
    private readonly repo: Repository<VisibilityLevel>,
  ) {}

  async create(input: CreateVisibilityLevelInput): Promise<VisibilityLevel> {
    try {
      const exist = await this.repo.findOneBy({ code: input.code});
      if (exist) throw new ConflictException(`Visibility level ${input.code} already exists`);
      const entity = this.repo.create(input);
      return await this.repo.save(entity);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findAll(pagination?: PaginationInput): Promise<PaginatedVisibilityLevels> {
    try {
      const take = pagination?.take ?? 10;
      const skip = pagination?.skip ?? 0;
      const [items, total] = await this.repo.findAndCount({ take, skip });
      return { items, total, take, skip } as PaginatedVisibilityLevels;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findOne(code: import('./enums/visibility-level.enum').VisibilityLevelEnum | string): Promise<VisibilityLevel> {
    try {
      const enumCode = code as import('./enums/visibility-level.enum').VisibilityLevelEnum;
      const item = await this.repo.findOne({ where: { code: enumCode } });
      if (!item) throw new NotFoundException(`Visibility level ${code} not found`);
      return item;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async update(input: UpdateVisibilityLevelInput): Promise<VisibilityLevel> {
    try {
      const entity = await this.repo.preload(input);
      if (!entity) throw new NotFoundException(`Visibility level ${input.code} not found`);
      return await this.repo.save(entity);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async remove(code: string): Promise<VisibilityLevel> {
    try {
      const item = await this.findOne(code);
      await this.repo.remove(item);
      return item;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }
}
