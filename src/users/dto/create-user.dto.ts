import { IsEmail, IsNotEmpty, IsOptional , MinLength} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsNotEmpty()
    @ApiProperty({type: String, required: true})
    firstName: string;

    @IsNotEmpty()
    @ApiProperty({type: String, required: true})
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({type: String, required: true})
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @Transform((s) => s.value.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    @ApiProperty({type: String, required: true})
    password: string;

    @IsNotEmpty()
    @Transform((s) => s.value.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    @ApiProperty({type: String, required: true})
    mobile: string;

    @IsNotEmpty()
    @Transform((s) => s.value.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    @ApiProperty({type: String, required: true})
    nationalCode: string;

   


}

