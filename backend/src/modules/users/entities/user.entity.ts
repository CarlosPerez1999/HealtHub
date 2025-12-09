import { Role } from 'src/modules/roles/entities/role.entity';
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

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ default: true })
  active: boolean;

  @Column({ name: 'email_verified', default: false })
  emailVerified: boolean;

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
