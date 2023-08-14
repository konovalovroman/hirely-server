import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLocationDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Kharkiv' })
    city: string;
}
