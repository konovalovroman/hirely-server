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
import { FastifyRequest } from 'fastify';
import { RefreshTokenGuard } from './common/guards/refresh-token.guard';
import { CurrentUser } from './common/decorators/current-user.decorator';
import { Public } from './common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('local/signup')
    async signupLocal(@Body() signupDto: SignupDto): Promise<Tokens | null> {
        const tokens = await this.authService.signupLocal(signupDto);
        if (!tokens) {
            throw new UnauthorizedException('Sign Up failed.');
        }
        return tokens;
    }

    @Public()
    @Post('local/signin')
    @HttpCode(HttpStatus.OK)
    async signinLocal(@Body() signinDto: SigninDto): Promise<Tokens | null> {
        const tokens = await this.authService.signinLocal(signinDto);
        if (!tokens) {
            throw new UnauthorizedException('Credentials are wrong.');
        }
        return tokens;
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@CurrentUser('sub') userId: number) {
        return await this.authService.logout(userId);
    }

    @Public()
    @UseGuards(RefreshTokenGuard)
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
