import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagsRepository } from './repository/tags.repository';
import { Tag } from '@prisma/client';

@Injectable()
export class TagsService {
    constructor(private readonly tagsRepository: TagsRepository) {}

    async create(createTagDto: CreateTagDto): Promise<Tag | null> {
        const { name } = createTagDto;
        const existingTag = await this.tagsRepository.findOneTag({
            where: { name },
        });
        if (existingTag) {
            return null;
        }
        const tag = await this.tagsRepository.createTag({ data: { name } });
        return tag;
    }

    async findAll(): Promise<Tag[]> {
        const tags = await this.tagsRepository.findTags();
        return tags;
    }

    async findOne(id: number): Promise<Tag | null> {
        const tag = await this.tagsRepository.findOneTag({ where: { id } });
        return tag;
    }

    async remove(id: number): Promise<Tag | null> {
        const tag = await this.tagsRepository.deleteTag({ where: { id } });
        return tag;
    }
}
