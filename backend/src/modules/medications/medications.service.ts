import { Injectable, Logger } from '@nestjs/common';
import { handleServiceError } from 'src/common/utils/error-handler';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medication } from './entities/medication.entity';
import { CreateMedicationInput } from './dto/create-medication.input';
import { UpdateMedicationInput } from './dto/update-medication.input';
import { PaginationInput } from 'src/common/dto/pagination.input';

@Injectable()
export class MedicationsService {
  private readonly logger = new Logger(MedicationsService.name);

  constructor(
    @InjectRepository(Medication)
    private readonly repo: Repository<Medication>,
  ) {}

  async create(input: CreateMedicationInput) {
    try {
      const entity = this.repo.create(input)

      return await this.repo.save(entity);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findAll() {
    try {
      return await this.repo.find({ relations: ['regulatoryClass'] });
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findAllPaginated(pagination?: PaginationInput) {
    const take = pagination?.take ?? 10;
    const skip = pagination?.skip ?? 0;

    try {
      const [items, total] = await this.repo.findAndCount({
        relations: ['regulatoryClass'],
        take,
        skip,
      });
      return { items, total, take, skip };
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findOne(id: string) {
    try {
      return await this.repo.findOne({
        where: { id },
        relations: ['regulatoryClass'],
      });
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async update(id: string, input: UpdateMedicationInput) {
    try {
      const entity = await this.repo.preload(UpdateMedicationInput);
      if (!entity) throw new Error('Medication not found');

      return await this.repo.save(entity);
    } catch (error) {
      handleServiceError(error, this.logger);
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
