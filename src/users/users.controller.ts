import { Controller, Get, Post, Body, Patch, Param, Delete , UseGuards , UseInterceptors , Query} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import JwtAuthGuard from '../auth/auth.jwt.guard';
import { TransformInterceptor } from '../transform.interceptor';
import PermissionGuard from '../access-control/permission.guard';
import AdminPermission from '../access-control/adminPermissions';
import { Serialize } from '../persian.transform.interceptor';


@Controller('users')
@UseInterceptors(TransformInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Serialize(['nationalCode' , 'mobile' , 'password'])
  @UseGuards(PermissionGuard(AdminPermission.createUser))
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);
    return {message: 'Created Successfully!', result};
  }

  @Get()
  async findAll(@Query('page') page : string) {
    const result = await this.usersService.findAll(page);
    return { message: 'list of users' , result}
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.usersService.findOne(+id);
    return {message: 'query result', result};
  }

  @Serialize(['nationalCode' , 'mobile' , 'password'])
  @UseGuards(PermissionGuard(AdminPermission.updateUser))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.usersService.update(+id, updateUserDto);
    return {message: 'updated successfully!', result};
  }

  @UseGuards(PermissionGuard(AdminPermission.deleteUser))
  @Delete(':id')
  remove(@Param('id') id: string) {
    const result = this.usersService.remove(+id);
    return { message: 'deleted successfully!' , result}
  }

}


