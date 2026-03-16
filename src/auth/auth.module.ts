import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UsersModule} from "../users/users.module";
import {JwtGuard} from "./guards/jwt.guard";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({}),
  ],
  providers: [AuthService, JwtGuard],
  controllers: [AuthController],
  exports:[JwtGuard,JwtModule]
})
export class AuthModule {}
