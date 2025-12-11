import { Column, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('regulatory_classes')
export class RegulatoryClass {
  @Column({ type: 'varchar', length: 64, primary: true })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date;
}
