import { UserRole } from 'src/utils/enums/user-role.enum';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    @IsEnum(UserRole)
    role: UserRole;
}
