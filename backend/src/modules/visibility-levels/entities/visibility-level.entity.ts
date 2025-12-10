import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('visibility_levels')
export class VisibilityLevel {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  code: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description?: string;
}
