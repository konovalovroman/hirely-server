import { UserRole } from 'src/utils/enums/user-role.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    first_name?: string;

    @IsString()
    @IsOptional()
    last_name?: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsString()
    @IsOptional()
    role?: UserRole;

    @IsString()
    @IsOptional()
    rt_hash?: string;
}
