import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    HttpStatus,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import {
    ApiBearerAuth,
    ApiHeader,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('Locatoins')
@ApiBearerAuth()
@Controller('locations')
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) {}

    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Location has been successfully created.',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Location creation error.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Post()
    async create(@Body() createLocationDto: CreateLocationDto) {
        const location = await this.locationsService.create(createLocationDto);
        if (!location) {
            throw new BadRequestException('Location creation error.');
        }
        return location;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Returns a list of locations.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Get()
    async findAll() {
        const locations = await this.locationsService.findAll();
        return locations;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Returns a location with a given id if it exists.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Location with given id does not exist.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const location = await this.locationsService.findOne(+id);
        if (!location) {
            throw new NotFoundException('Location not found.');
        }
        return location;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Location has been successfully deleted if it exists.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Location with given id does not exist.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Delete(':id')
    async remove(@Param('id') id: string) {
        const location = await this.locationsService.remove(+id);
        if (!location) {
            throw new NotFoundException('Location not found.');
        }
        return location;
    }
}
