"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Starting database seed for Apex University Management System...');
    // 1. Seed Roles
    const roles = [
        client_1.UserRoleEnum.ADMIN,
        client_1.UserRoleEnum.STUDENT,
        client_1.UserRoleEnum.PARENT,
        client_1.UserRoleEnum.FACULTY,
        client_1.UserRoleEnum.ACCOUNTANT,
        client_1.UserRoleEnum.TRANSPORT_STAFF,
        client_1.UserRoleEnum.HOSTEL_STAFF,
        client_1.UserRoleEnum.CANTEEN_STAFF,
    ];
    const roleMap = {};
    for (const roleName of roles) {
        const role = await prisma.role.upsert({
            where: { name: roleName },
            update: {},
            create: {
                name: roleName,
                description: `System role for ${roleName.toLowerCase().replace('_', ' ')}`,
            },
        });
        roleMap[roleName] = role.id;
    }
    console.log('✅ Roles seeded successfully');
    // 2. Seed University & Campus
    const university = await prisma.university.upsert({
        where: { code: 'APEX-UNIV' },
        update: {},
        create: {
            name: 'Apex International University',
            code: 'APEX-UNIV',
            description: 'A premier research institution for excellence in education and innovation.',
            website: 'https://apex-university.edu',
            address: '100 University Boulevard, Tech Valley',
        },
    });
    const campus = await prisma.campus.upsert({
        where: {
            universityId_code: {
                universityId: university.id,
                code: 'MAIN-CAMPUS',
            },
        },
        update: {},
        create: {
            universityId: university.id,
            name: 'Apex Main Campus',
            code: 'MAIN-CAMPUS',
            city: 'Tech Valley',
            address: '100 University Boulevard, Campus North Gate',
        },
    });
    // 3. Seed Buildings & Rooms
    const building = await prisma.building.upsert({
        where: {
            campusId_code: {
                campusId: campus.id,
                code: 'ENG-BLOCK',
            },
        },
        update: {},
        create: {
            campusId: campus.id,
            name: 'Alan Turing Engineering Hall',
            code: 'ENG-BLOCK',
            floors: 4,
        },
    });
    const room = await prisma.room.upsert({
        where: {
            buildingId_roomNumber: {
                buildingId: building.id,
                roomNumber: '101',
            },
        },
        update: {},
        create: {
            buildingId: building.id,
            roomNumber: '101',
            capacity: 60,
            type: 'LECTURE_HALL',
        },
    });
    // 4. Seed Departments & Programs
    const department = await prisma.department.upsert({
        where: {
            campusId_code: {
                campusId: campus.id,
                code: 'CSE',
            },
        },
        update: {},
        create: {
            campusId: campus.id,
            name: 'Computer Science and Engineering',
            code: 'CSE',
            description: 'Department of Computer Science and Emerging Technologies',
        },
    });
    const program = await prisma.program.upsert({
        where: {
            departmentId_code: {
                departmentId: department.id,
                code: 'BS-CS',
            },
        },
        update: {},
        create: {
            departmentId: department.id,
            name: 'Bachelor of Science in Computer Science',
            code: 'BS-CS',
            durationYears: 4,
            totalSemesters: 8,
        },
    });
    // 5. Seed Academic Year & Semester
    const academicYear = await prisma.academicYear.upsert({
        where: { name: '2025-2026' },
        update: {},
        create: {
            name: '2025-2026',
            startDate: new Date('2025-08-01'),
            endDate: new Date('2026-05-31'),
            isCurrent: true,
        },
    });
    const semester = await prisma.semester.upsert({
        where: {
            academicYearId_number: {
                academicYearId: academicYear.id,
                number: 1,
            },
        },
        update: {},
        create: {
            academicYearId: academicYear.id,
            number: 1,
            name: 'Fall 2025',
            startDate: new Date('2025-08-15'),
            endDate: new Date('2025-12-20'),
            isCurrent: true,
        },
    });
    // 6. Seed Subjects & Courses
    const subject = await prisma.subject.upsert({
        where: { code: 'CS101' },
        update: {},
        create: {
            departmentId: department.id,
            code: 'CS101',
            name: 'Introduction to Algorithms and Data Structures',
            credits: 4,
            description: 'Foundations of algorithmic problem solving',
        },
    });
    const course = await prisma.course.upsert({
        where: {
            programId_subjectId_semester: {
                programId: program.id,
                subjectId: subject.id,
                semester: 1,
            },
        },
        update: {},
        create: {
            programId: program.id,
            subjectId: subject.id,
            semester: 1,
        },
    });
    // 7. Seed Development Users for all 8 Roles
    const defaultPasswordHash = await bcrypt.hash('DevPassword123!', 10);
    const devUsers = [
        { email: 'admin@ums.edu', firstName: 'System', lastName: 'Administrator', role: client_1.UserRoleEnum.ADMIN },
        { email: 'student@ums.edu', firstName: 'Alex', lastName: 'Mercer (Dev Student)', role: client_1.UserRoleEnum.STUDENT },
        { email: 'parent@ums.edu', firstName: 'Sarah', lastName: 'Mercer (Dev Parent)', role: client_1.UserRoleEnum.PARENT },
        { email: 'faculty@ums.edu', firstName: 'Dr. Robert', lastName: 'Langdon (Dev Faculty)', role: client_1.UserRoleEnum.FACULTY },
        { email: 'accountant@ums.edu', firstName: 'Michael', lastName: 'Scott (Dev Finance)', role: client_1.UserRoleEnum.ACCOUNTANT },
        { email: 'transport@ums.edu', firstName: 'Gary', lastName: 'Miller (Dev Transport)', role: client_1.UserRoleEnum.TRANSPORT_STAFF },
        { email: 'hostel@ums.edu', firstName: 'Helen', lastName: 'Warden (Dev Hostel)', role: client_1.UserRoleEnum.HOSTEL_STAFF },
        { email: 'canteen@ums.edu', firstName: 'Gordon', lastName: 'Ramsay (Dev Canteen)', role: client_1.UserRoleEnum.CANTEEN_STAFF },
    ];
    for (const u of devUsers) {
        const user = await prisma.user.upsert({
            where: { email: u.email },
            update: {},
            create: {
                email: u.email,
                passwordHash: defaultPasswordHash,
                firstName: u.firstName,
                lastName: u.lastName,
                isActive: true,
                isEmailVerified: true,
            },
        });
        const roleId = roleMap[u.role];
        if (roleId) {
            await prisma.userRoleMap.upsert({
                where: {
                    userId_roleId: {
                        userId: user.id,
                        roleId: roleId,
                    },
                },
                update: {},
                create: {
                    userId: user.id,
                    roleId: roleId,
                },
            });
        }
        // Role-specific profile initialization
        if (u.role === client_1.UserRoleEnum.FACULTY) {
            await prisma.facultyProfile.upsert({
                where: { userId: user.id },
                update: {},
                create: {
                    userId: user.id,
                    departmentId: department.id,
                    employeeId: 'EMP-FAC-001',
                    designation: 'Associate Professor',
                    qualification: 'Ph.D. in Computer Science',
                    joiningDate: new Date('2020-01-15'),
                    gender: client_1.GenderEnum.MALE,
                },
            });
        }
        else if (u.role === client_1.UserRoleEnum.STUDENT) {
            await prisma.studentProfile.upsert({
                where: { userId: user.id },
                update: {},
                create: {
                    userId: user.id,
                    programId: program.id,
                    admissionNumber: 'ADM-2025-001',
                    rollNumber: 'CS-2025-042',
                    currentSemester: 1,
                    dateOfBirth: new Date('2004-05-15'),
                    gender: client_1.GenderEnum.MALE,
                },
            });
        }
        else if (u.role === client_1.UserRoleEnum.PARENT) {
            await prisma.parent.upsert({
                where: { userId: user.id },
                update: {},
                create: {
                    userId: user.id,
                    relation: 'MOTHER',
                    occupation: 'Engineer',
                },
            });
        }
    }
    console.log('✅ Development accounts seeded for all 8 roles (Password: DevPassword123!)');
    console.log('🎉 Seed completed successfully!');
}
main()
    .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map