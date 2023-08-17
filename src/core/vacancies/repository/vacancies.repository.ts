import { Injectable } from '@nestjs/common';
import { Prisma, Vacancy } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class VacanciesRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createVacancy(params: {
        data: Prisma.VacancyCreateInput;
        include?: Prisma.VacancyInclude;
    }): Promise<Vacancy | null> {
        const { data, include } = params;
        const vacancy = await this.prisma.vacancy.create({ data, include });
        return vacancy;
    }

    async findVacancies(params?: {
        skip?: number;
        take?: number;
        cursor?: Prisma.VacancyWhereUniqueInput;
        where?: Prisma.VacancyWhereInput;
        orderBy?: Prisma.VacancyOrderByWithRelationInput;
        include?: Prisma.VacancyInclude;
    }): Promise<Vacancy[]> {
        const { skip, take, cursor, where, orderBy, include } = { ...params };
        const vacancies = await this.prisma.vacancy.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include,
        });
        return vacancies;
    }

    async findOneVacancy(params: {
        where: Prisma.VacancyWhereUniqueInput;
        include?: Prisma.VacancyInclude;
    }): Promise<Vacancy | null> {
        const { where, include } = params;
        const vacancy = await this.prisma.vacancy.findUnique({
            where,
            include,
        });
        return vacancy;
    }

    async updateVacancy(params: {
        where: Prisma.VacancyWhereUniqueInput;
        data: Prisma.VacancyUpdateInput;
        include?: Prisma.VacancyInclude;
    }): Promise<Vacancy | null> {
        try {
            const { where, data, include } = params;
            const updatedVacancy = await this.prisma.vacancy.update({
                where,
                data,
                include,
            });
            return updatedVacancy;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }

    async deleteVacancy(params: {
        where: Prisma.VacancyWhereUniqueInput;
        include?: Prisma.VacancyInclude;
    }): Promise<Vacancy | null> {
        try {
            const { where, include } = params;
            const deletedVacancy = await this.prisma.vacancy.delete({
                where,
                include,
            });
            return deletedVacancy;
        } catch (err) {
            return null;
        }
    }

    async deleteTagsFromVacancy(vacancyId: number): Promise<number> {
        const result = await this.prisma.tagsAndVacancies.deleteMany({
            where: {
                vacancy_id: vacancyId,
            },
        });
        return result.count;
    }
}
