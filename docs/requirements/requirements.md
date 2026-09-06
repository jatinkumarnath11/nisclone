# System Requirements Specification (SRS) - University Management System (UMS)

## 1. Executive Summary
The Apex University Management System (UMS) is an enterprise-grade platform unifying 9 distinct university user groups across administrative governance, student academics, parent transparency, faculty operations, billing, residential life, transport fleet tracking, and dining.

---

## 2. User Roles & Permission Matrix

| Role | Primary Responsibilities | Core Accessible Modules |
|---|---|---|
| **ADMIN** | System-wide configuration, user provisioning, academic structures, audit oversight | All Modules, Audit Logs, Role Permissions, Global Settings |
| **STUDENT** | Course participation, attendance tracking, results, fee settlements, hostel & bus passes | Timetable, Attendance, Assignments, Results, Fees, Hostel, Transport, Grievances |
| **FACULTY** | Lecture delivery, student attendance marking, coursework assignments, examination score entry | Classes, Attendance Sessions, Assignments, Grading Rubrics, Exam Entries |
| **PARENT** | Academic oversight, attendance alerts, tuition fee payment, institutional communications | Children Overview, Attendance Records, Examination Results, Tuition Billing |
| **ACCOUNTANT** | Tuition packages, invoicing, online payment reconciliation, scholarship disbursement | Fee Structures, Invoices, Transaction Ledgers, Financial Statements |
| **TRANSPORT_STAFF** | Fleet inventory, route stops, driver rosters, bus schedules, live GPS telemetry | Buses, Routes, Driver Directory, Live Telemetry Tracking |
| **HOSTEL_STAFF** | Residential halls, room capacity, bed allocations, check-in verification, facility tickets | Hostel Blocks, Room Inventory, Bed Allocations, Maintenance Grievances |
| **CANTEEN_STAFF** | Dining menus, daily specials, POS orders, token queues, hygiene feedback | Cafeteria Menus, Live Order Queue, Dining Feedback |

---

## 3. Functional Module Breakdown

### 3.1 Authentication & Security (RBAC)
- Multi-role support: Short-lived JWT access tokens (15m) paired with rotatable refresh tokens (7d) stored securely with cryptographic hashes in PostgreSQL.
- Server-side RBAC middleware and fine-grained permission checks.
- Rate-limiting (1000 requests / 15m), security headers (Helmet), input sanitization (Zod).

### 3.2 Academic Operations
- Structural modeling of Universities, Campuses, Buildings, Rooms, Departments, Programs, Academic Years, and Semesters.
- Course sections, enrollment management, daily attendance sessions with real-time discrepancy marking.
- Coursework assignment distributions, submission attachments, exam schedules, and letter grading schemes.

### 3.3 Finance & Student Billing
- Dynamic fee structures per program and academic year.
- Automated invoice creation, partial payment tracking, and gateway transaction reconciliation.
- Scholarship deductions and financial ledger exports.

### 3.4 Campus Logistics (Hostel, Transport & Dining)
- Physical building mapping down to blocks, rooms, and individual bed inventory.
- Transit vehicle fleet management, sequence-ordered bus stops, and driver assignments.
- Real-time GPS coordinate telemetry broadcasting via WebSockets.
- Cafeteria menus, item pricing, and tokenized order workflows.

### 3.5 Real-time Communication & Documents
- Socket.IO with Redis Adapter for multi-node event broadcasting.
- Instant notifications for attendance, fee payments, and notices.
- Document vault with S3-compatible metadata storage and access audit logging.
