import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    mobile: string;

    @IsNotEmpty()
    nationalCode: string;

    @IsOptional()
    profile: string;


}
