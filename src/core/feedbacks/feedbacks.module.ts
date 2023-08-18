import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksRepository } from './repository/feedbacks.repository';
import { UsersModule } from '../users/users.module';
import { VacanciesModule } from '../vacancies/vacancies.module';

@Module({
    imports: [DatabaseModule, UsersModule, VacanciesModule],
    controllers: [FeedbacksController],
    providers: [FeedbacksService, FeedbacksRepository],
})
export class FeedbacksModule {}
