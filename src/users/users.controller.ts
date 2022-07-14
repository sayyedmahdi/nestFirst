import { Controller, Post, Body, Get, Put, Delete,Param} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { filterUserDto } from '../dtos/filterUserDto';

@Controller('users')
export class UsersController {

    constructor(private service: UsersService) { }

    @Get(':id')
    get(@Param() params) {
        return this.service.getUser(params.id);
    }

    @Get()
    list(){
        return this.service.getUsers();
    }

    @Post()
    create(@Body() user: User) {
        return this.service.createUser(user);
    }

    @Post('filter')
    filter(@Body() req : filterUserDto) {
        return this.service.filterUser(req);
    }

    @Put()
    update(@Body() user: User) {
        return this.service.updateUser(user);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteUser(params.id);
    }
}