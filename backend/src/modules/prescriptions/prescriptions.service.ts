import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prescription } from './entities/prescription.entity';
import { CreatePrescriptionInput } from './dto/create-prescription.input';
import { UpdatePrescriptionInput } from './dto/update-prescription.input';
import { handleServiceError } from '../../common/utils/error-handler';

@Injectable()
export class PrescriptionsService {
  private readonly logger = new Logger(PrescriptionsService.name);

  constructor(
    @InjectRepository(Prescription)
    private readonly prescriptionsRepository: Repository<Prescription>,
  ) {}

  async create(input: CreatePrescriptionInput) {
    try {
      const entity = this.prescriptionsRepository.create(input);
      return await this.prescriptionsRepository.save(entity);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findAll() {
    try {
      return await this.prescriptionsRepository.find();
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findOne(id: string) {
    try {
      return await this.prescriptionsRepository.findOneBy({ id });
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async update(id: string, input: UpdatePrescriptionInput) {
    try {
      await this.prescriptionsRepository.update({ id }, input);
      return this.findOne(id);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async remove(id: string) {
    try {
      await this.prescriptionsRepository.softDelete({ id });
      return true;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }
}
