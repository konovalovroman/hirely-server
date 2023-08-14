import { Module } from '@nestjs/common';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
import { RatesModule } from './rates/rates.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
    imports: [
        CompaniesModule,
        UsersModule,
        TagsModule,
        RatesModule,
        CategoriesModule,
    ],
})
export class CoreModule {}
