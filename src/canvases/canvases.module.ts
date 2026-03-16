import { Module } from '@nestjs/common';
import { CanvasesService } from './canvases.service';
import { CanvasesController } from './canvases.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Canvas} from "./canvas.entity";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports:[TypeOrmModule.forFeature([Canvas]), AuthModule],
  providers: [CanvasesService],
  controllers: [CanvasesController]
})
export class CanvasesModule {}
