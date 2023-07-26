import { Inject, Injectable, Param } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompaniesRepository } from './repository/companies.repository';
import { Company } from '@prisma/client';

@Injectable()
export class CompaniesService {
    constructor(private readonly companiesRepository: CompaniesRepository) {}

    async create(createCompanyDto: CreateCompanyDto) {
        const { name, description, website } = createCompanyDto;
        const existingCompanies = await this.companiesRepository.findCompanies({
            where: {
                name,
            },
        });
        if (existingCompanies.length) {
            return null;
        }

        const company = await this.companiesRepository.createCompany({
            data: { name, description, website },
        });

        return company;
    }

    async findAll() {
        const companies = await this.companiesRepository.findCompanies();
        return companies;
    }

    async findOne(id: number) {
        const company = await this.companiesRepository.findOneCompany({ id });
        return company;
    }

    async update(id: number, updateCompanyDto: UpdateCompanyDto) {
        const company = await this.companiesRepository.updateCompany({
            where: {
                id,
            },
            data: updateCompanyDto,
        });
        return company;
    }

    async remove(id: number) {
        const company = await this.companiesRepository.deleteCompany({
            where: {
                id,
            },
        });
        return company;
    }
}
