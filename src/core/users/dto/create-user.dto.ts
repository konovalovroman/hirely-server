import { UserRole } from 'src/utils/enums/user-role.enum';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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

    @IsString()
    @IsEnum(UserRole)
    @IsNotEmpty()
    @ApiProperty({
        enum: UserRole,
        enumName: 'Role',
    })
    role: UserRole;
}
