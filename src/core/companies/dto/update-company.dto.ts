import { IsOptional, IsString, IsUrl } from "class-validator";

export class UpdateCompanyDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    @IsUrl()
    website?: string;
}
