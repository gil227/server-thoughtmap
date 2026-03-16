import { Module } from '@nestjs/common';
import { EdgesService } from './edges.service';
import { EdgesController } from './edges.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Edges} from "./edges.entity";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports:[TypeOrmModule.forFeature([Edges]),AuthModule],
  providers: [EdgesService],
  controllers: [EdgesController]
})
export class EdgesModule {}
