import { Module } from '@nestjs/common';
import { RatesService } from './rates.service';
import { RatesController } from './rates.controller';
import { DatabaseModule } from 'src/database/database.module';
import { RatesRepository } from './repository/rates.repository';
import { CompaniesModule } from '../companies/companies.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [DatabaseModule, CompaniesModule, UsersModule],
    controllers: [RatesController],
    providers: [RatesService, RatesRepository],
})
export class RatesModule {}
