import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { CompaniesRepository } from './repository/companies.repository';
import { DatabaseModule } from 'src/database/database.module';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    {
      provide: 'CompaniesRepository',
      useClass: CompaniesRepository
    },
  ]
})
export class CompaniesModule {}
