import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repository/users.repository';
import { genSalt, compare, hash } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async hashPassword(password: string): Promise<string> {
        const salt = await genSalt(10);
        const passwordHash = await hash(password, salt);
        return passwordHash;
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        const isEqual = await compare(password, hash);
        return isEqual;
    }

    async create(createUserDto: CreateUserDto) {
        const { first_name, last_name, email, password, role } = createUserDto;
        const existingUsers = await this.usersRepository.findUsers({
            where: {
                email,
            },
        });
        if (existingUsers.length) {
            return null;
        }

        const passwordHash = await this.hashPassword(password);

        const user = await this.usersRepository.createUser({
            data: {
                first_name,
                last_name,
                email,
                password: passwordHash,
                role,
            },
        });

        return user;
    }

    async findAll() {
        const users = await this.usersRepository.findUsers();
        return users;
    }

    async findOne(id: number) {
        const user = await this.usersRepository.findOneUser({ id });
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const { first_name, last_name, password, role } = updateUserDto;
        const user = await this.usersRepository.updateUser({
            where: {
                id,
            },
            data: {
                first_name,
                last_name,
                password,
                role,
            },
        });
        return user;
    }

    async remove(id: number) {
        const user = await this.usersRepository.deleteUser({
            where: {
                id,
            },
        });
        return user;
    }
}
