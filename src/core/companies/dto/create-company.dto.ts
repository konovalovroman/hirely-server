import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateCompanyDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    @IsUrl()
    @IsOptional()
    website?: string;
}
