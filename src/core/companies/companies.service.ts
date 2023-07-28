import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompaniesRepository } from './repository/companies.repository';
import { UsersService } from '../users/users.service';
import { Company } from '@prisma/client';

@Injectable()
export class CompaniesService {
    constructor(
        private readonly companiesRepository: CompaniesRepository,
        private readonly usersService: UsersService,
    ) {}

    async create(createCompanyDto: CreateCompanyDto): Promise<Company | null> {
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

    async findAll(): Promise<Company[]> {
        const companies = await this.companiesRepository.findCompanies();
        return companies;
    }

    async findOne(id: number): Promise<Company | null> {
        const company = await this.companiesRepository.findOneCompany({ where: { id }, include: { users: true } });
        return company;
    }

    async update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Company | null> {
        const company = await this.companiesRepository.updateCompany({
            where: {
                id,
            },
            data: updateCompanyDto,
        });
        return company;
    }

    async remove(id: number): Promise<Company | null> {
        const company = await this.companiesRepository.deleteCompany({
            where: {
                id,
            },
        });
        return company;
    }

    async addUserToCompany(id: number, userId: number): Promise<Company | null> {
        const [company, user] = await Promise.all([
            this.findOne(id),
            this.usersService.findOne(userId),
        ]);
        if (!company || !user) {
            return null;
        }
        return await this.companiesRepository.updateCompany({
            where: { id },
            data: { users: { connect: { id: userId } } },
            include: { users: true },
        });
    }

    async removeUserFromCompany(id: number, userId: number): Promise<Company | null> {
        const [company, user] = await Promise.all([
            this.findOne(id),
            this.usersService.findOne(userId),
        ]);
        if (!company || !user) {
            return null;
        }
        const result =  await this.companiesRepository.updateCompany({
            where: { id },
            data: { users: { disconnect: { id: userId } } },
            include: { users: true },
        });
        return result;
    }   
}
