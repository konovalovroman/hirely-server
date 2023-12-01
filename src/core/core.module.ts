import { Module } from '@nestjs/common';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
import { RatesModule } from './rates/rates.module';
import { CategoriesModule } from './categories/categories.module';
import { LocationsModule } from './locations/locations.module';
import { VacanciesModule } from './vacancies/vacancies.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { CvsModule } from './cvs/cvs.module';

@Module({
    imports: [
        CompaniesModule,
        UsersModule,
        TagsModule,
        RatesModule,
        CategoriesModule,
        LocationsModule,
        VacanciesModule,
        FeedbacksModule,
        CvsModule,
    ],
})
export class CoreModule {}
