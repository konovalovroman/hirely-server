import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(params: {
        data: Prisma.UserCreateInput;
    }): Promise<User | null> {
        const { data } = params;
        return this.prisma.user.create({ data });
    }

    async findUsers(params?: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = { ...params };
        const users = await this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
        return users;
    }

    async findOneUser(params: {
        where: Prisma.UserWhereUniqueInput;
    }): Promise<User | null> {
        const { where } = params;
        const user = await this.prisma.user.findUnique({ where });
        return user;
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User | null> {
        try {
            const { where, data } = params;
            const updatedUser = await this.prisma.user.update({ where, data });
            return updatedUser;
        } catch (err) {
            return null;
        }
    }

    async deleteUser(params: {
        where: Prisma.UserWhereUniqueInput;
    }): Promise<User | null> {
        try {
            const { where } = params;
            const deletedUser = await this.prisma.user.delete({ where });
            return deletedUser;
        } catch (err) {
            return null;
        }
    }
}
