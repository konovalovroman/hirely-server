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
        userId: number,
    ): Promise<Rate | null> {
        const { rate, message, company_id } = createRateDto;
        const existingRate = await this.ratesRepository.findRates({
            where: {
                user_id: userId,
                company_id,
            },
        });
        if (existingRate.length) {
            return null;
        }

        const existingCompany = await this.companiesService.findOne(company_id);
        if (!existingCompany) {
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
                    connect: { id: company_id },
                },
            },
            include: {
                user: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        role: true,
                        created_at: true,
                        updated_at: true,
                    },
                },
                company: true,
            },
        });
        return newRate;
    }

    async findAll(): Promise<Rate[]> {
        const rates = await this.ratesRepository.findRates({
            include: {
                user: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        role: true,
                        created_at: true,
                        updated_at: true,
                    },
                },
                company: true,
            },
        });
        return rates;
    }

    async findOne(id: number): Promise<Rate | null> {
        const rate = await this.ratesRepository.findOneRate({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        role: true,
                        created_at: true,
                        updated_at: true,
                    },
                },
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
                user: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        role: true,
                        created_at: true,
                        updated_at: true,
                    },
                },
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
                user: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        role: true,
                        created_at: true,
                        updated_at: true,
                    },
                },
                company: true,
            },
        });
        return rate;
    }
}
