import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.doctors, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'specialty_id', type: 'uuid', nullable: true })
  specialtyId?: string;

  @Column({ name: 'license_number' })
  licenseNumber: string;

  @Column({ name: 'license_country', nullable: true })
  licenseCountry?: string;

  @Column({ name: 'board_certified', default: false })
  boardCertified: boolean;

  @Column({ nullable: true })
  phone?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date;

  @BeforeInsert()
  normalizeInsert() {
    if (this.firstName) this.firstName = this.firstName.trim();
    if (this.lastName) this.lastName = this.lastName.trim();
  }

  @BeforeUpdate()
  normalizeUpdate() {
    if (this.firstName) this.firstName = this.firstName.trim();
    if (this.lastName) this.lastName = this.lastName.trim();
  }
}
