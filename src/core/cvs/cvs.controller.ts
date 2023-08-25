import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
    NotFoundException,
    HttpStatus,
} from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/auth/common/decorators/current-user.decorator';
import {
    ApiBearerAuth,
    ApiConsumes,
    ApiTags,
    ApiBody,
    ApiHeader,
    ApiResponse,
} from '@nestjs/swagger';

@ApiTags('CVs')
@ApiBearerAuth()
@Controller('cvs')
export class CvsController {
    constructor(private readonly cvsService: CvsService) {}

    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                    description: 'CV file',
                },
            },
        },
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'CV has been successfully created.',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'CV creation error or file is not provided.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Post()
    async create(
        @UploadedFile() file: Express.Multer.File,
        @CurrentUser('sub') userId: number,
    ) {
        if (!file) {
            throw new BadRequestException('File is required.');
        }
        const createCvDto = new CreateCvDto(userId, file);
        const cv = await this.cvsService.create(createCvDto);
        if (!cv) {
            throw new BadRequestException('CV creation error.');
        }
        return cv;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Returns a list of CVs.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Get()
    async findAll() {
        const cvs = await this.cvsService.findAll();
        return cvs;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Returns a CV with a given id if it exists.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'CV with given id does not exist.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const cv = await this.cvsService.findOne(+id);
        if (!cv) {
            throw new NotFoundException('CV not found.');
        }
        return cv;
    }

    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                    description: 'CV file to update',
                },
            },
        },
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'CV has been successfully updated if it exists.',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'CV file is not provided.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'CV with given id does not exist.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @UseInterceptors(FileInterceptor('file'))
    @Patch(':id')
    async update(
        @UploadedFile() file: Express.Multer.File,
        @Param('id') id: string,
    ) {
        if (!file) {
            throw new BadRequestException('File is required.');
        }
        const updateCvDto = new UpdateCvDto(file);
        const cv = await this.cvsService.update(+id, updateCvDto);
        if (!cv) {
            throw new NotFoundException('CV not found.');
        }
        return cv;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'CV has been successfully deleted if it exists.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'CV with given id does not exist.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Delete(':id')
    async remove(@Param('id') id: string) {
        const cv = await this.cvsService.remove(+id);
        if (!cv) {
            throw new NotFoundException('CV not found');
        }
        return cv;
    }
}
