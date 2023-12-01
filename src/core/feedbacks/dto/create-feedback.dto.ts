import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateFeedbackDto {
    @IsInt()
    @Min(0)
    @ApiProperty({ example: 1 })
    vacancy_id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Your message' })
    message: string;
}
