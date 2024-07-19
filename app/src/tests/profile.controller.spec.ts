import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from '../controllers/profile.controller';
import { ProfileService } from '../services/profile.service';

describe('AppController', () => {
  let appController: ProfileController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [ProfileService],
    }).compile();

    appController = app.get<ProfileController>(ProfileController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
