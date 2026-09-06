import { StudentsRepository } from './students.repository';
import { NotFoundError } from '../../utils/errors.util';

export class StudentsService {
  constructor(private studentsRepo: StudentsRepository) {}

  async listStudents(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.studentsRepo.findAll(skip, limit),
      this.studentsRepo.count(),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getStudentById(id: string) {
    const student = await this.studentsRepo.findById(id);
    if (!student) {
      throw new NotFoundError(`Student with ID ${id} not found`);
    }
    return student;
  }
}
