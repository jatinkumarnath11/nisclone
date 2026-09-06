import { Request, Response, NextFunction } from 'express';
import { FacultyService } from './faculty.service';
import { sendSuccess } from '../../utils/response.util';

export class FacultyController {
  constructor(private facultyService: FacultyService) {}

  getFacultyList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 20;
      const result = await this.facultyService.listFaculty(page, limit);
      sendSuccess(res, result);
    } catch (err) {
      next(err);
    }
  };

  getFaculty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const faculty = await this.facultyService.getFacultyById(req.params.id);
      sendSuccess(res, faculty);
    } catch (err) {
      next(err);
    }
  };
}
