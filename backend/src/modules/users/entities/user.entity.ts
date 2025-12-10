import { Role } from 'src/modules/roles/entities/role.entity';
import { Patient } from 'src/modules/patients/entities/patient.entity';
import { Doctor } from 'src/modules/doctors/entities/doctor.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  
  @Column('boolean', { default: true })
  active: boolean;
  
  @Column({ name: 'email_verified', default: false })
  emailVerified: boolean;
  
  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => Patient, (patient) => patient.user)
  patients: Patient[];

  @OneToMany(() => Doctor, (doctor) => doctor.user)
  doctors: Doctor[];

  @Column({ name: 'last_login', type: 'timestamptz', nullable: true })
  lastLogin: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date;

  @BeforeInsert()
  normalizeInsert() {
    if (this.email) this.email = this.email.toLowerCase().trim();
    if (this.username) this.username = this.username.trim();
  }

  @BeforeUpdate()
  normalizeUpdate() {
    if (this.email) this.email = this.email.toLowerCase().trim();
    if (this.username) this.username = this.username.trim();
  }
}
