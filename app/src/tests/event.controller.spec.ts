import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from '../controllers/event.controller';
import { EventService } from '../services/event.service';

describe('EventController', () => {
  let eventController: EventController;
  let eventService: EventService;

  beforeEach(async () => {
    eventService = {
      getAllEvents: jest.fn(),
      createEvent: jest.fn(),
      deleteEvent: jest.fn(),
    } as unknown as EventService;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        { provide: EventService, useValue: eventService },
      ],
    }).compile();

    eventController = module.get<EventController>(EventController);
  });

  describe('getAllEvents', () => {
    it('should return all events successfully', async () => {
      const mockEvents = [{ id: '1', name: 'Event 1', date: '2024-08-01' }];
      jest.spyOn(eventService, 'getAllEvents').mockResolvedValue(mockEvents);

      expect(await eventController.getAllEvents()).toEqual(mockEvents);
    });

    it('should handle errors from EventService', async () => {
      const errorMessage = 'Service error';
      jest.spyOn(eventService, 'getAllEvents').mockRejectedValue(new Error(errorMessage));

      await expect(eventController.getAllEvents()).rejects.toThrow(errorMessage);
    });
  });

  describe('createEvent', () => {
    it('should create an event successfully', async () => {
      const newEvent = { name: 'New Event', date: '2024-08-01' };
      const createdEvent = { id: '1', ...newEvent };
      jest.spyOn(eventService, 'createEvent').mockResolvedValue(createdEvent);

      expect(await eventController.createEvent(newEvent)).toEqual(createdEvent);
    });

    it('should handle errors from EventService', async () => {
      const errorMessage = 'Service error';
      jest.spyOn(eventService, 'createEvent').mockRejectedValue(new Error(errorMessage));

      await expect(eventController.createEvent({ name: 'New Event', date: '2024-08-01' })).rejects.toThrow(errorMessage);
    });
  });

  describe('deleteEvent', () => {
    it('should delete an event successfully', async () => {
      const eventId = '1';
      const deleteResponse = { success: true };
      jest.spyOn(eventService, 'deleteEvent').mockResolvedValue(deleteResponse);

      expect(await eventController.deleteEvent(eventId)).toEqual(deleteResponse);
    });

    it('should handle errors from EventService', async () => {
      const eventId = '1';
      const errorMessage = 'Service error';
      jest.spyOn(eventService, 'deleteEvent').mockRejectedValue(new Error(errorMessage));

      await expect(eventController.deleteEvent(eventId)).rejects.toThrow(errorMessage);
    });
  });
});
