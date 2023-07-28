import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { CompaniesRepository } from './repository/companies.repository';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [DatabaseModule, UsersModule],
    controllers: [CompaniesController],
    providers: [CompaniesService, CompaniesRepository],
})
export class CompaniesModule {}
