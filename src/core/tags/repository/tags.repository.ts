import { Injectable } from "@nestjs/common";
import { Prisma, Tag } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class TagsRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createTag(params: {
        data: Prisma.TagCreateInput
    }): Promise<Tag | null> {
        const { data } = params;
        return this.prisma.tag.create({ data });
    }

    async findTags(params?: {
        skip?: number;
        take?: number;
        cursor?: Prisma.TagWhereUniqueInput;
        where?: Prisma.TagWhereInput;
        orderBy?: Prisma.TagOrderByWithRelationInput;
    }): Promise<Tag[]> {
        const { skip, take, cursor, where, orderBy } = { ...params };
        const tags = await this.prisma.tag.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
        return tags;
    }

    async findOneTag(params: { where: Prisma.TagWhereUniqueInput }): Promise<Tag | null> {
        const { where } = params;
        const tag = await this.prisma.tag.findUnique({ where });
        return tag;
    }

    async deleteTag(params: { where: Prisma.TagWhereUniqueInput }): Promise<Tag | null> {
        try {
            const { where } = params;
            const deletedTag = await this.prisma.tag.delete({ where });
            return deletedTag;
        } catch(err) {
            return null;
        }
    }
}