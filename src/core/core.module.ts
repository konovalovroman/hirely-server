import { Module } from '@nestjs/common';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';

@Module({
    imports: [CompaniesModule, UsersModule, TagsModule],
})
export class CoreModule {}
