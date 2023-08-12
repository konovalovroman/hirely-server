import { Injectable } from '@nestjs/common';
import { CreateRateDto } from './dto/create-rate.dto';
import { Rate } from '@prisma/client';
import { RatesRepository } from './repository/rates.repository';
import { CompaniesService } from '../companies/companies.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class RatesService {
    constructor(
        private readonly ratesRepository: RatesRepository,
        private readonly companiesService: CompaniesService,
        private readonly usersService: UsersService,
    ) {}

    async create(
        createRateDto: CreateRateDto,
        companyId: number,
        userId: number,
    ): Promise<Rate | null> {
        const { rate, message } = createRateDto;
        const existingRate = await this.ratesRepository.findRates({
            where: {
                user_id: userId,
                company_id: companyId,
            },
        });
        if (existingRate.length) {
            return null;
        }

        const newRate = await this.ratesRepository.createRate({
            data: {
                rate,
                message,
                user: {
                    connect: { id: userId },
                },
                company: {
                    connect: { id: companyId },
                },
            },
            include: {
                user: true,
                company: true,
            },
        });
        return newRate;
    }

    async findAll(): Promise<Rate[]> {
        const rates = await this.ratesRepository.findRates({
            include: {
                user: true,
                company: true,
            },
        });
        return rates;
    }

    async findOne(id: number): Promise<Rate | null> {
        const rate = await this.ratesRepository.findOneRate({
            where: { id },
            include: {
                user: true,
                company: true,
            },
        });
        return rate;
    }

    async findRatesForCompany(companyId: number): Promise<Rate[] | null> {
        const company = await this.companiesService.findOne(companyId);
        if (!company) {
            return null;
        }
        const rates = await this.ratesRepository.findRates({
            where: {
                company_id: companyId,
            },
            include: {
                user: true,
            },
        });
        return rates;
    }

    async findRatesByUser(userId: number): Promise<Rate[] | null> {
        const user = await this.usersService.findOne(userId);
        if (!user) {
            return null;
        }
        const rates = await this.ratesRepository.findRates({
            where: {
                user_id: userId,
            },
            include: {
                company: true,
            },
        });
        return rates;
    }

    async remove(id: number): Promise<Rate | null> {
        const rate = await this.ratesRepository.deleteRate({
            where: { id },
            include: {
                user: true,
                company: true,
            },
        });
        return rate;
    }
}
