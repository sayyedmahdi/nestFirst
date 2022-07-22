import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
 
@Injectable()
export class FileControlService {
  constructor(
    private prisma: PrismaService,
  ) {}
  
  async getFileById(fileId: number) {
    const file = this.prisma.files.findFirst({where: {id: fileId}});
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }
  
  // ...
}



