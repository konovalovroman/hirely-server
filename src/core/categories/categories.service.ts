import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesRepository } from './repository/categories.repository';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesService {
    constructor(private readonly categoriesRepository: CategoriesRepository) {}

    async create(
        createcategoryDto: CreateCategoryDto,
    ): Promise<Category | null> {
        const { name } = createcategoryDto;
        const existingCategory =
            await this.categoriesRepository.findOneCategory({
                where: { name },
            });
        if (existingCategory) {
            return null;
        }
        const category = await this.categoriesRepository.createCategory({
            data: { name },
        });
        return category;
    }

    async findAll(): Promise<Category[]> {
        const category = await this.categoriesRepository.findCategories();
        return category;
    }

    async findOne(id: number): Promise<Category | null> {
        const category = await this.categoriesRepository.findOneCategory({
            where: { id },
        });
        return category;
    }

    async remove(id: number): Promise<Category | null> {
        const category = await this.categoriesRepository.deleteCategory({
            where: { id },
        });
        return category;
    }
}
