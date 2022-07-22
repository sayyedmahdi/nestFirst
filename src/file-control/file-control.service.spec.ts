import { Test, TestingModule } from '@nestjs/testing';
import { FileControlService } from './file-control.service';

describe('FileControlService', () => {
  let service: FileControlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileControlService],
    }).compile();

    service = module.get<FileControlService>(FileControlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
