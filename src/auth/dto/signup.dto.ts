import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Roman' })
    first_name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Konovalov' })
    last_name: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'example@mail.com' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'asdf1234' })
    password: string;
}
