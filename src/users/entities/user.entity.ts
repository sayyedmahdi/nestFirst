import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail , IsNotEmpty , IsOptional } from 'class-validator';
import Role from '../../access-control/roles';
import Permission from '../../access-control/permission.type';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    firstName:string;

    @Column() 
    @IsNotEmpty()
    lastName:string;

    @Column({default: true}) 
    isActive:boolean;

    @Column({default: ''})
    profile: string;

    @Column({unique: true})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column({default: 0})
    balance: number;

    @Column({unique: true})
    @IsNotEmpty()
    nationalCode : string;

    @Column()
    @IsNotEmpty()
    mobile : string;

    @Column()
    @IsNotEmpty()
    password : string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User
      })
    role: Role

    @Column()
    @IsOptional()
    accessToken: string;

    @Column({
      type: 'enum',
      enum: Permission,
      array: true,
      default: []
    })
    permissions: Permission[]
}
