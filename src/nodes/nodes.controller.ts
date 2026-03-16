import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {JwtGuard} from "../auth/guards/jwt.guard";
import {NodesService} from "./nodes.service";

@Controller('canvases/:canvasId/nodes')
@UseGuards(JwtGuard)
export class NodesController {
    constructor(private nodesService: NodesService) {}

    @Get()
    findAll(@Param('canvasId') canvasId: string) {
        return this.nodesService.findAll(canvasId);
    }

    @Post()
    create(@Param('canvasId') canvasId: string, @Body() body: {
        type: 'text' | 'image';
        content: string;
        positionX: number;
        positionY: number;
        width: number;
        height: number;
    }) {
        return this.nodesService.create(canvasId, body);
    }

    @Patch(':nodeId')
    update(@Param('nodeId') nodeId: string, @Body() body: Partial<{
        content: string;
        positionX: number;
        positionY: number;
        width: number;
        height: number;
    }>) {
        return this.nodesService.update(nodeId, body);
    }

    @Delete(':nodeId')
    remove(@Param('nodeId') nodeId: string) {
        return this.nodesService.remove(nodeId);
    }
}
