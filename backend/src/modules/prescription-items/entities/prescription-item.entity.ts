import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Prescription } from '../../prescriptions/entities/prescription.entity';
import { Medication } from '../../medications/entities/medication.entity';

@Entity('prescription_items')
export class PrescriptionItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Prescription, { nullable: false })
  @JoinColumn({ name: 'prescription_id', referencedColumnName: 'id' })
  prescription: Prescription;

  @ManyToOne(() => Medication, { nullable: false })
  @JoinColumn({ name: 'medication_id', referencedColumnName: 'id' })
  medication: Medication;

  @Column({ type: 'varchar', length: 64 })
  dose: string;

  @Column({ type: 'varchar', length: 64 })
  frequency: string;

  @Column({ type: 'varchar', length: 64 })
  duration: string;

  @Column({ type: 'varchar', length: 64 })
  route: string;

  @Column({ type: 'text', nullable: true })
  instructions?: string;
}
