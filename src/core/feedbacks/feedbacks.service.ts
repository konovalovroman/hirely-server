import { Injectable } from '@nestjs/common';
import { FeedbacksRepository } from './repository/feedbacks.repository';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { Feedback } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { VacanciesService } from '../vacancies/vacancies.service';

@Injectable()
export class FeedbacksService {
    constructor(
        private readonly feedbacksRepository: FeedbacksRepository,
        private readonly usersService: UsersService,
        private readonly vacanciesService: VacanciesService,
    ) {}

    async create(
        createFeedbackDto: CreateFeedbackDto,
        userId: number,
    ): Promise<Feedback | null> {
        const { message, vacancy_id } = createFeedbackDto;

        const user = await this.usersService.findOne(userId);
        if (!user) {
            return null;
        }

        const vacancy = await this.vacanciesService.findOne(vacancy_id);
        if (!vacancy) {
            return null;
        }

        const existingFeedback = await this.feedbacksRepository.findFeedbacks({
            where: {
                user_id: user.id,
                vacancy_id: vacancy.id,
            },
        });
        if (existingFeedback.length) {
            return null;
        }

        const feedback = await this.feedbacksRepository.createFeedback({
            data: {
                message,
                user: {
                    connect: { id: user.id },
                },
                vacancy: {
                    connect: { id: vacancy.id },
                },
            },
            include: {
                user: {
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
                vacancy: true,
            },
        });

        return feedback;
    }

    async findAll(): Promise<Feedback[]> {
        const feedbacks = await this.feedbacksRepository.findFeedbacks({
            include: {
                user: {
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
                vacancy: true,
            },
        });
        return feedbacks;
    }

    async findOne(id: number): Promise<Feedback | null> {
        const feedback = await this.feedbacksRepository.findOneFeedback({
            where: {
                id,
            },
            include: {
                user: {
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
                vacancy: true,
            },
        });
        return feedback;
    }

    async remove(id: number): Promise<Feedback | null> {
        const feedback = await this.feedbacksRepository.deleteFeedback({
            where: {
                id,
            },
            include: {
                user: {
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
                vacancy: true,
            },
        });
        return feedback;
    }
}
