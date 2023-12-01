import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repository/users.repository';
import { genSalt, compare, hash } from 'bcrypt';
import { User } from '@prisma/client';

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

    async create(createUserDto: CreateUserDto): Promise<User | null> {
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

    async findAll(): Promise<User[]> {
        const users = await this.usersRepository.findUsers();
        return users;
    }

    async findOne(id: number): Promise<User | null> {
        const user = await this.usersRepository.findOneUser({ where: { id } });
        return user;
    }

    async findOneByEmail(email: string): Promise<User | null> {
        const user = await this.usersRepository.findOneUser({
            where: { email },
        });
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
        const { first_name, last_name, password, role, rt_hash } =
            updateUserDto;
        const user = await this.usersRepository.updateUser({
            where: {
                id,
            },
            data: {
                first_name,
                last_name,
                password,
                role,
                rt_hash,
            },
        });
        return user;
    }

    async remove(id: number): Promise<User | null>  {
        const user = await this.usersRepository.deleteUser({
            where: {
                id,
            },
        });
        return user;
    }

    async getCompanyOwner(companyId: number): Promise<User | null> {
        const [user] = await this.usersRepository.findUsers({
            where: {
                role: 'company_owner',
                is_company_owner: true,
                company_id: companyId,
            },
            include: {
                company: true,
            }
        });
        return user;
    }
}
