import { Injectable, Logger } from "@nestjs/common";
import { Company, Prisma } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";


@Injectable()
export class CompaniesRepository {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async find(params?: {
        skip?: number;
        take?: number;
        cursor?: Prisma.CompanyWhereUniqueInput;
        where?: Prisma.CompanyWhereInput;
        orderBy?: Prisma.CompanyOrderByWithRelationInput;
    }): Promise<Company[]> {
       try {
        const {skip, take, cursor, where, orderBy } = { ...params };
        const companies = await this.prisma.company.findMany({ skip, take, cursor, where, orderBy });
        console.log(companies);
        return companies;
       } catch (err) {
        return null;
       }
    }

    async findOne(params: { id: number }): Promise<Company> {
      try {
        const { id } = params;
        const company = await this.prisma.company.findUnique({ where: { id } });
        console.log('company: ', company);
        return company;
      } catch (err) {
        return null;
      }
    }

    async create(params: {data: Prisma.CompanyCreateInput}): Promise<Company> {
        const { data } = params;
        return this.prisma.company.create({ data });
    }

    async update(params: {
        where: Prisma.CompanyWhereUniqueInput;
        data: Prisma.CompanyUpdateInput;
      }): Promise<Company> {
        const { where, data } = params;
        return this.prisma.company.update({ where, data });
      }
    
      async delete(params: {
        where: Prisma.CompanyWhereUniqueInput;
      }): Promise<Company> {
        const { where } = params;
        return this.prisma.company.delete({ where });
      }

    
}