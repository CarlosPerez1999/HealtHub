import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('medical_event_types')
export class MedicalEventType {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;
}
