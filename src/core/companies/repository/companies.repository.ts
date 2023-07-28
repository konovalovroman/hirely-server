import { Injectable } from '@nestjs/common';
import { Company, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CompaniesRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createCompany(params: {
        data: Prisma.CompanyCreateInput;
        include?: Prisma.CompanyInclude;
    }): Promise<Company | null> {
        const { data, include } = params;
        const company = await this.prisma.company.create({ data, include });
        return company;
    }

    async findCompanies(params?: {
        skip?: number;
        take?: number;
        cursor?: Prisma.CompanyWhereUniqueInput;
        where?: Prisma.CompanyWhereInput;
        orderBy?: Prisma.CompanyOrderByWithRelationInput;
        include?: Prisma.CompanyInclude;
    }): Promise<Company[]> {
        const { skip, take, cursor, where, orderBy, include } = { ...params };
        const companies = await this.prisma.company.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include,
        });
        return companies;
    }

    async findOneCompany(params: {
        where: Prisma.CompanyWhereUniqueInput;
        include?: Prisma.CompanyInclude;
    }): Promise<Company | null> {
        const { where, include } = params;
        const company = await this.prisma.company.findUnique({
            where,
            include,
        });
        return company;
    }

    async updateCompany(params: {
        where: Prisma.CompanyWhereUniqueInput;
        data: Prisma.CompanyUpdateInput;
        include?: Prisma.CompanyInclude;
    }): Promise<Company | null> {
        try {
            const { where, data, include } = params;
            const updatedCompany = await this.prisma.company.update({
                where,
                data,
                include,
            });
            return updatedCompany;
        } catch (err) {
            return null;
        }
    }

    async deleteCompany(params: {
        where: Prisma.CompanyWhereUniqueInput;
        include?: Prisma.CompanyInclude;
    }): Promise<Company | null> {
        try {
            const { where, include } = params;
            const deletedCompany = await this.prisma.company.delete({
                where,
                include,
            });
            return deletedCompany;
        } catch (err) {
            return null;
        }
    }
}
