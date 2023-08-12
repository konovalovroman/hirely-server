import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, Rate } from '@prisma/client';

@Injectable()
export class RatesRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createRate(params: {
        data: Prisma.RateCreateInput;
        include?: Prisma.RateInclude;
    }): Promise<Rate | null> {
        const { data, include } = params;
        const rate = await this.prisma.rate.create({ data, include });
        return rate;
    }

    async findRates(params?: {
        skip?: number;
        take?: number;
        cursor?: Prisma.RateWhereUniqueInput;
        where?: Prisma.RateWhereInput;
        orderBy?: Prisma.RateOrderByWithRelationInput;
        include?: Prisma.RateInclude;
    }): Promise<Rate[]> {
        const { skip, take, cursor, where, orderBy, include } = { ...params };
        const rates = await this.prisma.rate.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include,
        });
        return rates;
    }

    async findOneRate(params: {
        where: Prisma.RateWhereUniqueInput;
        include?: Prisma.RateInclude;
    }): Promise<Rate | null> {
        const { where, include } = params;
        const rate = await this.prisma.rate.findUnique({
            where,
            include,
        });
        return rate;
    }

    async deleteRate(params: {
        where: Prisma.RateWhereUniqueInput;
        include?: Prisma.RateInclude;
    }): Promise<Rate | null> {
        try {
            const { where, include } = params;
            const deletedRate = await this.prisma.rate.delete({
                where,
                include,
            });
            return deletedRate;
        } catch (err) {
            return null;
        }
    }
}
