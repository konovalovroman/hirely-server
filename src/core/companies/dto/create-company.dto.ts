import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateCompanyDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'CompanyName' })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Description of company' })
    description: string;

    @IsUrl()
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty({
        required: false,
        example: 'https://example.com/',
    })
    website?: string;
}
