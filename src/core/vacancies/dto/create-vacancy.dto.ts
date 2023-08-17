import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '@prisma/client';
import {
    ArrayMaxSize,
    IsArray,
    IsInt,
    IsNotEmpty,
    IsSemVer,
    IsString,
    Length,
    Min,
} from 'class-validator';

export class CreateVacancyDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Junior Node.js Developer' })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Describe vacancy, skills etc' })
    description: string;

    @IsInt()
    @Min(0)
    @ApiProperty({ example: 500 })
    salary: number;

    @IsInt()
    @Min(0)
    @ApiProperty({ example: 1, description: 'Years of expirience' })
    experience: number;

    @IsInt()
    @Min(0)
    @ApiProperty({ example: 1 })
    category_id: number;

    @IsInt()
    @Min(0)
    @ApiProperty({ example: 1 })
    location_id: number;

    @IsArray()
    @IsNotEmpty({ each: true })
    @IsString({ each: true })
    @ArrayMaxSize(10)
    @ApiProperty({ example: ['JavaScript', 'Node.js', 'Express'] })
    tags: string[];
}
