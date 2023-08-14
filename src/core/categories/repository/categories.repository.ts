import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CategoriesRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createCategory(params: {
        data: Prisma.CategoryCreateInput;
        include?: Prisma.CategoryInclude;
    }): Promise<Category | null> {
        const { data, include } = params;
        const category = await this.prisma.category.create({ data, include });
        return category;
    }

    async findCategories(params?: {
        skip?: number;
        take?: number;
        cursor?: Prisma.CategoryWhereUniqueInput;
        where?: Prisma.CategoryWhereInput;
        orderBy?: Prisma.CategoryOrderByWithRelationInput;
        include?: Prisma.CategoryInclude;
    }): Promise<Category[]> {
        const { skip, take, cursor, where, orderBy, include } = { ...params };
        const categories = await this.prisma.category.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include,
        });
        return categories;
    }

    async findOneCategory(params: {
        where: Prisma.CategoryWhereUniqueInput;
        include?: Prisma.CategoryInclude;
    }): Promise<Category | null> {
        const { where, include } = params;
        const category = await this.prisma.category.findUnique({
            where,
            include,
        });
        return category;
    }

    async deleteCategory(params: {
        where: Prisma.CategoryWhereUniqueInput;
        include?: Prisma.CategoryInclude;
    }): Promise<Category | null> {
        try {
            const { where, include } = params;
            const deletedCategory = await this.prisma.category.delete({
                where,
                include,
            });
            return deletedCategory;
        } catch (err) {
            return null;
        }
    }
}
