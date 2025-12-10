import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('states')
export class State {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'state_code', type: 'varchar', length: 16 })
  stateCode: string;

  @Column({ name: 'country_code', type: 'varchar', length: 8 })
  countryCode: string;
}
