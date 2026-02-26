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

        return this.generateTokens(user.id, user.email);
    }

    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다');

        return this.generateTokens(user.id, user.email);
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
}
