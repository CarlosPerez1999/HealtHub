import { User } from 'src/modules/users/entities/user.entity';
import { State } from 'src/modules/states/entities/state.entity';
import { Country } from 'src/modules/countries/entities/country.entity';
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

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'line1' })
  line1: string;

  @Column({ name: 'line2' })
  line2: string;

  @Column({ name: 'city' })
  city: string;

  @Column({ name: 'postal_code' })
  postalCode: string;

  @ManyToOne(() => State, { eager: false })
  @JoinColumn({ name: 'state_id' })
  state: State;

  @ManyToOne(() => Country, { eager: false })
  @JoinColumn({ name: 'country_code' })
  country: Country;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date;

  @BeforeInsert()
  normalizeInsert() {
    if (this.line1) this.line1 = this.line1.trim();
    if (this.line2) this.line2 = this.line2.trim();
    if (this.city) this.city = this.city.trim();
    if (this.postalCode) this.postalCode = this.postalCode.trim();
  }

  @BeforeUpdate()
  normalizeUpdate() {
    if (this.line1) this.line1 = this.line1.trim();
    if (this.line2) this.line2 = this.line2.trim();
    if (this.city) this.city = this.city.trim();
    if (this.postalCode) this.postalCode = this.postalCode.trim();
  }
}
