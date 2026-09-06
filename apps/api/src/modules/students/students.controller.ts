import { Request, Response, NextFunction } from 'express';
import { StudentsService } from './students.service';
import { sendSuccess } from '../../utils/response.util';

export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  getStudents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 20;
      const result = await this.studentsService.listStudents(page, limit);
      sendSuccess(res, result);
    } catch (err) {
      next(err);
    }
  };

  getStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const student = await this.studentsService.getStudentById(req.params.id);
      sendSuccess(res, student);
    } catch (err) {
      next(err);
    }
  };
}
