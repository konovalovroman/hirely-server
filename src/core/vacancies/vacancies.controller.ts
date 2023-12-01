import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    BadRequestException,
    NotFoundException,
    UseInterceptors,
    HttpStatus,
} from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { CurrentUser } from 'src/auth/common/decorators/current-user.decorator';
import {
    ApiBearerAuth,
    ApiHeader,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('Vacancies')
@ApiBearerAuth()
@Controller('vacancies')
export class VacanciesController {
    constructor(private readonly vacanciesService: VacanciesService) {}

    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Vacancy has been successfully created.',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Vacancy creation error.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Post()
    async create(
        @Body() createVacancyDto: CreateVacancyDto,
        @CurrentUser('sub') userId: number,
    ) {
        const vacancy = await this.vacanciesService.create(
            createVacancyDto,
            userId,
        );
        if (!vacancy) {
            throw new BadRequestException('Vacancy creation error.');
        }
        return vacancy;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Returns a list of vacancies.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Get()
    async findAll() {
        const vacancies = await this.vacanciesService.findAll();
        return vacancies;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Returns a vacancy with a given id if it exists.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Vacancy with given id does not exist.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const vacancy = await this.vacanciesService.findOne(+id);
        if (!vacancy) {
            throw new NotFoundException('Vacancy not found.');
        }
        return vacancy;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Vacancy has been successfully updated if it exists.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Vacancy with given id does not exist.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateVacancyDto: UpdateVacancyDto,
    ) {
        const vacancy = await this.vacanciesService.update(
            +id,
            updateVacancyDto,
        );
        if (!vacancy) {
            throw new NotFoundException('Vacancy not found.');
        }
        return vacancy;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Vacancy has been successfully deleted if it exists.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Vacancy with given id does not exist.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Delete(':id')
    async remove(@Param('id') id: string) {
        const vacancy = await this.vacanciesService.remove(+id);
        if (!vacancy) {
            throw new NotFoundException('Vacancy not found.');
        }
        return vacancy;
    }
}
