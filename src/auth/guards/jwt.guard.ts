import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';

@Injectable()
// 토큰 검증
export class JwtGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.cookies['access_token'];

        if (!token) {
            throw new UnauthorizedException('토큰이 없습니다');
        }

        try {
            // 토큰 검증 후 request.user에 유저 정보 저장
            // 이후 컨트롤러에서 req.user로 꺼내 쓸 수 있어요
            request.user = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_ACCESS_SECRET,
            });
            return true;
        } catch {
            throw new UnauthorizedException('유효하지 않은 토큰입니다');
        }
    }
}