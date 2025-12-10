import { Doctor } from 'src/modules/doctors/entities/doctor.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('specialties')
export class Specialty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  code?: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(() => Doctor, (doctor) => doctor.specialty)
  doctors: Doctor[];
}
