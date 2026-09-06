# Database Design Document - University Management System (UMS)

## 1. Relational Design Principles
- **Engine**: PostgreSQL 16+ managed via Prisma ORM.
- **Keys**: UUID v4 primary keys (`@default(uuid())`) across all tables to prevent enumeration attacks and support distributed data ingestion.
- **Normalization**: 3rd Normal Form (3NF) design eliminating data duplication while optimizing for read operations through indexed foreign keys.
- **Auditability**: `createdAt` and `updatedAt` timestamps on all stateful tables; specialized immutable `AuditLog` and `LoginHistory` tables.
- **File Storage**: Binary objects (images, PDFs, documents) are strictly prevented from entering PostgreSQL; file metadata and S3 storage keys are stored instead.

---

## 2. Entity Groups Summary (45+ Entities)

1. **Authentication & Identity**: `User`, `Role`, `Permission`, `RolePermission`, `RefreshToken`, `LoginHistory`, `DeviceSession`, `AuditLog`.
2. **University & Campus Infrastructure**: `University`, `Campus`, `Building`, `Room`.
3. **Academic Structure**: `Department`, `Program`, `AcademicYear`, `Semester`, `Subject`, `Course`, `CourseSection`, `Enrollment`.
4. **Student & Parent Domain**: `Student`, `StudentProfile`, `Parent`, `StudentParent`.
5. **Faculty Domain**: `Faculty`, `FacultyProfile`.
6. **Attendance Management**: `AttendanceSession`, `AttendanceRecord`.
7. **Curriculum & Grading**: `Assignment`, `AssignmentSubmission`, `Exam`, `ExamSchedule`, `Result`, `Grade`.
8. **Timetables**: `Timetable`, `TimetableSlot`.
9. **Finance & Invoicing**: `FeeStructure`, `StudentFee`, `Invoice`, `Payment`, `PaymentTransaction`, `Scholarship`.
10. **Residential Housing**: `Hostel`, `HostelBlock`, `HostelRoom`, `HostelBed`, `HostelAllocation`, `HostelComplaint`.
11. **Transit Logistics**: `Bus`, `Driver`, `BusRoute`, `BusStop`, `BusAssignment`, `BusLocation`.
12. **Dining & Cafeteria**: `Canteen`, `Menu`, `MenuItem`, `CanteenOrder`, `CanteenOrderItem`.
13. **Bulletins & Communication**: `Notice`, `NoticeRecipient`, `Notification`, `NotificationPreference`, `Conversation`, `ConversationMember`, `Message`, `MessageAttachment`.
14. **Grievances & Document Vault**: `Complaint`, `ComplaintComment`, `ComplaintAttachment`, `DocumentCategory`, `Document`, `DocumentAccess`.
