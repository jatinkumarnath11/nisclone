const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, '../packages/database/node_modules/@prisma/client'));
const bcrypt = require(path.resolve(__dirname, '../apps/api/node_modules/bcryptjs'));

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'postgresql://postgres:Sonappie%40250724@db.cxmgzegkhjyqylusjhyd.supabase.co:5432/postgres'
    }
  }
});

async function main() {
  console.log('Connecting to Supabase...');

  // Ensure ADMIN role exists
  let adminRole = await prisma.role.findFirst({
    where: { name: 'ADMIN' }
  });

  if (!adminRole) {
    adminRole = await prisma.role.create({
      data: {
        name: 'ADMIN',
        description: 'Administrator role with full system access'
      }
    });
    console.log('Created ADMIN role:', adminRole.id);
  } else {
    console.log('Found ADMIN role:', adminRole.id);
  }

  // Hash password
  const password = 'DevPassword123!';
  const passwordHash = await bcrypt.hash(password, 10);

  const users = [
    {
      email: 'jatinkumarnath110907@gmail.com',
      firstName: 'Jatin',
      lastName: 'Kumar',
      password: 'DevPassword123!'
    },
    {
      email: 'admin@ums.edu',
      firstName: 'Admin',
      lastName: 'System',
      password: 'DevPassword123!'
    }
  ];

  for (const u of users) {
    const hash = await bcrypt.hash(u.password, 10);
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {
        firstName: u.firstName,
        lastName: u.lastName,
        passwordHash: hash,
        isActive: true,
        isEmailVerified: true
      },
      create: {
        email: u.email,
        firstName: u.firstName,
        lastName: u.lastName,
        passwordHash: hash,
        isActive: true,
        isEmailVerified: true
      }
    });

    await prisma.userRoleMap.upsert({
      where: {
        userId_roleId: {
          userId: user.id,
          roleId: adminRole.id
        }
      },
      update: {},
      create: {
        userId: user.id,
        roleId: adminRole.id
      }
    });

    console.log(`Successfully provisioned user: ${user.email} (ID: ${user.id}) with ADMIN role!`);
  }
}

main()
  .catch(err => {
    console.error('Error provisioning users:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
