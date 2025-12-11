import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrescriptionItem } from './entities/prescription-item.entity';
import { CreatePrescriptionItemInput } from './dto/create-prescription-item.input';
import { UpdatePrescriptionItemInput } from './dto/update-prescription-item.input';
import { handleServiceError } from '../../common/utils/error-handler';

@Injectable()
export class PrescriptionItemsService {
  private readonly logger = new Logger(PrescriptionItemsService.name);

  constructor(
    @InjectRepository(PrescriptionItem)
    private readonly prescriptionItemsRepository: Repository<PrescriptionItem>,
  ) {}

  async create(input: CreatePrescriptionItemInput) {
    try {
      const entity = this.prescriptionItemsRepository.create(input);
      return await this.prescriptionItemsRepository.save(entity);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findAll() {
    try {
      return await this.prescriptionItemsRepository.find();
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findOne(id: string) {
    try {
      return await this.prescriptionItemsRepository.findOneBy({ id });
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async update(id: string, input: UpdatePrescriptionItemInput) {
    try {
      await this.prescriptionItemsRepository.update({ id }, input);
      return this.findOne(id);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async remove(id: string) {
    try {
      await this.prescriptionItemsRepository.softDelete({ id });
      return true;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }
}
