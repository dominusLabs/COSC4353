import { Test, TestingModule } from '@nestjs/testing';
import { HistoryController } from '../controllers/history.controller';
import { HistoryService } from '../services/history.service';

describe('HistoryController', () => {
  let historyController: HistoryController;
  let historyService: HistoryService;

  beforeEach(async () => {
    historyService = {
      getHistory: jest.fn(),
    } as unknown as HistoryService;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryController],
      providers: [
        { provide: HistoryService, useValue: historyService },
      ],
    }).compile();

    historyController = module.get<HistoryController>(HistoryController);
  });

  describe('getHistory', () => {
    it('should return history successfully', async () => {
      const mockHistory = [{ id: '1', action: 'Login', timestamp: '2024-07-27T12:00:00Z' }];
      jest.spyOn(historyService, 'getHistory').mockResolvedValue(mockHistory);

      expect(await historyController.getHistory()).toEqual(mockHistory);
    });

    it('should handle errors from HistoryService', async () => {
      const errorMessage = 'Service error';
      jest.spyOn(historyService, 'getHistory').mockRejectedValue(new Error(errorMessage));

      await expect(historyController.getHistory()).rejects.toThrow(errorMessage);
    });
  });
});
