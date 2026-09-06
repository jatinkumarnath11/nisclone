import { FacultyRepository } from './faculty.repository';
import { NotFoundError } from '../../utils/errors.util';

export class FacultyService {
  constructor(private facultyRepo: FacultyRepository) {}

  async listFaculty(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.facultyRepo.findAll(skip, limit),
      this.facultyRepo.count(),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getFacultyById(id: string) {
    const faculty = await this.facultyRepo.findById(id);
    if (!faculty) {
      throw new NotFoundError(`Faculty with ID ${id} not found`);
    }
    return faculty;
  }
}
