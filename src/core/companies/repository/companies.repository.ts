import { Injectable } from '@nestjs/common';
import { Company, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CompaniesRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createCompany(params: {
        data: Prisma.CompanyCreateInput;
    }): Promise<Company | null> {
        const { data } = params;
        return this.prisma.company.create({ data });
    }

    async findCompanies(params?: {
        skip?: number;
        take?: number;
        cursor?: Prisma.CompanyWhereUniqueInput;
        where?: Prisma.CompanyWhereInput;
        orderBy?: Prisma.CompanyOrderByWithRelationInput;
    }): Promise<Company[]> {
        const { skip, take, cursor, where, orderBy } = { ...params };
        const companies = await this.prisma.company.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
        return companies;
    }

    async findOneCompany(params: { id: number }): Promise<Company | null> {
        const { id } = params;
        const company = await this.prisma.company.findUnique({ where: { id } });
        return company;
    }

    async updateCompany(params: {
        where: Prisma.CompanyWhereUniqueInput;
        data: Prisma.CompanyUpdateInput;
    }): Promise<Company | null> {
        const { where, data } = params;
        const updatedCompany = await this.prisma.company.update({
            where,
            data,
        });
        return updatedCompany;
    }

    async deleteCompany(params: {
        where: Prisma.CompanyWhereUniqueInput;
    }): Promise<Company | null> {
        const { where } = params;
        const deletedCompany = await this.prisma.company.delete({ where });
        return deletedCompany;
    }
}
