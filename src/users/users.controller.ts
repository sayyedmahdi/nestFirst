import { Controller, Get, Post, Body, Patch, Param, Delete , UseGuards , UseInterceptors , Query , UsePipes , ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import JwtAuthGuard from '../auth/auth.jwt.guard';
import { TransformInterceptor } from '../transform.interceptor';
import PermissionGuard from '../access-control/permission.guard';
import AdminPermission from '../access-control/adminPermissions';
import { ApiTags , ApiParam , ApiBearerAuth} from '@nestjs/swagger';


@Controller('users')
@UseInterceptors(TransformInterceptor)
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(new ValidationPipe({transform: true}))
   @UseGuards(PermissionGuard(AdminPermission.createUser))
  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);
    return {message: 'Created Successfully!', result};
  }

  @Get()
  @ApiParam({
    name: 'page',
    required: false,
    description: 'page number for pagination',
    type: String
  })
  async findAll(@Query('page') page : string) {
    const result = await this.usersService.findAll(page);
    return { message: 'list of users' , result}
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'the id of specific user',
    type: String
  })
  async findOne(@Param('id') id: string) {
    const result = await this.usersService.findOne(+id);
    return {message: 'query result', result};
  }

  @UsePipes(new ValidationPipe({transform: true}))
  @UseGuards(PermissionGuard(AdminPermission.updateUser))
  @Patch(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'the id of specific user',
    type: String
  })
  @ApiBearerAuth('JWT-auth')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.usersService.update(+id, updateUserDto);
    return {message: 'updated successfully!', result};
  }

  @UseGuards(PermissionGuard(AdminPermission.deleteUser))
  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'the id of specific user',
    type: String
  })
  @ApiBearerAuth('JWT-auth')
  remove(@Param('id') id: string) {
    const result = this.usersService.remove(+id);
    return { message: 'deleted successfully!' , result}
  }

}


