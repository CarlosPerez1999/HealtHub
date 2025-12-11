import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { RegulatoryClass } from '../../regulatory-classes/entities/regulatory-class.entity';

@Entity('medications')
export class Medication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'atc_code', type: 'varchar', length: 32, nullable: true })
  atcCode?: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  strength?: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  form?: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  unit?: string;

  @ManyToOne(() => RegulatoryClass, { nullable: true })
  @JoinColumn({ name: 'regulatory_class_id', referencedColumnName: 'code' })
  regulatoryClass?: RegulatoryClass;

  @Column({ type: 'jsonb', nullable: true })
  indications?: any;

  @Column({ type: 'jsonb', nullable: true })
  dosageGuidelines?: any;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date;
}
