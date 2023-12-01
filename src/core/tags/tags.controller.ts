import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    BadRequestException,
    NotFoundException,
    HttpStatus,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import {
    ApiBearerAuth,
    ApiHeader,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('Tags')
@ApiBearerAuth()
@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Tag has been successfully created.',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Tag creation error.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Post()
    async create(@Body() createTagDto: CreateTagDto) {
        const tag = await this.tagsService.create(createTagDto);
        if (!tag) {
            throw new BadRequestException('Tag creation error.');
        }
        return tag;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Returns a list of tags.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Get()
    async findAll() {
        const tags = await this.tagsService.findAll();
        return tags;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Returns a tag with a given id if it exists.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Tag with given id does not exist.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const tag = await this.tagsService.findOne(+id);
        if (!tag) {
            throw new NotFoundException('Tag not found.');
        }
        return tag;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Tag has been successfully deleted if it exists.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Tag with given id does not exist.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Delete(':id')
    async remove(@Param('id') id: string) {
        const tag = await this.tagsService.remove(+id);
        if (!tag) {
            throw new NotFoundException('Tag not found.');
        }
        return tag;
    }
}
