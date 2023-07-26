import {
    Body,
    Controller,
    ForbiddenException,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { Tokens } from 'src/utils/types/tokens.type';
import { SigninDto } from './dto/signin.dto';
import { AuthGuard } from '@nestjs/passport';
import { FastifyRequest } from 'fastify';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('local/signup')
    async signupLocal(@Body() signupDto: SignupDto): Promise<Tokens | null> {
        const tokens = await this.authService.signupLocal(signupDto);
        if (!tokens) {
            throw new UnauthorizedException('Sign Up failed.');
        }
        return tokens;
    }

    @Post('local/signin')
    @HttpCode(HttpStatus.OK)
    async signinLocal(@Body() signinDto: SigninDto): Promise<Tokens | null> {
        const tokens = await this.authService.signinLocal(signinDto);
        if (!tokens) {
            throw new UnauthorizedException('Credentials are wrong.');
        }
        return tokens;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Req() req: FastifyRequest) {
        const user = req.user;
        return await this.authService.logout(user.sub);
    }

    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(@Req() req: FastifyRequest) {
        const user = req.user;
        const tokens = await this.authService.refreshTokens(
            user.sub,
            user.refresh_token,
        );
        if (!tokens) {
            throw new ForbiddenException('Access denied.');
        }
        return tokens;
    }
}
