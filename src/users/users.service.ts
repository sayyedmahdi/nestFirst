import { Injectable , HttpException, HttpStatus , Response} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaOffsetPagination } from 'prisma-offset-pagination';
import { LocalFileDto } from '../file-control/createFile.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    return this.prisma.users.create({data: createUserDto });
  }

  addAvatar( file: LocalFileDto){
    return this.prisma.files.create({data: file})
  }

  async findAll(cursor: string) {
    return prismaOffsetPagination({
      model: {name: 'users'},
      cursor: cursor,
      include: {profile: true},
      size: 1,
      buttonNum: 2,
      orderBy: 'id',
      orderDirection: 'desc',
      prisma: this.prisma
    });
  }

  async findOne(id: number) {
    return this.prisma.users.findFirst({where: {id} , include: {profile: true}});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.users.update({where: {id} , data: updateUserDto});
  }

  async remove(id: number) {
    const result = this.prisma.users.delete({where: {id}});
    this.prisma.files.delete({where: {userId : id}});
    return result;
  }
}
