import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TagsRepository } from './repository/tags.repository';

@Module({
    imports: [DatabaseModule],
    controllers: [TagsController],
    providers: [TagsService, TagsRepository],
    exports: [TagsService],
})
export class TagsModule {}
