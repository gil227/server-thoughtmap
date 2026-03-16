import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {JwtGuard} from "../auth/guards/jwt.guard";
import {EdgesService} from "./edges.service";

@Controller('canvases/:canvasId/edges')
@UseGuards(JwtGuard)
export class EdgesController {
    constructor(private edgesService: EdgesService) {}

    @Get()
    findAll(@Param('canvasId') canvasId: string) {
        return this.edgesService.findAll(canvasId);
    }

    @Post()
    create(@Param('canvasId') canvasId: string, @Body() body: {
        sourceNodeId: string;
        targetNodeId: string;
        edgeType: 'arrow' | 'hierarchy';
    }) {
        return this.edgesService.create(canvasId, body);
    }

    @Delete(':edgeId')
    remove(@Param('edgeId') edgeId: string) {
        return this.edgesService.remove(edgeId);
    }
}
