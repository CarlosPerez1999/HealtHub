import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrescriptionStatus } from './entities/prescription-status.entity';
import { CreatePrescriptionStatusInput } from './dto/create-prescription-status.input';
import { UpdatePrescriptionStatusInput } from './dto/update-prescription-status.input';
import { handleServiceError } from '../../common/utils/error-handler';

@Injectable()
export class PrescriptionStatusService {
  constructor(
    @InjectRepository(PrescriptionStatus)
    private readonly repo: Repository<PrescriptionStatus>,
    private readonly logger = new Logger(PrescriptionStatusService.name),
  ) {}

  async create(input: CreatePrescriptionStatusInput) {
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

  async findOne(code: string) {
    try {
      return await this.repo.findOneBy({ code });
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async update(code: string, input: UpdatePrescriptionStatusInput) {
    try {
      await this.repo.update({ code }, input);
      return this.findOne(code);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async remove(code: string) {
    try {
      await this.repo.softDelete({ code });
      return true;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }
}
