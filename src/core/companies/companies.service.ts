import { Inject, Injectable, Param } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompaniesRepository } from './repository/companies.repository';
import { Company } from '@prisma/client';

@Injectable()
export class CompaniesService {
  constructor(
    @Inject('CompaniesRepository') private readonly companiesRepository: CompaniesRepository
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const { name, description, website } = createCompanyDto;
    const existingCompanies = await this.companiesRepository.find({
      where: { 
        name,
       }
    });
    if (existingCompanies.length) {
      return null;
    }

    const company = await this.companiesRepository.create({
      data: { name, description, website },
    });

    return company;
  }

  async findAll() {
    const companies = await this.companiesRepository.find();
    return companies;
  }

  async findOne(id: number) {
    const company = await this.companiesRepository.findOne({ id });
    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companiesRepository.update({
      where: { 
        id 
      }, 
      data: updateCompanyDto 
    });
    return company;
  }

  async remove(id: number) {
    const company = await this.companiesRepository.delete({
      where: {
        id,
      },
    });
    return company;
  }
}
