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
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    @Post()
    async create(@Body() createCompanyDto: CreateCompanyDto) {
        const company = await this.companiesService.create(createCompanyDto);
        if (!company) {
            throw new BadRequestException('Company creation error.');
        }
        return company;
    }

    @Get()
    async findAll() {
        const companies = await this.companiesService.findAll();
        return companies;
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const company = await this.companiesService.findOne(+id);
        if (!company) {
            throw new NotFoundException('Company not found.');
        }
        return company;
    }

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

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const company = await this.companiesService.remove(+id);
        if (!company) {
            throw new NotFoundException('Company not found.');
        }
        return company;
    }
}
