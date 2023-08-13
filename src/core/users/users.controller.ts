import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    BadRequestException,
    NotFoundException,
    UseInterceptors,
    HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RemoveFieldsInterceptor } from 'src/utils/interceptors/remove-fields.interceptor';
import {
    ApiBearerAuth,
    ApiHeader,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@UseInterceptors(new RemoveFieldsInterceptor(['password', 'rt_hash']))
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'User has been successfully created.',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'User creation error.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        if (!user) {
            throw new BadRequestException('User creation error.');
        }
        return user;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Returns a list of users.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Get()
    async findAll() {
        const users = await this.usersService.findAll();
        return users;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Returns a user with a given id if it exists.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'User with given id does not exist.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const user = await this.usersService.findOne(+id);
        if (!user) {
            throw new NotFoundException('User not found.');
        }
        return user;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'User has been successfully updated if it exists.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'User with given id does not exist.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        const user = await this.usersService.update(+id, updateUserDto);
        if (!user) {
            throw new NotFoundException('User not found.');
        }
        return user;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'User has been successfully deleted if it exists.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'User with given id does not exist.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Returns if the user is not logged in.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Delete(':id')
    async remove(@Param('id') id: string) {
        const user = await this.usersService.remove(+id);
        if (!user) {
            throw new NotFoundException('User not found.');
        }
        return user;
    }
}
