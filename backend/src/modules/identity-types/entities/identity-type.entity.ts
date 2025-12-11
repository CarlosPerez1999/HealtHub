import { Patient } from '../../patients/entities/patient.entity';
import { Column, Entity, OneToMany, PrimaryColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('identity_types')
export class IdentityType {
  @PrimaryColumn({ type: 'varchar', length: 32 })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  value?: string;

  @OneToMany(() => Patient, (patient) => patient.identityType)
  patients: Patient[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date;
}
