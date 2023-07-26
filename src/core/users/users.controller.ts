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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        if (!user) {
            throw new BadRequestException('User creation error.');
        }
        return user;
    }

    @Get()
    async findAll() {
        const users = await this.usersService.findAll();
        return users;
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const user = await this.usersService.findOne(+id);
        if (!user) {
            throw new NotFoundException('User not found.');
        }
        return user;
    }

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

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const user = await this.usersService.remove(+id);
        if (!user) {
            throw new NotFoundException('User not found.');
        }
        return user;
    }
}
