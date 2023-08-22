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
import { RefreshTokenGuard } from './common/guards/refresh-token.guard';
import { CurrentUser } from './common/decorators/current-user.decorator';
import { Public } from './common/decorators/public.decorator';
import {
    ApiBearerAuth,
    ApiHeader,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiResponse({
        status: HttpStatus.CREATED,
        description:
            'User successfully signed up, returns access_token and refresh_token.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Sign Up failed.',
    })
    @Public()
    @Post('local/signup')
    async signupLocal(@Body() signupDto: SignupDto): Promise<Tokens | null> {
        const tokens = await this.authService.signupLocal(signupDto);
        if (!tokens) {
            throw new UnauthorizedException('Sign Up failed.');
        }
        return tokens;
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description:
            'User successfully signed in, returns access_token and refresh_token.',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Credentials are wrong.',
    })
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

    @ApiResponse({
        status: HttpStatus.OK,
        description: 'User successfully loged out.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt access token' })
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@CurrentUser('sub') userId: number): Promise<void> {
        return await this.authService.logout(userId);
    }

    @ApiResponse({
        status: HttpStatus.OK,
        description:
            'Tokens successfully refreshed, returns access_token and refresh_token.',
    })
    @ApiResponse({
        status: HttpStatus.FORBIDDEN,
        description: 'Access denied.',
    })
    @ApiHeader({ name: 'Authorization', description: 'Jwt refresh token' })
    @Public()
    @UseGuards(RefreshTokenGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(@Req() req: Request): Promise<Tokens | null> {
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
