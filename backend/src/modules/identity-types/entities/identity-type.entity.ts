import { Patient } from 'src/modules/patients/entities/patient.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

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
}
