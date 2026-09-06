import prisma, { Department } from '@ums/database';

export class DepartmentsRepository {
  async findAll(): Promise<Department[]> {
    return prisma.department.findMany({
      include: {
        campus: true,
        programs: true,
      },
    });
  }

  async findById(id: string): Promise<Department | null> {
    return prisma.department.findUnique({
      where: { id },
      include: {
        campus: true,
        programs: true,
        subjects: true,
      },
    });
  }
}
