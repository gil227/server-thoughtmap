import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Canvas } from '../canvases/canvas.entity';
import { Nodes } from '../nodes/nodes.entity';

@Entity('edges')
export class Edges {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Canvas)
    @JoinColumn({ name: 'canvas_id' })
    canvas: Canvas;

    @ManyToOne(() => Nodes)
    @JoinColumn({ name: 'source_node_id' })
    sourceNode: Nodes;

    @ManyToOne(() => Nodes)
    @JoinColumn({ name: 'target_node_id' })
    targetNode: Nodes;

    @Column({ type: 'enum', enum: ['arrow', 'hierarchy'] })
    edgeType: 'arrow' | 'hierarchy';

    @CreateDateColumn()
    createdAt: Date;
}