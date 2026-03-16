import {ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signup(email: string, password: string) {
        const existing = await this.usersService.findByEmail(email);
        if (existing) throw new ConflictException('이미 사용 중인 이메일입니다');

        const hashed = await bcrypt.hash(password, 10);
        const user = await this.usersService.create(email, hashed);
        const tokens = this.generateTokens(user.id, user.email);

        await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);

        return tokens;
    }

    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다');

        const tokens = this.generateTokens(user.id, user.email);

        await  this.usersService.updateRefreshToken(user.id, tokens.refreshToken);

        return tokens;
    }

    private generateTokens(userId: string, email: string) {
        const payload = { sub: userId, email };

        return {
            accessToken: this.jwtService.sign(payload, {
                secret: process.env.JWT_ACCESS_SECRET,
                expiresIn: '15m',
            }),
            refreshToken: this.jwtService.sign(payload, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '7d',
            }),
        };
    }

    //토큰 갱신
    async refresh(userId: string, refreshToken: string) {
        const user = await this.usersService.findById(userId);
        if (!user || user.refreshToken !== refreshToken) {
            throw new UnauthorizedException('유효하지 않은 토큰입니다');
        }

        const tokens = this.generateTokens(user.id, user.email);
        await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }

    //로그아웃 (토큰 상태 비움)
    async logout(userId: string) {
        await this.usersService.updateRefreshToken(userId, null);
    }
}
