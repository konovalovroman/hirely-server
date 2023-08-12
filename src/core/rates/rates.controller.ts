import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';
import { RatesService } from './rates.service';
import { CreateRateDto } from './dto/create-rate.dto';
import { CurrentUser } from 'src/auth/common/decorators/current-user.decorator';

@Controller('rates')
export class RatesController {
    constructor(private readonly ratesService: RatesService) {}

    @Post(':companyId')
    async create(
        @Body() createRateDto: CreateRateDto,
        @Param('companyId') companyId: string,
        @CurrentUser('sub') userId: number,
    ) {
        const rate = await this.ratesService.create(
            createRateDto,
            +companyId,
            +userId,
        );
        if (!rate) {
            throw new BadRequestException('Rate creation error.');
        }
        return rate;
    }

    @Get()
    async findAll() {
        const rates = await this.ratesService.findAll();
        return rates;
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const rate = await this.ratesService.findOne(+id);
        if (!rate) {
            throw new NotFoundException('Rate not found.');
        }
        return rate;
    }

    @Get('/company/:companyId')
    async findRatesForCompany(@Param('companyId') companyId: string) {
        const rates = await this.ratesService.findRatesForCompany(+companyId);
        if (!rates) {
            throw new NotFoundException('Company not found.');
        }
        return rates;
    }

    @Get('/user/:userId')
    async findRatesByUser(@Param('userId') userId: string) {
        const rates = await this.ratesService.findRatesByUser(+userId);
        if (!rates) {
            throw new NotFoundException('User not found.');
        }
        return rates;
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const rate = await this.ratesService.remove(+id);
        if (!rate) {
            throw new NotFoundException('Rate not found.');
        }
        return rate;
    }
}
