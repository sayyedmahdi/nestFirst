import { IsEmail, IsNotEmpty, IsOptional , MinLength} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    mobile: string;

    @IsNotEmpty()
    nationalCode: string;

    @IsOptional()
    profile: string;


}
