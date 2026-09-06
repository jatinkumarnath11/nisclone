export enum UserRole {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
  FACULTY = 'FACULTY',
  ACCOUNTANT = 'ACCOUNTANT',
  TRANSPORT_STAFF = 'TRANSPORT_STAFF',
  HOSTEL_STAFF = 'HOSTEL_STAFF',
  CANTEEN_STAFF = 'CANTEEN_STAFF',
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  EXCUSED = 'EXCUSED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PARTIAL = 'PARTIAL',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export enum ComplaintStatus {
  PENDING = 'PENDING',
  IN_REVIEW = 'IN_REVIEW',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED',
}

export enum NoticePriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}
