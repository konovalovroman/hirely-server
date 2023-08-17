import { Injectable } from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { VacanciesRepository } from './repository/vacancies.repository';
import { UsersService } from '../users/users.service';
import { Vacancy } from '@prisma/client';
import { TagsService } from '../tags/tags.service';

@Injectable()
export class VacanciesService {
    constructor(
        private readonly vacanciesRepository: VacanciesRepository,
        private readonly usersService: UsersService,
        private readonly tagsService: TagsService,
    ) {}

    async create(
        createVacancyDto: CreateVacancyDto,
        userId: number,
    ): Promise<Vacancy | null> {
        const {
            name,
            description,
            salary,
            experience,
            category_id,
            location_id,
            tags,
        } = createVacancyDto;

        const user = await this.usersService.findOne(userId);
        if (!user) {
            return null;
        }

        const existingTags = await this.tagsService.findManyByNames(tags);
        if (tags.length !== existingTags.length) {
            return null;
        }

        const vacancy = await this.vacanciesRepository.createVacancy({
            data: {
                name,
                description,
                salary,
                experience,
                category: {
                    connect: { id: category_id },
                },
                location: {
                    connect: { id: location_id },
                },
                company: {
                    connect: { id: user.company_id },
                },
                author: {
                    connect: { id: user.id },
                },
                tags: {
                    create: [
                        ...existingTags.map((tag) => {
                            return {
                                tag: {
                                    connect: { id: tag.id },
                                },
                            };
                        }),
                    ],
                },
            },
            include: {
                category: true,
                location: true,
                company: true,
                author: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        role: true,
                        created_at: true,
                        updated_at: true,
                    },
                },
                tags: {
                    select: {
                        tag: true,
                    },
                },
            },
        });
        return vacancy;
    }

    async findAll(): Promise<Vacancy[]> {
        const vacancies = await this.vacanciesRepository.findVacancies({
            include: {
                category: true,
                location: true,
                company: true,
                author: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        role: true,
                        created_at: true,
                        updated_at: true,
                    },
                },
                tags: {
                    select: {
                        tag: true,
                    },
                },
            },
        });
        return vacancies;
    }

    async findOne(id: number): Promise<Vacancy | null> {
        const vacancy = await this.vacanciesRepository.findOneVacancy({
            where: {
                id,
            },
            include: {
                category: true,
                location: true,
                company: true,
                author: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        role: true,
                        created_at: true,
                        updated_at: true,
                    },
                },
                tags: {
                    select: {
                        tag: true,
                    },
                },
            },
        });
        return vacancy;
    }

    async update(
        id: number,
        updateVacancyDto: UpdateVacancyDto,
    ): Promise<Vacancy | null> {
        const {
            name,
            description,
            salary,
            experience,
            category_id,
            location_id,
            tags,
        } = updateVacancyDto;

        const updateData: any = {
            name,
            description,
            salary,
            experience,
            location: {
                connect: { id: location_id },
            },
        };

        if (category_id) {
            updateData.category = {
                connect: { id: category_id },
            };
        }

        if (location_id) {
            updateData.location = {
                connect: { id: location_id },
            };
        }

        let existingTags;
        if (tags) {
            existingTags = await this.tagsService.findManyByNames(tags);
            if (tags.length !== existingTags.length) {
                return null;
            }

            await this.vacanciesRepository.deleteTagsFromVacancy(id);

            updateData.tags = {
                create: [
                    ...existingTags.map((tag) => {
                        return {
                            tag: {
                                connect: { id: tag.id },
                            },
                        };
                    }),
                ],
            };
        }

        const vacancy = await this.vacanciesRepository.updateVacancy({
            where: {
                id,
            },
            data: updateData,
            include: {
                category: true,
                location: true,
                company: true,
                author: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        role: true,
                        created_at: true,
                        updated_at: true,
                    },
                },
                tags: {
                    select: {
                        tag: true,
                    },
                },
            },
        });
        return vacancy;
    }

    async remove(id: number): Promise<Vacancy | null> {
        const vacancy = await this.vacanciesRepository.deleteVacancy({
            where: {
                id,
            },
            include: {
                category: true,
                location: true,
                company: true,
                author: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        role: true,
                        created_at: true,
                        updated_at: true,
                    },
                },
                tags: {
                    select: {
                        tag: true,
                    },
                },
            },
        });
        return vacancy;
    }
}
