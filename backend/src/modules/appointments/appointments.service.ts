import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { PaginationInput } from '../../common/dto/pagination.input';

@Injectable()
export class AppointmentsService {
  private readonly logger = new Logger(AppointmentsService.name);

  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentsRepository: Repository<Appointment>,
  ) {}

  async create(input: CreateAppointmentInput) {
    try {
      const entity = this.appointmentsRepository.create({
        patient: { id: input.patientId },
        doctor: { id: input.doctorId },
        appointmentType: { code: input.appointmentTypeCode },
        status: { code: input.statusCode },
        scheduledAt: new Date(input.scheduledAt),
      } as Partial<Appointment>);

      return await this.appointmentsRepository.save(entity);
    } catch (error) {
      this.logger.error(error?.message ?? error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.appointmentsRepository.find({ relations: ['patient', 'doctor', 'appointmentType', 'status'] });
    } catch (error) {
      this.logger.error(error?.message ?? error);
      throw error;
    }
  }

  async findAllPaginated(pagination?: PaginationInput) {
    const take = pagination?.take ?? 10;
    const skip = pagination?.skip ?? 0;

    try {
      const [items, total] = await this.appointmentsRepository.findAndCount({
        relations: ['patient', 'doctor', 'appointmentType', 'status'],
        take,
        skip,
      });

      return { items, total, take, skip };
    } catch (error) {
      this.logger.error(error?.message ?? error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      return await this.appointmentsRepository.findOne({ where: { id }, relations: ['patient', 'doctor', 'appointmentType', 'status'] });
    } catch (error) {
      this.logger.error(error?.message ?? error);
      throw error;
    }
  }

  async update(id: string, input: UpdateAppointmentInput) {
    try {
      const toPreload: Partial<Appointment> = { id } as Partial<Appointment>;

      if (input.patientId) toPreload.patient = { id: input.patientId } as any;
      if (input.doctorId) toPreload.doctor = { id: input.doctorId } as any;
      if (input.appointmentTypeCode) toPreload.appointmentType = { code: input.appointmentTypeCode } as any;
      if (input.statusCode) toPreload.status = { code: input.statusCode } as any;
      if (input.scheduledAt) toPreload.scheduledAt = new Date(input.scheduledAt as string);

      const entity = await this.appointmentsRepository.preload(toPreload as Appointment);
      if (!entity) throw new Error('Appointment not found');

      return await this.appointmentsRepository.save(entity);
    } catch (error) {
      this.logger.error(error?.message ?? error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.appointmentsRepository.softDelete(id);
    } catch (error) {
      this.logger.error(error?.message ?? error);
      throw error;
    }
  }
}
