import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto} from '../users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt  from 'bcrypt';
import { TokenPayload } from './tokenPayload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
      ) {}
     
      public async register(registrationData: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        registrationData.password = hashedPassword;
        registrationData.nationalCode = parseInt(registrationData.nationalCode)
        try {
          const createdUser = await this.prisma.users.create({
            data: registrationData
          });
          createdUser.password = undefined;
          return createdUser;
        } catch (error) {
        //   if (error?.code === PostgresErrorCode.UniqueViolation) {
        //     throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
        //   }
          throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }

      public async getAuthenticatedUser(email: string, plainTextPassword: string) {
        try {
          const user = await this.prisma.users.findFirst({where: {email: email }});
          await this.verifyPassword(plainTextPassword, user.password);
          user.password = undefined;
          return user;
        } catch (error) {
          throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
      }

      private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
          plainTextPassword,
          hashedPassword
        );
        if (!isPasswordMatching) {
          throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
      }

      public getCookieWithJwtToken(userId: number) {
        const payload: TokenPayload = { userId };
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' , payload)
        const token = this.jwtService.sign(payload , {secret: 'sasde'});
        return token;
      }
}
