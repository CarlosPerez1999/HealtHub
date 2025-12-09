import { RoleEnum } from "src/modules/roles/enums/roles.enum";
import { User } from "src/modules/users/entities/user.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number
  @Column({type:'enum', enum:RoleEnum, unique:true})
  code: RoleEnum
  @Column()
  description: string

  @CreateDateColumn({name: 'created_at', type: 'timestamptz'})
  createdAt: Date
  @UpdateDateColumn({name: 'updated_at', type: 'timestamptz'})
  updatedAt: Date
  @DeleteDateColumn({name: 'deleted_at', type: 'timestamptz'})
  deletedAt: Date

  @OneToMany(() => User, (user) => user.role)
  users: User[]

  @BeforeInsert()
  normalizeInsert(){
    this.code = this.code.toUpperCase() as RoleEnum
    this.description = this.description.toLowerCase()
  }
  @BeforeUpdate()
  normalizeUpdate(){
    this.code = this.code.toUpperCase() as RoleEnum
    this.description = this.description.toLowerCase()
  }
}
