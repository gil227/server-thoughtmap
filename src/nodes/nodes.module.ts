import { Module } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { NodesController } from './nodes.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "../auth/auth.module";
import {Nodes} from "./nodes.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Nodes]),AuthModule],
  providers: [NodesService],
  controllers: [NodesController]
})
export class NodesModule {}
