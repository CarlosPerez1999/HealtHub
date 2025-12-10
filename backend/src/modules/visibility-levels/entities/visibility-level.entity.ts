import { VisibilityLevelEnum } from '../enums/visibility-level.enum';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('visibility_levels')
export class VisibilityLevel {
  @PrimaryColumn({ type: 'enum', enum: VisibilityLevelEnum })
  code: VisibilityLevelEnum;
}
