import prisma, { UserRoleEnum } from '../packages/database/src/client';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('Provisioning users in Supabase...');

  const usersToEnsure = [
    {
      email: 'jatinkumarnath110907@gmail.com',
      firstName: 'Jatin',
      lastName: 'Kumar',
      role: UserRoleEnum.ADMIN,
      passwords: ['DevPassword123!', 'Sonappie@250724', 'AdminPassword123!'],
    },
    {
      email: 'admin@ums.edu',
      firstName: 'System',
      lastName: 'Administrator',
      role: UserRoleEnum.ADMIN,
      passwords: ['DevPassword123!'],
    },
  ];

  // Find ADMIN role
  const adminRole = await prisma.role.findUnique({
    where: { name: UserRoleEnum.ADMIN },
  });

  if (!adminRole) {
    console.error('Admin role not found!');
    return;
  }

  for (const item of usersToEnsure) {
    const passwordHash = await bcrypt.hash(item.passwords[0], 10);

    const user = await prisma.user.upsert({
      where: { email: item.email },
      update: {
        passwordHash,
        isActive: true,
        isEmailVerified: true,
      },
      create: {
        email: item.email,
        passwordHash,
        firstName: item.firstName,
        lastName: item.lastName,
        isActive: true,
        isEmailVerified: true,
      },
    });

    await prisma.userRoleMap.upsert({
      where: {
        userId_roleId: {
          userId: user.id,
          roleId: adminRole.id,
        },
      },
      update: {},
      create: {
        userId: user.id,
        roleId: adminRole.id,
      },
    });

    console.log(`✅ User ${item.email} is ready with role ADMIN (Password: ${item.passwords[0]})`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
