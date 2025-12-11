import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { MedicalNote } from '../../medical-notes/entities/medical-note.entity';
import { Doctor } from '../../doctors/entities/doctor.entity';
import { Patient } from '../../patients/entities/patient.entity';
import { PrescriptionStatus } from '../../prescription-status/entities/prescription-status.entity';

@Entity('prescriptions')
export class Prescription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => MedicalNote, { nullable: false })
  @JoinColumn({ name: 'medical_note_id', referencedColumnName: 'id' })
  medicalNote: MedicalNote;

  @ManyToOne(() => Doctor, { nullable: false })
  @JoinColumn({ name: 'doctor_id', referencedColumnName: 'id' })
  doctor: Doctor;

  @ManyToOne(() => Patient, { nullable: false })
  @JoinColumn({ name: 'patient_id', referencedColumnName: 'id' })
  patient: Patient;

  @Column({ name: 'issued_at', type: 'timestamptz' })
  issuedAt: Date;

  @Column({ name: 'expires_at', type: 'timestamptz', nullable: true })
  expiresAt?: Date;

  @ManyToOne(() => PrescriptionStatus, { nullable: false })
  @JoinColumn({ name: 'status_code', referencedColumnName: 'code' })
  status: PrescriptionStatus;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date;
}
