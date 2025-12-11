import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalNote } from './entities/medical-note.entity';
import { CreateMedicalNoteInput } from './dto/create-medical-note.input';
import { UpdateMedicalNoteInput } from './dto/update-medical-note.input';
import { handleServiceError } from '../../common/utils/error-handler';

@Injectable()
export class MedicalNotesService {
  constructor(
    @InjectRepository(MedicalNote)
    private readonly repo: Repository<MedicalNote>,
    private readonly logger = new Logger(MedicalNotesService.name),
  ) {}

  async create(input: CreateMedicalNoteInput) {
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

  async update(id: string, input: UpdateMedicalNoteInput) {
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
