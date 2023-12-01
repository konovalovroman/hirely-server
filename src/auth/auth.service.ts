import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/core/users/users.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { UserRole } from 'src/utils/enums/user-role.enum';
import { Tokens } from 'src/utils/types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async getTokens(data: {
        userId: number;
        email: string;
        role: string;
    }): Promise<Tokens> {
        const { userId, email, role } = data;
        const atSecret = this.configService.get('JWT_ACCESS_SECRET');
        const rtSecret = this.configService.get('JWT_REFRESH_SECRET');
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                    role,
                },
                {
                    secret: atSecret,
                    expiresIn: '15m',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                    role,
                },
                {
                    secret: rtSecret,
                    expiresIn: '7d',
                },
            ),
        ]);
        return {
            access_token,
            refresh_token,
        };
    }

    async updateRefreshTokenHash(
        userId: number,
        refresh_token: string,
    ): Promise<void> {
        const hash = await bcrypt.hash(refresh_token, 10);
        await this.usersService.update(userId, { rt_hash: hash });
    }

    async signupLocal(signupDto: SignupDto): Promise<Tokens | null> {
        const { first_name, last_name, email, password } = signupDto;
        const user = await this.usersService.create({
            first_name,
            last_name,
            email,
            password,
            role: UserRole.EMPLOYEE,
        });
        if (!user) {
            return null;
        }
        const tokens = await this.getTokens({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
        return tokens;
    }

    async signinLocal(signinDto: SigninDto): Promise<Tokens | null> {
        const { email, password } = signinDto;
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            return null;
        }
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return null;
        }
        const tokens = await this.getTokens({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
        return tokens;
    }

    async logout(userId: number): Promise<void> {
        await this.usersService.update(userId, { rt_hash: null });
    }

    async refreshTokens(
        userId: number,
        refresh_token: string,
    ): Promise<Tokens> {
        const user = await this.usersService.findOne(userId);
        if (!user || !user.rt_hash) {
            return null;
        }
        const isTokenMatches = await bcrypt.compare(
            refresh_token,
            user.rt_hash,
        );
        if (!isTokenMatches) {
            return null;
        }
        const tokens = await this.getTokens({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
        return tokens;
    }
}
