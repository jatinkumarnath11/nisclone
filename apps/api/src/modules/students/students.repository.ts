import prisma, { StudentProfile } from '@ums/database';

export class StudentsRepository {
  async findAll(skip = 0, take = 20): Promise<StudentProfile[]> {
    return prisma.studentProfile.findMany({
      skip,
      take,
      include: {
        user: true,
        program: {
          include: { department: true },
        },
      },
    });
  }

  async count(): Promise<number> {
    return prisma.studentProfile.count();
  }

  async findById(id: string): Promise<StudentProfile | null> {
    return prisma.studentProfile.findUnique({
      where: { id },
      include: {
        user: true,
        program: true,
        enrollments: {
          include: {
            courseSection: {
              include: {
                course: {
                  include: { subject: true },
                },
              },
            },
          },
        },
      },
    });
  }
}
