import {Injectable, NotFoundException} from '@nestjs/common';
import {Canvas} from "./canvas.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class CanvasesService {
    constructor(
        @InjectRepository(Canvas)
        private canvasesRepository: Repository<Canvas>,
    ) {}

    async findAll(userId: string): Promise<Canvas[]> {
        return this.canvasesRepository.find({
            where: { user: { id: userId } },
        });
    }

    async findOne(id: string, userId: string): Promise<Canvas> {
        const canvas = await this.canvasesRepository.findOne({
            where: { id, user: { id: userId } },
        });
        if (!canvas) throw new NotFoundException('캔버스를 찾을 수 없습니다');
        return canvas;
    }

    async create(userId: string, title: string): Promise<Canvas> {
        const canvas = this.canvasesRepository.create({
            user: { id: userId },
            title,
        });
        return this.canvasesRepository.save(canvas);
    }

    async update(id: string, userId: string, title: string): Promise<Canvas> {
        const canvas = await this.findOne(id, userId);
        canvas.title = title;
        return this.canvasesRepository.save(canvas);
    }

    async remove(id: string, userId: string): Promise<void> {
        const canvas = await this.findOne(id, userId);
        await this.canvasesRepository.remove(canvas);
    }
}
