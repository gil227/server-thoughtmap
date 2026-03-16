import { Test, TestingModule } from '@nestjs/testing';
import { CanvasesController } from './canvases.controller';

describe('CanvasesController', () => {
  let controller: CanvasesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CanvasesController],
    }).compile();

    controller = module.get<CanvasesController>(CanvasesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
