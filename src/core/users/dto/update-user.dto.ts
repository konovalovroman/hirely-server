import { UserRole } from 'src/utils/enums/user-role.enum';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    first_name?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    last_name?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    password?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    role?: UserRole;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    rt_hash?: string;
}
