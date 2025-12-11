import { User } from '../../users/entities/user.entity';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @BeforeInsert()
  normalizeInsert() {
    if (this.code) this.code = this.code.toUpperCase();
    if (this.description) this.description = this.description.toLowerCase();
  }

  @BeforeUpdate()
  normalizeUpdate() {
    if (this.code) this.code = this.code.toUpperCase();
    if (this.description) this.description = this.description.toLowerCase();
  }
}
