import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail , IsNotEmpty } from 'class-validator';

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
}
