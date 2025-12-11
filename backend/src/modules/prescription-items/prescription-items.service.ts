import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrescriptionItem } from './entities/prescription-item.entity';
import { CreatePrescriptionItemInput } from './dto/create-prescription-item.input';
import { UpdatePrescriptionItemInput } from './dto/update-prescription-item.input';
import { handleServiceError } from '../../common/utils/error-handler';
import { Logger } from '@nestjs/common';

@Injectable()
export class PrescriptionItemsService {
  constructor(
    @InjectRepository(PrescriptionItem)
    private readonly repo: Repository<PrescriptionItem>,
    private readonly logger = new Logger(PrescriptionItemsService.name),
  ) {}

  async create(input: CreatePrescriptionItemInput) {
    try {
      const entity = this.repo.create(input);
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

  async findOne(id: string) {
    try {
      return await this.repo.findOneBy({ id });
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async update(id: string, input: UpdatePrescriptionItemInput) {
    try {
      await this.repo.update({ id }, input);
      return this.findOne(id);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async remove(id: string) {
    try {
      await this.repo.softDelete({ id });
      return true;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }
}
