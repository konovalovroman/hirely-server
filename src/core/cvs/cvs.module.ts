import { Module } from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CvsController } from './cvs.controller';
import { CvsRepository } from './repository/cvs.repository';
import { DatabaseModule } from 'src/database/database.module';
import { FilesModule } from 'src/files/files.module';

@Module({
    imports: [DatabaseModule, FilesModule],
    controllers: [CvsController],
    providers: [CvsService, CvsRepository],
})
export class CvsModule {}
