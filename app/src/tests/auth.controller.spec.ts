import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { SupabaseService } from '../libs/db/supabase.service';

describe('AuthService', () => {
  let authService: AuthService;
  let supabaseService: SupabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: SupabaseService,
          useValue: {
            AuthDBService: {
              register: jest.fn(),
              verifyAccount: jest.fn(),
              login: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    supabaseService = module.get<SupabaseService>(SupabaseService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('registerAccount', () => {
    it('should register a new account', async () => {
      const body = { email: 'test@example.com', password: 'password', accountType: 'user' };
      const response = { success: true, data: null, error: null };
      jest.spyOn(supabaseService.AuthDBService, 'register').mockResolvedValue(response);

      expect(await authService.registerAccount(body)).toEqual({ status: 200, message: 'Account created successfully. Please check your email for verification' });
    });

    it('should handle registration error', async () => {
      const body = { email: 'test@example.com', password: 'password', accountType: 'user' };
      const response = { success: false, data: null, error: 'Registration error' };
      jest.spyOn(supabaseService.AuthDBService, 'register').mockResolvedValue(response);

      expect(await authService.registerAccount(body)).toEqual({ status: 400, message: 'Registration error' });
    });

    it('should handle internal server error', async () => {
      const body = { email: 'test@example.com', password: 'password', accountType: 'user' };
      jest.spyOn(supabaseService.AuthDBService, 'register').mockRejectedValue(new Error('Internal error'));

      expect(await authService.registerAccount(body)).toEqual({ status: 500, message: 'Internal server error - please try again later' });
    });
  });

  describe('verifyAccount', () => {
    it('should verify an account', async () => {
      const body = { email: 'test@example.com' };
      const response = { success: true, data: null, error: null };
      jest.spyOn(supabaseService.AuthDBService, 'verifyAccount').mockResolvedValue(response);

      expect(await authService.verifyAccount(body)).toEqual({ status: 200, message: 'Account verified successfully' });
    });

    it('should handle verification error', async () => {
      const body = { email: 'test@example.com' };
      const response = { success: false, data: null, error: 'Verification error' };
      jest.spyOn(supabaseService.AuthDBService, 'verifyAccount').mockResolvedValue(response);

      expect(await authService.verifyAccount(body)).toEqual({ status: 400, message: 'Verification error' });
    });

    it('should handle internal server error', async () => {
      const body = { email: 'test@example.com' };
      jest.spyOn(supabaseService.AuthDBService, 'verifyAccount').mockRejectedValue(new Error('Internal error'));

      expect(await authService.verifyAccount(body)).toEqual({ status: 500, message: 'Internal server error - please try again later' });
    });
  });

  describe('loginAccount', () => {
    it('should log in an account', async () => {
      const body = { email: 'test@example.com', password: 'password' };
      const response = { success: true, data: { token: 'token' }, error: null };
      jest.spyOn(supabaseService.AuthDBService, 'login').mockResolvedValue(response);

      expect(await authService.loginAccount(body)).toEqual({ status: 200, message: 'Logged in!', data: { token: 'token' } });
    });

    it('should handle login error', async () => {
      const body = { email: 'test@example.com', password: 'password' };
      const response = { success: false, data: null, error: 'Login error' };
      jest.spyOn(supabaseService.AuthDBService, 'login').mockResolvedValue(response);

      expect(await authService.loginAccount(body)).toEqual({ status: 400, message: 'Login error' });
    });

    it('should handle internal server error', async () => {
      const body = { email: 'test@example.com', password: 'password' };
      jest.spyOn(supabaseService.AuthDBService, 'login').mockRejectedValue(new Error('Internal error'));

      expect(await authService.loginAccount(body)).toEqual({ status: 500, message: 'Internal server error - please try again later' });
    });
  });
});
