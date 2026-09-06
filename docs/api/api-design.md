# API Design Guidelines & Endpoints - Apex UMS

## 1. REST Conventions & Standards

- **Base URL**: `/api/v1`
- **Interactive Documentation**: Available at `/api/docs` via Swagger UI.
- **Data Exchange**: All payloads are formatted in `application/json`.
- **Status Codes**:
  - `200 OK`: Request succeeded, response returned.
  - `201 Created`: Resource created successfully.
  - `400 Bad Request`: Syntax or format violation.
  - `401 Unauthorized`: Authentication token missing or invalid.
  - `403 Forbidden`: Insufficient role or permissions.
  - `404 Not Found`: Resource does not exist.
  - `422 Unprocessable Entity`: Zod input validation error with details array.
  - `429 Too Many Requests`: Rate limit reached.
  - `500 Internal Server Error`: Server exception (details masked in production).

---

## 2. Standardized JSON Envelope

Every API response adheres to a predictable structure:

### Success Response:
```json
{
  "success": true,
  "message": "Resource fetched successfully",
  "data": { ... },
  "timestamp": "2026-09-07T00:00:00.000Z"
}
```

### Error Response:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request body validation failed",
    "details": [
      { "field": "email", "message": "Please provide a valid email address" }
    ]
  },
  "timestamp": "2026-09-07T00:00:00.000Z"
}
```

---

## 3. Core Endpoint Catalog

### Authentication
- `POST /api/v1/auth/login` - Login with credentials, returns access & refresh tokens
- `POST /api/v1/auth/refresh-token` - Token rotation, yields new token pair
- `POST /api/v1/auth/logout` - Revokes refresh token in database
- `GET /api/v1/auth/me` - Returns currently authenticated session profile

### Users & Administration
- `GET /api/v1/users` - Paginated user directory [Admin only]
- `GET /api/v1/users/:id` - Detailed user profile [Admin only]
- `GET /api/v1/audit-logs` - System audit log history [Admin only]

### Academics & Teaching
- `GET /api/v1/students` - Student directory
- `GET /api/v1/students/:id` - Student academic record
- `GET /api/v1/faculty` - Faculty directory
- `GET /api/v1/departments` - Academic departments listing
- `GET /api/v1/programs` - Degree programs listing
- `GET /api/v1/subjects` - Course and subject catalog
- `POST /api/v1/attendance/sessions` - Open attendance session [Faculty]
- `POST /api/v1/attendance/records` - Record attendance entries [Faculty]
- `GET /api/v1/attendance/student/:studentId` - Student attendance records
- `GET /api/v1/assignments/section/:courseSectionId` - Course assignments
- `GET /api/v1/exams/section/:courseSectionId` - Examination schedules
- `GET /api/v1/results/student/:studentId` - Examination results
- `GET /api/v1/timetable/semester/:semesterId` - Class timetable

### Finance & Logistics
- `GET /api/v1/fees/structures` - Fee structures
- `GET /api/v1/fees/student/:studentId` - Student fee billing statements
- `POST /api/v1/payments` - Record payment transaction
- `GET /api/v1/hostel` - Hostel blocks and capacity
- `GET /api/v1/hostel/my-allocation` - Student assigned bed & room
- `GET /api/v1/transport/buses` - Bus fleet inventory
- `GET /api/v1/transport/my-bus` - Student transit route pass
- `GET /api/v1/canteen/menus` - Daily dining cafeteria menu
- `GET /api/v1/canteen/orders/my` - Customer food orders
- `GET /api/v1/notices` - Official university circulars
- `GET /api/v1/notifications/my` - User notifications feed
- `GET /api/v1/complaints/my` - User grievances and maintenance tickets
- `GET /api/v1/documents/my` - User document vault
