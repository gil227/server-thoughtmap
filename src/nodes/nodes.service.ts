import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import { Nodes } from './nodes.entity';

@Injectable()
export class NodesService {
    constructor(
        @InjectRepository(Nodes)
        private nodesRepository: Repository<Nodes>,
    ) {}

    async findAll(canvasId: string): Promise<Nodes[]> {
        return this.nodesRepository.find({
            where: {canvasId},
        });
    }

    async create(canvasId: string, dto: {
        type: 'text' | 'image';
        content: string;
        positionX: number;
        positionY: number;
        width: number;
        height: number;
    }): Promise<Nodes> {
        const node = this.nodesRepository.create({
            canvasId,
            ...dto,
        });
        return this.nodesRepository.save(node);
    }

    async update(nodeId: string, dto: Partial<{
        content: string;
        positionX: number;
        positionY: number;
        width: number;
        height: number;
    }>): Promise<Nodes> {
        const node = await this.nodesRepository.findOne({ where: { id: nodeId } });
        if (!node) throw new NotFoundException('노드를 찾을 수 없습니다');
        Object.assign(node, dto);
        return this.nodesRepository.save(node);
    }

    async remove(nodeId: string): Promise<void> {
        const node = await this.nodesRepository.findOne({ where: { id: nodeId } });
        if (!node) throw new NotFoundException('노드를 찾을 수 없습니다');
        await this.nodesRepository.remove(node);
    }
}
