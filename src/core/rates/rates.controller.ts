import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    BadRequestException,
    NotFoundException,
    HttpStatus,
} from '@nestjs/common';
import { RatesService } from './rates.service';
import { CreateRateDto } from './dto/create-rate.dto';
import { CurrentUser } from 'src/auth/common/decorators/current-user.decorator';
import {
    ApiBearerAuth,
    ApiHeader,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('Rates')
@ApiBearerAuth()
@Controller('rates')
export class RatesController {
    constructor(private readonly ratesService: RatesService) {}

    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Rate for company has been successfully created.',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Rate creation error.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Post()
    async create(
        @Body() createRateDto: CreateRateDto,
        @CurrentUser('sub') userId: number,
    ) {
        const rate = await this.ratesService.create(createRateDto, userId);
        if (!rate) {
            throw new BadRequestException('Rate creation error.');
        }
        return rate;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Returns a list of rates.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Get()
    async findAll() {
        const rates = await this.ratesService.findAll();
        return rates;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Returns a rate with a given id if it exists.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Rate with given id does not exist.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const rate = await this.ratesService.findOne(+id);
        if (!rate) {
            throw new NotFoundException('Rate not found.');
        }
        return rate;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Returns a list of rates for company if it exists.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Company with given id does not exist.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Get('/company/:companyId')
    async findRatesForCompany(@Param('companyId') companyId: string) {
        const rates = await this.ratesService.findRatesForCompany(+companyId);
        if (!rates) {
            throw new NotFoundException('Company not found.');
        }
        return rates;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Returns a list of rates made by user if it exists.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'User with given id does not exist.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Get('/user/:userId')
    async findRatesByUser(@Param('userId') userId: string) {
        const rates = await this.ratesService.findRatesByUser(+userId);
        if (!rates) {
            throw new NotFoundException('User not found.');
        }
        return rates;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Rate has been successfully deleted if it exists.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Rate with given id does not exist.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Delete(':id')
    async remove(@Param('id') id: string) {
        const rate = await this.ratesService.remove(+id);
        if (!rate) {
            throw new NotFoundException('Rate not found.');
        }
        return rate;
    }
}
