import { Module } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { VacanciesController } from './vacancies.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from '../users/users.module';
import { VacanciesRepository } from './repository/vacancies.repository';
import { TagsModule } from '../tags/tags.module';

@Module({
    imports: [DatabaseModule, UsersModule, TagsModule],
    controllers: [VacanciesController],
    providers: [VacanciesService, VacanciesRepository],
})
export class VacanciesModule {}
