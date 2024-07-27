import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from '../controllers/notification.controller';
import { NotificationService } from '../services/notification.service';

describe('NotificationController', () => {
  let notificationController: NotificationController;
  let notificationService: NotificationService;

  beforeEach(async () => {
    notificationService = {
      getNotifications: jest.fn(),
      updateNotificationStatus: jest.fn(),
    } as unknown as NotificationService;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [
        { provide: NotificationService, useValue: notificationService },
      ],
    }).compile();

    notificationController = module.get<NotificationController>(NotificationController);
  });

  describe('getNotifications', () => {
    it('should return notifications successfully', async () => {
      const mockData = [{ id: 1, user_id: 'uuid', message: 'Test notification', is_read: false }];
      jest.spyOn(notificationService, 'getNotifications').mockResolvedValue(mockData);

      expect(await notificationController.getNotifications()).toEqual(mockData);
    });

    it('should handle errors from NotificationService', async () => {
      const errorMessage = 'Service error';
      jest.spyOn(notificationService, 'getNotifications').mockRejectedValue(new Error(errorMessage));

      await expect(notificationController.getNotifications()).rejects.toThrow(errorMessage);
    });
  });

  describe('updateNotificationStatus', () => {
    it('should update notification status successfully', async () => {
      const mockResponse = { id: 1, is_read: true };
      jest.spyOn(notificationService, 'updateNotificationStatus').mockResolvedValue(mockResponse);

      expect(await notificationController.updateNotificationStatus('1', { isRead: true })).toEqual(mockResponse);
    });

    it('should handle errors from NotificationService', async () => {
      const errorMessage = 'Service error';
      jest.spyOn(notificationService, 'updateNotificationStatus').mockRejectedValue(new Error(errorMessage));

      await expect(notificationController.updateNotificationStatus('1', { isRead: true })).rejects.toThrow(errorMessage);
    });
  });
});
