import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Module({
  providers: [AuthService , PrismaService , LocalStrategy , JwtStrategy , JwtService , UsersService],
  imports: [ UsersModule , PassportModule, ConfigModule, 
    JwtModule.register({
      secret: 'sasde',
      signOptions: { expiresIn: '60s' },
    }),],
  controllers: [AuthController]
})

export class AuthModule {}
