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
    HttpStatus,
    HttpCode,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import {
    ApiBearerAuth,
    ApiHeader,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('Comanies')
@ApiBearerAuth()
@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Company has been successfully created.',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Company creation error.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Post()
    async create(@Body() createCompanyDto: CreateCompanyDto) {
        const company = await this.companiesService.create(createCompanyDto);
        if (!company) {
            throw new BadRequestException('Company creation error.');
        }
        return company;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Returns a list of companies.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Get()
    async findAll() {
        const companies = await this.companiesService.findAll();
        return companies;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Returns a company with a given id if it exists.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Company with given id does not exist.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const company = await this.companiesService.findOne(+id);
        if (!company) {
            throw new NotFoundException('Company not found.');
        }
        return company;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Company has been successfully updated if it exists.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Company with given id does not exist.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCompanyDto: UpdateCompanyDto,
    ) {
        const company = await this.companiesService.update(
            +id,
            updateCompanyDto,
        );
        if (!company) {
            throw new NotFoundException('Company not found.');
        }
        return company;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Company has been successfully deleted if it exists.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Company with given id does not exist.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Delete(':id')
    async remove(@Param('id') id: string) {
        const company = await this.companiesService.remove(+id);
        if (!company) {
            throw new NotFoundException('Company not found.');
        }
        return company;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description:
            'If company and user exist, user has been added to company.',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Company or user with given id does not exist.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Post(':id/addUser/:userId')
    @HttpCode(HttpStatus.OK)
    async addUserToCompany(
        @Param('id') id: string,
        @Param('userId') userId: string,
    ) {
        const company = await this.companiesService.addUserToCompany(
            +id,
            +userId,
        );
        if (!company) {
            throw new BadRequestException('Invalid id or userId.');
        }
        return company;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description:
            'If company and user exist, user has been removed from company.',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Company or user with given id does not exist.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Post(':id/removeUser/:userId')
    @HttpCode(HttpStatus.OK)
    async removeUserFromCompany(
        @Param('id') id: string,
        @Param('userId') userId: string,
    ) {
        const company = await this.companiesService.removeUserFromCompany(
            +id,
            +userId,
        );
        if (!company) {
            throw new BadRequestException('Invalid id or userId');
        }
        return company;
    }
}
