import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('countries')
export class Country {
  @PrimaryColumn({ type: 'varchar', length: 8 })
  code: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'phone_prefix', type: 'varchar', length: 8 })
  phonePrefix: string;
}
