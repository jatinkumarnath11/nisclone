import { Request, Response, NextFunction } from 'express';
import { UsersService } from './users.service';
import { sendSuccess } from '../../utils/response.util';

export class UsersController {
  constructor(private usersService: UsersService) {}

  getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 20;
      const result = await this.usersService.listUsers(page, limit);
      sendSuccess(res, result);
    } catch (err) {
      next(err);
    }
  };

  getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.usersService.getUserById(req.params.id);
      sendSuccess(res, user);
    } catch (err) {
      next(err);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.usersService.createUser(req.body);
      sendSuccess(res, user, 'User created successfully', 201);
    } catch (err) {
      next(err);
    }
  };
}

