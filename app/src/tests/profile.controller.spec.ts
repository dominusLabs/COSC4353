import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from '../services/profile.service';
import { SupabaseService } from '../libs/db/supabase.service';
import { UpdateProfile } from '../libs/interfaces/profile.interface';

describe('ProfileService', () => {
  let profileService: ProfileService;
  let supabaseService: SupabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: SupabaseService,
          useValue: {
            ProfileDBService: {
              updateProfile: jest.fn(),
              getProfile: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    profileService = module.get<ProfileService>(ProfileService);
    supabaseService = module.get<SupabaseService>(SupabaseService);
  });

  it('should be defined', () => {
    expect(profileService).toBeDefined();
  });

  describe('updateProfile', () => {
    it('should update the profile successfully', async () => {
      const userId = '123';
      const profile: UpdateProfile = {
        userID: userId,
        name: 'John Doe',
        addressOne: '123 Main St',
        addressTwo: 'Apt 4',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        skills: ['skill1', 'skill2'],
        preferences: ['pref1', 'pref2'],
        availability: [],
      };

      const response = { success: true, data: null, error: null };
      jest.spyOn(supabaseService.ProfileDBService, 'updateProfile').mockResolvedValue(response);

      expect(await profileService.updateProfile(userId, profile)).toEqual({ status: 200, message: 'Profile updated successfully' });
    });

    it('should handle update profile error', async () => {
      const userId = '123';
      const profile: UpdateProfile = {
        userID: userId,
        name: 'John Doe',
        addressOne: '123 Main St',
        addressTwo: 'Apt 4',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        skills: ['skill1', 'skill2'],
        preferences: ['pref1', 'pref2'],
        availability: [],
      };

      const response = { success: false, data: null, error: 'Update error' };
      jest.spyOn(supabaseService.ProfileDBService, 'updateProfile').mockResolvedValue(response);

      expect(await profileService.updateProfile(userId, profile)).toEqual({ status: 400, message: 'Update error' });
    });

    it('should handle internal server error during profile update', async () => {
      const userId = '123';
      const profile: UpdateProfile = {
        userID: userId,
        name: 'John Doe',
        addressOne: '123 Main St',
        addressTwo: 'Apt 4',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        skills: ['skill1', 'skill2'],
        preferences: ['pref1', 'pref2'],
        availability: [],
      };

      jest.spyOn(supabaseService.ProfileDBService, 'updateProfile').mockRejectedValue(new Error('Internal error'));

      expect(await profileService.updateProfile(userId, profile)).toEqual({ status: 500, message: 'Internal server error - please try again later' });
    });
  });

  describe('getProfile', () => {
    it('should retrieve the profile successfully', async () => {
      const userID = '123';
      const response = { success: true, data: { userID, name: 'John Doe' }, error: null };
      jest.spyOn(supabaseService.ProfileDBService, 'getProfile').mockResolvedValue(response);

      expect(await profileService.getProfile(userID)).toEqual({ status: 200, message: 'Profile retrieved successfully', data: { userID, name: 'John Doe' } });
    });

    it('should handle get profile error', async () => {
      const userID = '123';
      const response = { success: false, data: null, error: 'Retrieve error' };
      jest.spyOn(supabaseService.ProfileDBService, 'getProfile').mockResolvedValue(response);

      expect(await profileService.getProfile(userID)).toEqual({ status: 400, message: 'Retrieve error' });
    });

    it('should handle internal server error during profile retrieval', async () => {
      const userID = '123';
      jest.spyOn(supabaseService.ProfileDBService, 'getProfile').mockRejectedValue(new Error('Internal error'));

      expect(await profileService.getProfile(userID)).toEqual({ status: 500, message: 'Internal server error - please try again later' });
    });
  });
});