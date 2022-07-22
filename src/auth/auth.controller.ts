import { Body, Req, Controller, HttpCode, Post, UseGuards , Res, Get , UseInterceptors , UploadedFile , BadRequestException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './localAuth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import RequestWithUser from './requestWithUser.interface';
import { Express } from 'express';
import JwtAuthGuard from './auth.jwt.guard';
import LocalFilesInterceptor from '../file-control/localFiles.interceptor';
import { UsersService } from '../users/users.service';
 
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authenticationService: AuthService,
    private readonly userService : UsersService
  ) {}
 
  @Post('register')
  @UseInterceptors(LocalFilesInterceptor({
    fieldName: 'file',
    path: '/avatars',
    fileFilter: (request, file, callback) => {
      if (!file.mimetype.includes('image')) {
        return callback(new BadRequestException('Provide a valid image'), false);
      }
      callback(null, true);
    },
    limits: {
      fileSize: Math.pow(5120, 2) // 5MB
    }
  }))
  async register(@Body() registrationData: CreateUserDto , @Req() request: RequestWithUser, @UploadedFile() file: Express.Multer.File): Promise<void> {
    const user = await this.authenticationService.register(registrationData);
    this.userService.addAvatar(user.id, {
      path: file.path,
      filename: file.originalname,
      mimetype: file.mimetype
    })
  }
 

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const {user} = request;
    const token = this.authenticationService.getCookieWithJwtToken(user.id);
    user.accessToken = token;
    user.password = undefined;
    return response.send(user);
  }

  @Post('email')
  @UseGuards(JwtAuthGuard)
  getByEmail(@Body() email: string){
    return this.authenticationService.getAuthenticatedUser('ss@gmail.com' , 'someone');
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

}