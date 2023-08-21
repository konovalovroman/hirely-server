import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateRateDto {
    @IsInt()
    @Min(0)
    @Max(5)
    @ApiProperty({
        example: 5,
        minimum: 0,
        maximum: 5,
    })
    rate: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Nice company' })
    message: string;

    @IsInt()
    @Min(0)
    @ApiProperty({ example: 1 })
    company_id: number;
}
