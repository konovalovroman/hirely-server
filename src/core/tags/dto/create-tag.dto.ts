import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Node.js' })
    name: string;
}
