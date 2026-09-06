# System Architecture - University Management System (UMS)

## 1. High-Level Architecture Overview

Apex UMS uses a distributed monorepo architecture coordinated by **Turborepo** and **pnpm workspaces**:

```
[ Client Browser / Mobile Web ]
               │
               ▼
       [ Nginx Reverse Proxy ]
        /                   \
       ▼                     ▼
[ Next.js Web App ]   [ Express REST API ]
  (Port 3000)          (Port 5000)
                             │
            ┌────────────────┼────────────────┐
            ▼                ▼                ▼
     [ PostgreSQL 16 ]  [ Redis 7 ]   [ S3 / MinIO Storage ]
      (Prisma ORM)      (Pub/Sub,      (Documents & Assets)
                        BullMQ Queue,
                        Socket Adapter)
```

---

## 2. Backend Layered Architecture

To ensure strict separation of concerns, testability, and maintainability, the API strictly enforces a unidirectional dependency flow:

```
HTTP Request
     │
     ▼
[ Route Definitions ]
     │ (Applies validation and auth middlewares)
     ▼
[ Controller ]
     │ (Parses input parameters, invokes service, returns HTTP response)
     ▼
[ Service ]
     │ (Executes domain business rules, coordinates repositories & events)
     ▼
[ Repository ]
     │ (Direct database abstraction queries using Prisma)
     ▼
[ Prisma ORM ]
     │
     ▼
[ PostgreSQL Database ]
```

### Key Constraints:
- **Thin Controllers**: No business logic or database queries exist inside controllers.
- **Pure Services**: Services do not know about Express `req` or `res` objects.
- **Encapsulated Repositories**: All Prisma calls are contained strictly inside repository classes.

---

## 3. Package Isolation & Code Sharing

The monorepo separates common logic into reusable packages:
- `@ums/database`: Houses the single source of truth `schema.prisma`, migrations, and client singleton.
- `@ums/shared`: Contains system enums, constants, and universal utility functions.
- `@ums/validation`: Shared Zod validation contracts consumed identically by API route guards and web forms.
- `@ums/config`: Environment variable validation and fail-fast startup checks.
- `@ums/types`: Common TypeScript interfaces and API payload contracts.
- `@ums/eslint-config`: Shared linting and styling configurations.
