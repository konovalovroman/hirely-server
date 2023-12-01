import { ApiProperty } from '@nestjs/swagger';
import {
    ArrayMaxSize,
    IsArray,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsSemVer,
    IsString,
    Length,
    Min,
} from 'class-validator';

export class UpdateVacancyDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'Junior Node.js Developer', required: false })
    name?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'Describe vacancy, skills etc', required: false })
    description?: string;

    @IsInt()
    @Min(0)
    @IsOptional()
    @ApiProperty({ example: 500, required: false })
    salary?: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    @ApiProperty({
        example: 1,
        description: 'Years of expirience',
        required: false,
    })
    experience?: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    @ApiProperty({ example: 1, required: false })
    category_id?: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    @ApiProperty({ example: 1, required: false })
    location_id?: number;

    @IsArray()
    @IsNotEmpty({ each: true })
    @IsString({ each: true })
    @ArrayMaxSize(10)
    @IsOptional()
    @ApiProperty({
        example: ['JavaScript', 'Node.js', 'Express'],
        required: false,
    })
    tags?: string[];
}
