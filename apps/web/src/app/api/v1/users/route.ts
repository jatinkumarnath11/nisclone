import { NextRequest, NextResponse } from 'next/server';
import prisma, { UserRoleEnum } from '@ums/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'ums_dev_access_token_secret_replace_in_production_key_32bytes!';

function authenticateAdmin(req: NextRequest): { userId: string; roles: string[] } | null {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          roles: {
            include: { role: true },
          },
        },
      }),
      prisma.user.count(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        items: items.map((user) => ({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          roles: user.roles?.map((r) => r.role?.name || r.role) || [],
          isActive: user.isActive,
          createdAt: user.createdAt,
        })),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Error fetching users in serverless route:', err);
    return NextResponse.json(
      { success: false, error: { message: err?.message || 'Failed to fetch users' } },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = authenticateAdmin(req);
    // Allow creation if token has ADMIN role or in development mode
    if (auth && !auth.roles?.includes('ADMIN') && process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { success: false, error: { message: 'Forbidden: Admin role required' } },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { email, password, firstName, lastName, phoneNumber, roles = ['STUDENT'] } = body;

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { success: false, error: { message: 'Email, password, first name, and last name are required' } },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    // Check duplicate
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: { message: `User with email "${normalizedEmail}" already exists` } },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Resolve matching roles from database
    let roleRecords = await prisma.role.findMany({
      where: {
        name: { in: roles as UserRoleEnum[] },
      },
    });

    if (roleRecords.length === 0) {
      const defaultRole = await prisma.role.findFirst({
        where: { name: 'STUDENT' },
      }) || await prisma.role.findFirst();
      if (defaultRole) {
        roleRecords = [defaultRole];
      }
    }

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phoneNumber: phoneNumber?.trim() || null,
        isActive: true,
        isEmailVerified: true,
        roles: {
          create: roleRecords.map((role) => ({
            roleId: role.id,
          })),
        },
      },
      include: {
        roles: {
          include: { role: true },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'User created successfully',
        data: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          roles: user.roles?.map((r) => r.role?.name || r.role) || [],
          isActive: user.isActive,
          createdAt: user.createdAt,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('Error creating user in serverless route:', err);
    return NextResponse.json(
      { success: false, error: { message: err?.message || 'Failed to create user' } },
      { status: 500 }
    );
  }
}
