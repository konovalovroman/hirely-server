import { Injectable } from "@nestjs/common";
import { Prisma, Tag } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class TagsRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createTag(params: {
        data: Prisma.TagCreateInput;
        include?: Prisma.TagInclude;
    }): Promise<Tag | null> {
        const { data, include } = params;
        const tag = await this.prisma.tag.create({ data, include });
        return tag;
    }

    async findTags(params?: {
        skip?: number;
        take?: number;
        cursor?: Prisma.TagWhereUniqueInput;
        where?: Prisma.TagWhereInput;
        orderBy?: Prisma.TagOrderByWithRelationInput;
        include?: Prisma.TagInclude;
    }): Promise<Tag[]> {
        const { skip, take, cursor, where, orderBy, include } = { ...params };
        const tags = await this.prisma.tag.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include,
        });
        return tags;
    }

    async findOneTag(params: { 
        where: Prisma.TagWhereUniqueInput;
        include?: Prisma.TagInclude;
    }): Promise<Tag | null> {
        const { where, include } = params;
        const tag = await this.prisma.tag.findUnique({ where, include });
        return tag;
    }

    async deleteTag(params: { 
        where: Prisma.TagWhereUniqueInput;
        include?: Prisma.TagInclude;
    }): Promise<Tag | null> {
        try {
            const { where, include } = params;
            const deletedTag = await this.prisma.tag.delete({ where, include });
            return deletedTag;
        } catch(err) {
            return null;
        }
    }
}