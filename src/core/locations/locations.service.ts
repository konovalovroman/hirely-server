import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationsRepository } from './repository/locations.repository';
import { Location } from '@prisma/client';

@Injectable()
export class LocationsService {
    constructor(private readonly locationsRepository: LocationsRepository) {}

    async create(
        createLocationDto: CreateLocationDto,
    ): Promise<Location | null> {
        const { city } = createLocationDto;
        const existingLocation = await this.locationsRepository.findOneLocation(
            {
                where: { city },
            },
        );
        if (existingLocation) {
            return null;
        }
        const location = await this.locationsRepository.createLocation({
            data: { city },
        });
        return location;
    }

    async findAll(): Promise<Location[]> {
        const locations = await this.locationsRepository.findLocations();
        return locations;
    }

    async findOne(id: number): Promise<Location | null> {
        const location = await this.locationsRepository.findOneLocation({
            where: { id },
        });
        return location;
    }

    async remove(id: number): Promise<Location | null> {
        const location = await this.locationsRepository.deleteLocation({
            where: { id },
        });
        return location;
    }
}
