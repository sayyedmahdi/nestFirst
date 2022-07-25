import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { Express } from 'express';
 
export class LoginDto {
  @ApiProperty({ type: 'string'})
  @IsEmail()
  email: string;

  @ApiProperty({type: 'string'})
  password : string
}
 