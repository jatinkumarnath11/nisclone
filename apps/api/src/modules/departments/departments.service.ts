import { DepartmentsRepository } from './departments.repository';
import { NotFoundError } from '../../utils/errors.util';

export class DepartmentsService {
  constructor(private deptRepo: DepartmentsRepository) {}

  async listDepartments() {
    return this.deptRepo.findAll();
  }

  async getDepartmentById(id: string) {
    const dept = await this.deptRepo.findById(id);
    if (!dept) {
      throw new NotFoundError(`Department with ID ${id} not found`);
    }
    return dept;
  }
}
