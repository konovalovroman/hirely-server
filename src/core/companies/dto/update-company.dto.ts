import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateCompanyDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({
        required: false,
        example: 'CompanyName',
    })
    name?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({
        required: false,
        example: 'Description of company',
    })
    description?: string;

    @IsUrl()
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty({
        required: false,
        example: 'https://example.com',
    })
    website?: string;
}
