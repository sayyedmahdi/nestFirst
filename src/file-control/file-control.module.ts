import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FileControlService } from './file-control.service';

@Module({
  providers: [FileControlService , PrismaService],
  imports: [PrismaModule]
})
export class FileControlModule {}

