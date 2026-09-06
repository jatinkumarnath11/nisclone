import prisma, { FacultyProfile } from '@ums/database';

export class FacultyRepository {
  async findAll(skip = 0, take = 20): Promise<FacultyProfile[]> {
    return prisma.facultyProfile.findMany({
      skip,
      take,
      include: {
        user: true,
        department: true,
      },
    });
  }

  async count(): Promise<number> {
    return prisma.facultyProfile.count();
  }

  async findById(id: string): Promise<FacultyProfile | null> {
    return prisma.facultyProfile.findUnique({
      where: { id },
      include: {
        user: true,
        department: true,
        courseSections: {
          include: {
            course: {
              include: { subject: true },
            },
          },
        },
      },
    });
  }
}
