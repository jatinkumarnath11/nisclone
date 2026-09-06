import { Request, Response, NextFunction } from 'express';
import { DepartmentsService } from './departments.service';
import { sendSuccess } from '../../utils/response.util';

export class DepartmentsController {
  constructor(private deptService: DepartmentsService) {}

  getDepartments = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.deptService.listDepartments();
      sendSuccess(res, result);
    } catch (err) {
      next(err);
    }
  };

  getDepartment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dept = await this.deptService.getDepartmentById(req.params.id);
      sendSuccess(res, dept);
    } catch (err) {
      next(err);
    }
  };
}
