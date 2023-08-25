import { Injectable } from '@nestjs/common';
import { Cv, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CvsRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createCv(params: {
        data: Prisma.CvCreateInput;
        include?: Prisma.CvInclude;
    }): Promise<Cv | null> {
        const { data, include } = params;
        const cv = await this.prisma.cv.create({ data, include });
        return cv;
    }

    async findCvs(params?: {
        skip?: number;
        take?: number;
        cursor?: Prisma.CvWhereUniqueInput;
        where?: Prisma.CvWhereInput;
        orderBy?: Prisma.CvOrderByWithRelationInput;
        include?: Prisma.CvInclude;
    }): Promise<Cv[]> {
        const { skip, take, cursor, where, orderBy, include } = { ...params };
        const cv = await this.prisma.cv.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include,
        });
        return cv;
    }

    async findOneCv(params: {
        where: Prisma.CvWhereUniqueInput;
        include?: Prisma.CvInclude;
    }): Promise<Cv | null> {
        const { where, include } = params;
        const cv = await this.prisma.cv.findUnique({
            where,
            include,
        });
        return cv;
    }

    async updateCv(params: {
        where: Prisma.CvWhereUniqueInput;
        data: Prisma.CvUpdateInput;
        include?: Prisma.CvInclude;
    }): Promise<Cv | null> {
        try {
            const { where, data, include } = params;
            const updatedCv = await this.prisma.cv.update({
                where,
                data,
                include,
            });
            return updatedCv;
        } catch (err) {
            return null;
        }
    }

    async deleteCv(params: {
        where: Prisma.CvWhereUniqueInput;
        include?: Prisma.CvInclude;
    }): Promise<Cv | null> {
        try {
            const { where, include } = params;
            const deletedCv = await this.prisma.cv.delete({
                where,
                include,
            });
            return deletedCv;
        } catch (err) {
            return null;
        }
    }
}
