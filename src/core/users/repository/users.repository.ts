import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(params: {
        data: Prisma.UserCreateInput;
        include?: Prisma.UserInclude;
    }): Promise<User | null> {
        const { data, include } = params;
        const user = await this.prisma.user.create({ data, include });
        return user;
    }

    async findUsers(params?: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
        include?: Prisma.UserInclude;
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy, include } = { ...params };
        const users = await this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include,
        });
        return users;
    }

    async findOneUser(params: {
        where: Prisma.UserWhereUniqueInput;
        include?: Prisma.UserInclude;
    }): Promise<User | null> {
        const { where, include } = params;
        const user = await this.prisma.user.findUnique({ where, include });
        return user;
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
        include?: Prisma.UserInclude;
    }): Promise<User | null> {
        try {
            const { where, data, include } = params;
            const updatedUser = await this.prisma.user.update({
                where,
                data,
                include,
            });
            return updatedUser;
        } catch (err) {
            return null;
        }
    }

    async deleteUser(params: {
        where: Prisma.UserWhereUniqueInput;
        include?: Prisma.UserInclude;
    }): Promise<User | null> {
        try {
            const { where, include } = params;
            const deletedUser = await this.prisma.user.delete({
                where,
                include,
            });
            return deletedUser;
        } catch (err) {
            return null;
        }
    }
}
