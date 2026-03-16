import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Canvas } from '../canvases/canvas.entity';

@Entity('nodes')
export class Nodes {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Canvas)
    @JoinColumn({ name: 'canvas_id' })
    canvas: Canvas;

    @Column({ name: 'canvas_id' })
    canvasId: string;

    @Column({ type: 'enum', enum: ['text', 'image'] })
    type: 'text' | 'image';

    @Column({ type: 'text', nullable: true })
    content: string;

    @Column({ type: 'float' })
    positionX: number;

    @Column({ type: 'float' })
    positionY: number;

    @Column({ type: 'float' })
    width: number;

    @Column({ type: 'float' })
    height: number;

    @CreateDateColumn()
    createdAt: Date;
}