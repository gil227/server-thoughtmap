import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Edges} from "./edges.entity";

@Injectable()
export class EdgesService {
    constructor(
        @InjectRepository(Edges)
        private edgesRepository: Repository<Edges>,
    ) {}

    async findAll(canvasId: string): Promise<Edges[]> {
        return this.edgesRepository.find({
            where: { canvas: { id: canvasId } },
        });
    }

    async create(canvasId: string, dto: {
        sourceNodeId: string;
        targetNodeId: string;
        edgeType: 'arrow' | 'hierarchy';
    }): Promise<Edges> {
        const edge = this.edgesRepository.create({
            canvas: { id: canvasId },
            sourceNode: { id: dto.sourceNodeId },
            targetNode: { id: dto.targetNodeId },
            edgeType: dto.edgeType,
        });
        return this.edgesRepository.save(edge);
    }

    async remove(edgeId: string): Promise<void> {
        const edge = await this.edgesRepository.findOne({ where: { id: edgeId } });
        if (!edge) throw new NotFoundException('엣지를 찾을 수 없습니다');
        await this.edgesRepository.remove(edge);
    }
}
