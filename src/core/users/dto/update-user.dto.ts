import { UserRole } from 'src/utils/enums/user-role.enum';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ required: false, example: 'Roman' })
    first_name?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ required: false, example: 'Konovalov' })
    last_name?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ required: false, example: 'asdf1234' })
    password?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({
        required: false,
        enum: UserRole,
        enumName: 'Role',
    })
    role?: UserRole;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({
        required: false,
        example: 'refresh_token_hash',
    })
    rt_hash?: string;
}
