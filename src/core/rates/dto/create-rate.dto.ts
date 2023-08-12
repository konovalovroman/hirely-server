import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateRateDto {
    @IsInt()
    @Min(0)
    @Max(5)
    rate: number;

    @IsString()
    @IsNotEmpty()
    message: string;
}
