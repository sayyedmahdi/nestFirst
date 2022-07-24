import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { FileControlModule } from './file-control/file-control.module';
import { CustomDynamicModule } from './custom-dynamic-module/dynamic.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    FileControlModule,
    CustomDynamicModule.register({ property: 'X_PROPERTY' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


