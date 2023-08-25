import { Injectable } from '@nestjs/common';
import { join, extname } from 'node:path';
import { writeFile, unlink } from 'node:fs/promises';
import { v4 } from 'uuid';

@Injectable()
export class FilesService {
    async uploadFile(file: Express.Multer.File): Promise<string | null> {
        const { originalname, buffer } = file;
        if (!this.isValidFileFormat(originalname)) {
            return null;
        }
        const fileName = this.generateFileName(originalname);
        const filePath = join('uploads', fileName);

        try {
            await writeFile(filePath, buffer);
            return filePath;
        } catch (err) {
            return null;
        }
    }

    async deleteFile(path: string): Promise<boolean> {
        try {
            await unlink(path);
            return true;
        } catch (err) {
            return false;
        }
    }

    private generateFileName(fileName: string): string {
        const newFileName = v4() + extname(fileName);
        return newFileName;
    }

    private isValidFileFormat(fileName: string): boolean {
        const extension = extname(fileName).toLowerCase().replace('.', '');
        if (!extension || extension !== 'pdf') {
            return false;
        }
        return true;
    }
}
