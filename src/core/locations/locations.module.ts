import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { DatabaseModule } from 'src/database/database.module';
import { LocationsRepository } from './repository/locations.repository';

@Module({
    imports: [DatabaseModule],
    controllers: [LocationsController],
    providers: [LocationsService, LocationsRepository],
})
export class LocationsModule {}
