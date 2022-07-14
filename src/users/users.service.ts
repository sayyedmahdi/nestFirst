import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { filterUserDto } from '../dtos/filterUserDto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async getUser(_id: number): Promise<User[]> {
        return await this.usersRepository.find({
            select: ["firstName", "email", "isActive"],
            where: [{ "id": _id }]
        });
    }

    async filterUser(req: filterUserDto): Promise<User[]> {
        let query = `select * from user where `;
        let conditions : string[] = [];
        if (req.firstName !== undefined){
            conditions.push(` firstName like '%${req.firstName}%'`);
        }
        if (req.lastName !== undefined){
            conditions.push(` lastName like '%${req.lastName}%'`);
        }
        if (req.email !== undefined){
            conditions.push(` email like '%${req.email}%'`);
        }
        if (req.balance !== undefined){
            conditions.push(` balance = ${req.balance}`);
        }

        conditions.forEach((cond , index) => {
            if (!index){
                query += cond;
            }else{
                query += 'and ' + cond;
            }
        })

        return await this.usersRepository.query(query);
    }

    async updateUser(user: User) {
        this.usersRepository.save(user);
    }

    async createUser(user: User): Promise<any> {
        return this.usersRepository.save(user);
    }

    async deleteUser(user: User) {
        this.usersRepository.delete(user);
    }
}