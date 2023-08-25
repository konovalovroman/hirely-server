import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { CvsRepository } from './repository/cvs.repository';
import { FilesService } from 'src/files/files.service';
import { Cv } from '@prisma/client';

@Injectable()
export class CvsService {
    constructor(
        private readonly cvsRepository: CvsRepository,
        private readonly filesService: FilesService,
    ) {}

    async create(createCvDto: CreateCvDto): Promise<Cv | null> {
        const { user_id, file } = createCvDto;

        const existingCv = await this.cvsRepository.findOneCv({
            where: {
                user_id,
            },
        });
        if (existingCv) {
            return null;
        }

        const filePath = await this.filesService.uploadFile(file);
        if (!filePath) {
            return null;
        }

        const cv = await this.cvsRepository.createCv({
            data: {
                user: {
                    connect: { id: user_id },
                },
                file_path: filePath,
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

        return cv;
    }

    async findAll(): Promise<Cv[]> {
        const cvs = await this.cvsRepository.findCvs({
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
        return cvs;
    }

    async findOne(id: number): Promise<Cv | null> {
        const cv = await this.cvsRepository.findOneCv({
            where: {
                id,
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
        return cv;
    }

    async update(id: number, updateCvDto: UpdateCvDto): Promise<Cv | null> {
        const { file } = updateCvDto;

        const existingCv = await this.findOne(id);
        if (!existingCv) {
            return null;
        }

        const updatedFilePath = await this.filesService.uploadFile(file);
        if (!updatedFilePath) {
            return null;
        }

        await this.filesService.deleteFile(existingCv.file_path);

        const updatedCv = await this.cvsRepository.updateCv({
            where: {
                id,
            },
            data: {
                file_path: updatedFilePath,
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

        return updatedCv;
    }

    async remove(id: number): Promise<Cv | null> {
        const cv = await this.findOne(id);
        if (!cv) {
            return null;
        }

        await this.filesService.deleteFile(cv.file_path);

        const deletedCv = await this.cvsRepository.deleteCv({
            where: {
                id,
            },
        });
        if (!deletedCv) {
            return null;
        }

        return cv;
    }
}
