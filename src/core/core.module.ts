import { Module } from '@nestjs/common';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
import { RatesModule } from './rates/rates.module';

@Module({
    imports: [CompaniesModule, UsersModule, TagsModule, RatesModule],
})
export class CoreModule {}
