import {Body, Controller, Post, UseGuards, Request} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {SignupDto} from "./dto/signup.dto";
import {LoginDto} from "./dto/login.dto";
import {JwtGuard} from "./guards/jwt.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() dto: SignupDto) {
        return this.authService.signup(dto.email, dto.password);
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto.email, dto.password);
    }

    @Post('refresh')
    refresh(@Body() body: { userId: string; refreshToken: string }) {
        return this.authService.refresh(body.userId, body.refreshToken);
    }

    @Post('logout')
    @UseGuards(JwtGuard)
    logout(@Request() req:{user:{sub:string}}) {
        return this.authService.logout(req.user.sub);
    }
}
