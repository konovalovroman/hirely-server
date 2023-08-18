import { Injectable } from '@nestjs/common';
import { Feedback, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class FeedbacksRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createFeedback(params: {
        data: Prisma.FeedbackCreateInput;
        include?: Prisma.FeedbackInclude;
    }): Promise<Feedback | null> {
        const { data, include } = params;
        const feedback = await this.prisma.feedback.create({ data, include });
        return feedback;
    }

    async findFeedbacks(params?: {
        skip?: number;
        take?: number;
        cursor?: Prisma.FeedbackWhereUniqueInput;
        where?: Prisma.FeedbackWhereInput;
        orderBy?: Prisma.FeedbackOrderByWithRelationInput;
        include?: Prisma.FeedbackInclude;
    }): Promise<Feedback[]> {
        const { skip, take, cursor, where, orderBy, include } = { ...params };
        const feedbacks = await this.prisma.feedback.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include,
        });
        return feedbacks;
    }

    async findOneFeedback(params: {
        where: Prisma.FeedbackWhereUniqueInput;
        include?: Prisma.FeedbackInclude;
    }): Promise<Feedback | null> {
        const { where, include } = params;
        const feedback = await this.prisma.feedback.findUnique({
            where,
            include,
        });
        return feedback;
    }

    async deleteFeedback(params: {
        where: Prisma.FeedbackWhereUniqueInput;
        include?: Prisma.FeedbackInclude;
    }): Promise<Feedback | null> {
        try {
            const { where, include } = params;
            const deletedFeedback = await this.prisma.feedback.delete({
                where,
                include,
            });
            return deletedFeedback;
        } catch (err) {
            return null;
        }
    }
}
