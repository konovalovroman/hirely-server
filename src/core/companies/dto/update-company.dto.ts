import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateCompanyDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description?: string;

    @IsUrl()
    @IsOptional()
    @IsNotEmpty()
    website?: string;
}
