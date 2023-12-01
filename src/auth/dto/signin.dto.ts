import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'example@mail.com' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'asdf1234' })
    password: string;
}
