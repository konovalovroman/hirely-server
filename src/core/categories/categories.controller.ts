import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    HttpStatus,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
    ApiBearerAuth,
    ApiHeader,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('Categories')
@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Category has been successfully created.',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Category creation error.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        const category = await this.categoriesService.create(createCategoryDto);
        if (!category) {
            throw new BadRequestException('Category creation error.');
        }
        return category;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Returns a list of categories.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Get()
    async findAll() {
        const categories = await this.categoriesService.findAll();
        return categories;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Returns a category with a given id if it exists.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Category with given id does not exist.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const category = await this.categoriesService.findOne(+id);
        if (!category) {
            throw new NotFoundException('Category not found.');
        }
        return category;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Category has been successfully deleted if it exists.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Category with given id does not exist.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Delete(':id')
    async remove(@Param('id') id: string) {
        const category = await this.categoriesService.remove(+id);
        if (!category) {
            throw new NotFoundException('Category not found.');
        }
        return category;
    }
}
