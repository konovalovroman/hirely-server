import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
} from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { CurrentUser } from 'src/auth/common/decorators/current-user.decorator';
import {
    ApiBearerAuth,
    ApiHeader,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('Feedbacks')
@ApiBearerAuth()
@Controller('feedbacks')
export class FeedbacksController {
    constructor(private readonly feedbacksService: FeedbacksService) {}

    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Feedback has been successfully created.',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Feedback creation error.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Post()
    async create(
        @Body() createFeedbackDto: CreateFeedbackDto,
        @CurrentUser('sub') userId: number,
    ) {
        const feedback = await this.feedbacksService.create(
            createFeedbackDto,
            userId,
        );
        if (!feedback) {
            throw new BadRequestException('Feedback creatoin error.');
        }
        return feedback;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Returns a list of feedbacks.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Get()
    async findAll() {
        const feedbacks = await this.feedbacksService.findAll();
        return feedbacks;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Returns a feedback with a given id if it exists.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Feedback with given id does not exist.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const feedback = await this.feedbacksService.findOne(+id);
        if (!feedback) {
            throw new NotFoundException('Feedback not found.');
        }
        return feedback;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Feedback has been successfully deleted if it exists.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Feedback with given id does not exist.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Delete(':id')
    async remove(@Param('id') id: string) {
        const feedback = await this.feedbacksService.remove(+id);
        if (!feedback) {
            throw new NotFoundException('Feedback not found.');
        }
        return feedback;
    }
}
