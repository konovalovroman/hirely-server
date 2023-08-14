import { Injectable } from '@nestjs/common';
import { Prisma, Location } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class LocationsRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createLocation(params: {
        data: Prisma.LocationCreateInput;
        include?: Prisma.LocationInclude;
    }): Promise<Location | null> {
        const { data, include } = params;
        const location = await this.prisma.location.create({ data, include });
        return location;
    }

    async findLocations(params?: {
        skip?: number;
        take?: number;
        cursor?: Prisma.LocationWhereUniqueInput;
        where?: Prisma.LocationWhereInput;
        orderBy?: Prisma.LocationOrderByWithRelationInput;
        include?: Prisma.LocationInclude;
    }): Promise<Location[]> {
        const { skip, take, cursor, where, orderBy, include } = { ...params };
        const locations = await this.prisma.location.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include,
        });
        return locations;
    }

    async findOneLocation(params: {
        where: Prisma.LocationWhereUniqueInput;
        include?: Prisma.LocationInclude;
    }): Promise<Location | null> {
        const { where, include } = params;
        const location = await this.prisma.location.findUnique({
            where,
            include,
        });
        return location;
    }

    async deleteLocation(params: {
        where: Prisma.LocationWhereUniqueInput;
        include?: Prisma.LocationInclude;
    }): Promise<Location | null> {
        try {
            const { where, include } = params;
            const deletedLocation = await this.prisma.location.delete({
                where,
                include,
            });
            return deletedLocation;
        } catch (err) {
            return null;
        }
    }
}
