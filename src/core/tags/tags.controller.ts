import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
    const tag = await this.tagsService.create(createTagDto);
    if (!tag) {
      throw new BadRequestException('Tag creation error.');
    }
    return tag;
  }

  @Get()
  async findAll() {
    const tags = await this.tagsService.findAll();
    return tags;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const tag = await this.tagsService.findOne(+id);
    if (!tag) {
      throw new NotFoundException('Tag not found.');
    }
    return tag;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const tag = await this.tagsService.remove(+id);
    if (!tag) {
      throw new NotFoundException('Tag not found.');
    }
    return tag;
  }
}
