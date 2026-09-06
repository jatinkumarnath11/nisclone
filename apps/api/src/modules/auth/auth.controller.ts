import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { sendSuccess } from '../../utils/response.util';

export class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.authService.login(req.body);
      sendSuccess(res, result, 'Login successful');
    } catch (err) {
      next(err);
    }
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { refreshToken } = req.body;
      const tokens = await this.authService.refreshToken(refreshToken);
      sendSuccess(res, tokens, 'Token refreshed successfully');
    } catch (err) {
      next(err);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { refreshToken } = req.body;
      await this.authService.logout(refreshToken, req.user?.userId);
      sendSuccess(res, { loggedOut: true }, 'Successfully logged out');
    } catch (err) {
      next(err);
    }
  };

  me = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.authService.getCurrentUser(req.user!.userId);
      sendSuccess(res, user);
    } catch (err) {
      next(err);
    }
  };
}
