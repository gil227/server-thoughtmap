import {Body, Controller, Post, UseGuards, Request, Res, Get} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {SignupDto} from "./dto/signup.dto";
import {LoginDto} from "./dto/login.dto";
import {JwtGuard} from "./guards/jwt.guard";
import express from 'express';

const cookieOptions = {
    httpOnly: true, // JS에서 쿠키 접근 차단 (XSS 방어 핵심)
    secure: process.env.NODE_ENV === 'production', // https에서만 전송
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 크로스 도메인 허용 (배포환경)
} as const;

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('signup')
    async signup(@Body() dto: SignupDto, @Res() res: express.Response) {
        const tokens = await this.authService.signup(dto.email, dto.password);

        res.cookie('access_token', tokens.accessToken, {
            ...cookieOptions,
            maxAge: 15 * 60 * 1000,
        });
        res.cookie('refresh_token', tokens.refreshToken, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({success: true});
    }

    @Post('login')
    async login(@Body() dto: LoginDto, @Res() res: express.Response) {
        const tokens = await this.authService.login(dto.email, dto.password);

        res.cookie('access_token', tokens.accessToken, {
            ...cookieOptions,
            maxAge: 15 * 60 * 1000,
        });
        res.cookie('refresh_token', tokens.refreshToken, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({ success: true });
    }

    @Get('me')
    @UseGuards(JwtGuard)
    me(@Request() req: { user: { sub: string; email: string } }) {
        return { userId: req.user.sub, email: req.user.email };
    }

    @Post('refresh')
    async refresh(@Request() req: any, @Res() res: express.Response) {
        const refreshToken = req.cookies['refresh_token'];
        if (!refreshToken) {
            return res.status(401).json({ message: '토큰이 없습니다' });
        }

        const tokens = await this.authService.refreshFromToken(refreshToken);

        res.cookie('access_token', tokens.accessToken, {
            ...cookieOptions,
            maxAge: 15 * 60 * 1000,
        });

        return res.json({ success: true });
    }

    @Post('logout')
    @UseGuards(JwtGuard)
    async logout(@Request() req: { user: { sub: string } }, @Res() res: express.Response) {
        await this.authService.logout(req.user.sub);

        res.clearCookie('access_token', cookieOptions);
        res.clearCookie('refresh_token', cookieOptions);

        return res.json({ success: true });
    }
}
