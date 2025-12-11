import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrescriptionStatus } from './entities/prescription-status.entity';
import { CreatePrescriptionStatusInput } from './dto/create-prescription-status.input';
import { UpdatePrescriptionStatusInput } from './dto/update-prescription-status.input';
import { handleServiceError } from '../../common/utils/error-handler';

@Injectable()
export class PrescriptionStatusService {
  private readonly logger = new Logger(PrescriptionStatusService.name);

  constructor(
    @InjectRepository(PrescriptionStatus)
    private readonly prescriptionStatusRepository: Repository<PrescriptionStatus>,
  ) {}

  async create(input: CreatePrescriptionStatusInput) {
    try {
      const entity = this.prescriptionStatusRepository.create(input);
      return await this.prescriptionStatusRepository.save(entity);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findAll() {
    try {
      return await this.prescriptionStatusRepository.find();
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findOne(code: string) {
    try {
      return await this.prescriptionStatusRepository.findOneBy({ code });
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async update(code: string, input: UpdatePrescriptionStatusInput) {
    try {
      await this.prescriptionStatusRepository.update({ code }, input);
      return this.findOne(code);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async remove(code: string) {
    try {
      await this.prescriptionStatusRepository.softDelete({ code });
      return true;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }
}
