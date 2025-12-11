import { Patient } from '../../patients/entities/patient.entity';
import { MedicalEventType } from '../../medical-event-types/entities/medical-event-type.entity';
import { VisibilityLevel } from '../../visibility-levels/entities/visibility-level.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('medical_history')
export class MedicalHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Patient, { eager: false })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @ManyToOne(() => MedicalEventType, { eager: false })
  @JoinColumn({ name: 'event_type', referencedColumnName: 'code' })
  eventType: MedicalEventType;

  @Column({ name: 'icd10_code', type: 'varchar', length: 16, nullable: true })
  icd10Code?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => VisibilityLevel, { eager: false })
  @JoinColumn({ name: 'visibility_code', referencedColumnName: 'code' })
  visibility: VisibilityLevel;

  @Column({ name: 'occurred_at', type: 'timestamptz', nullable: true })
  occurredAt?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date;
}
