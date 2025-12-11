import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalHistory } from './entities/medical-history.entity';
import { CreateMedicalHistoryInput } from './dto/create-medical-history.input';
import { UpdateMedicalHistoryInput } from './dto/update-medical-history.input';
import { PaginatedMedicalHistories } from './models/paginated-medical-histories.object';
import { PaginationInput } from '../../common/dto/pagination.input';
import { handleServiceError } from '../../common/utils/error-handler';
import { Patient } from '../patients/entities/patient.entity';
import { MedicalEventType } from '../medical-event-types/entities/medical-event-type.entity';
import { VisibilityLevel } from '../visibility-levels/entities/visibility-level.entity';

@Injectable()
export class MedicalHistoryService {
  private readonly logger = new Logger(MedicalHistoryService.name);

  constructor(
    @InjectRepository(MedicalHistory)
    private readonly medicalHistoryRepository: Repository<MedicalHistory>,
  ) {}

  async create(input: CreateMedicalHistoryInput): Promise<MedicalHistory> {
    try {
      const { patientId, eventTypeCode, icd10Code, description, visibilityCode, occurredAt } = input;
      if (!patientId) throw new BadRequestException('patientId is required');
      if (!eventTypeCode) throw new BadRequestException('eventTypeCode is required');

      const createData: Partial<MedicalHistory> = {
        icd10Code,
        description,
        occurredAt: occurredAt ? new Date(occurredAt) : undefined,
        patient: { id: patientId } as Patient,
        eventType: { code: eventTypeCode } as MedicalEventType,
      };

      if (visibilityCode) createData.visibility = { code: visibilityCode } as VisibilityLevel;

      const entity = this.medicalHistoryRepository.create(createData);
      const saved = await this.medicalHistoryRepository.save(entity);
      return await this.findOne(saved.id);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findAll(pagination?: PaginationInput): Promise<PaginatedMedicalHistories> {
    try {
      const take = pagination?.take ?? 10;
      const skip = pagination?.skip ?? 0;
      const [items, total] = await this.medicalHistoryRepository.findAndCount({ take, skip, relations: ['patient', 'eventType', 'visibility'] });
      return { items, total, take, skip } as PaginatedMedicalHistories;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findOne(id: string): Promise<MedicalHistory> {
    try {
      const item = await this.medicalHistoryRepository.findOne({ where: { id }, relations: ['patient', 'eventType', 'visibility'] });
      if (!item) throw new NotFoundException(`MedicalHistory with id ${id} not found`);
      return item;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async update(input: UpdateMedicalHistoryInput): Promise<MedicalHistory> {
    try {
      const { id, patientId, eventTypeCode, visibilityCode, occurredAt, icd10Code, description } = input;
      const preloadData: Partial<MedicalHistory> = { id };

      if (patientId) preloadData.patient = { id: patientId } as Patient;
      if (eventTypeCode) preloadData.eventType = { code: eventTypeCode } as MedicalEventType;
      if (visibilityCode) preloadData.visibility = { code: visibilityCode } as VisibilityLevel;
      if (icd10Code !== undefined) preloadData.icd10Code = icd10Code;
      if (description !== undefined) preloadData.description = description;
      if (occurredAt !== undefined) preloadData.occurredAt = occurredAt ? new Date(occurredAt) : undefined;

      const entity = await this.medicalHistoryRepository.preload(preloadData as Partial<MedicalHistory>);
      if (!entity) throw new NotFoundException('MedicalHistory not found');
      const saved = await this.medicalHistoryRepository.save(entity);
      return await this.findOne(saved.id);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async remove(id: string) {
    try {
      const item = await this.findOne(id);
      await this.medicalHistoryRepository.softDelete(id);
      return item;
    } catch (error) {
      handleServiceError(error, this.logger, {
        warnMessage: `Remove attempted on non-existing medical history: ${id}`,
      });
    }
  }
}
