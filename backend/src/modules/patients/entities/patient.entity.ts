import { User } from '../../users/entities/user.entity';
import { IdentityType } from '../../identity-types/entities/identity-type.entity';
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

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.patients, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'date_of_birth', type: 'date' })
  dateOfBirth: Date;

  @ManyToOne(() => IdentityType, (it) => it.patients, { eager: false, nullable: true })
  @JoinColumn({ name: 'uses_id' })
  identityType?: IdentityType;

  @Column({ name: 'national_id', nullable: true })
  nationalId?: string;

  @Column({ name: 'nationality_code', nullable: true })
  nationalityCode?: string;

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
