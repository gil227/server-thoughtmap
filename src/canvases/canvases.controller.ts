import {Body, Controller,Request, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {CanvasesService} from "./canvases.service";
import {JwtGuard} from "../auth/guards/jwt.guard";

type JwtRequest = { user: { sub: string } };

@Controller('canvases')
@UseGuards(JwtGuard)
export class CanvasesController {
    constructor(private canvasesService: CanvasesService) {}

    @Get()
    findAll(@Request() req: JwtRequest) {
        return this.canvasesService.findAll(req.user.sub);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Request() req: JwtRequest) {
        return this.canvasesService.findOne(id, req.user.sub);
    }

    @Post()
    create(@Body() body: { title: string }, @Request() req: JwtRequest) {
        return this.canvasesService.create(req.user.sub, body.title);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: { title: string }, @Request() req: JwtRequest) {
        return this.canvasesService.update(id, req.user.sub, body.title);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Request() req: JwtRequest) {
        return this.canvasesService.remove(id, req.user.sub);
    }
}