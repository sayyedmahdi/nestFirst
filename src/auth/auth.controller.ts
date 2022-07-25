import { Body, Req, Controller, HttpCode, Post, UseGuards , Res, Get , UseInterceptors , UploadedFile , BadRequestException, Param , UsePipes , ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './localAuth.guard';
import { AuthService } from './auth.service';
import RequestWithUser from './requestWithUser.interface';
import { Express } from 'express';
import JwtAuthGuard from './auth.jwt.guard';
import LocalFilesInterceptor from '../file-control/localFiles.interceptor';
import { UsersService } from '../users/users.service';
import { TransformInterceptor } from '../transform.interceptor';
import { ApiTags , ApiConsumes , ApiBody , ApiBearerAuth } from '@nestjs/swagger';
import FileUploadDto from '../file-control/uploadFile.dto';
import { LoginDto } from './login.dto';
 
@UseInterceptors(TransformInterceptor)
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authenticationService: AuthService,
    private readonly userService : UsersService
  ) {}
 
  @UsePipes(new ValidationPipe({transform: true}))
  @Post('register')
  @ApiBearerAuth()
  async register(@Body() registrationData: CreateUserDto): Promise<any> {
    const result = await this.authenticationService.register(registrationData);
    return { message: 'registered successfully!' , result };
  }
 
  @Post('register/profile')
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'A new avatar for the user',
    type: FileUploadDto,
  })
  async addAvatar(@Body('userId') userId: string , @UploadedFile() file: Express.Multer.File){
    const result = await this.userService.addAvatar({
      mimetype: file.mimetype,
      path: file.path,
      fileName : file.originalname,
      userId: parseInt(userId)
    })
    return { message: 'profile photo saved successfully!' , result};
  }

  
  @UsePipes(new ValidationPipe({transform: true}))
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    type: LoginDto  
  })
  async logIn(@Req() request: RequestWithUser) : Promise<any> {
    const {user} = request;
    const token = this.authenticationService.getCookieWithJwtToken(user.id);
    user.accessToken = token;
    user.password = undefined;
    const result = user;
    return { message: 'loggedIn succesfully!' , result};
  }

  @UsePipes(new ValidationPipe({transform: true}))
  @UseGuards(JwtAuthGuard)
  @Get('verify')
  authenticate(@Req() request: RequestWithUser) {
    const result = request.user;
    result.password = undefined;
    return { message: 'Verify status' , result};
  }

}

function ApiProperty(arg0: { name: string; }) {
  throw new Error('Function not implemented.');
}
