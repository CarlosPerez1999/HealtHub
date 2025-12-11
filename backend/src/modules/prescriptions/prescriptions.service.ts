import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prescription } from './entities/prescription.entity';
import { CreatePrescriptionInput } from './dto/create-prescription.input';
import { UpdatePrescriptionInput } from './dto/update-prescription.input';
import { handleServiceError } from '../../common/utils/error-handler';

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectRepository(Prescription)
    private readonly repo: Repository<Prescription>,
    private readonly logger = new Logger(PrescriptionsService.name),
  ) {}

  async create(input: CreatePrescriptionInput) {
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

  async update(id: string, input: UpdatePrescriptionInput) {
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
