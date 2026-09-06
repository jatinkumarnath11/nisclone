# University Management System (UMS)

Production-grade, real-time University Management System (UMS) built with a scalable monorepo architecture for enterprise campus operations, academics, finance, student life, and logistics.

---

## 1. Project Overview

Apex UMS centralizes operations for 9 distinct campus stakeholder groups:
1. **Admin Team**: Master data governance, user RBAC, campus facilities, academic structure, audit oversight.
2. **Students**: Academics, course registration, attendance, timetable, results, fee invoices, hostel allocations, transit passes, grievances.
3. **Faculty**: Attendance marking, assignment distributions, grading rubrics, examination scores, timetable.
4. **Parents**: Ward attendance alerts, grade reports, tuition statements, direct administrative notices.
5. **Account/Finance Team**: Fee packages, student invoicing, payment gateway reconciliation, scholarships, ledgers.
6. **Transport Staff**: Vehicle fleet inventory, transit routes, pickup stops, driver rosters, live GPS telemetry.
7. **Hostel Staff**: Residence blocks, room capacity, bed allocations, check-ins, maintenance tickets.
8. **Canteen Staff**: Cafeteria dining menus, order tokens, point-of-sale management, hygiene feedback.
9. **General Staff**: Institutional communications and inter-departmental workflows.

---

## 2. Technology Stack

- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, TanStack Query, React Hook Form, Zod, Zustand, Lucide Icons.
- **Backend**: Node.js, Express.js, TypeScript, Socket.IO, BullMQ, Prisma ORM, Zod, JWT (short-lived + rotatable refresh tokens), RBAC, Multer, Winston, Swagger.
- **Database**: PostgreSQL 16+.
- **Caching & Real-Time**: Redis 7+ (Caching, BullMQ Queue, Socket.IO multi-instance adapter).
- **Object Storage**: S3-compatible interface (AWS S3 / MinIO).
- **Monorepo**: pnpm workspaces & Turborepo.
- **DevOps**: Docker, Docker Compose, Nginx, GitHub Actions CI/CD.

---

## 3. Directory Structure

```
university-management-system/
├── apps/
│   ├── web/                     # Next.js 14+ Frontend Application
│   │   ├── public/              # Static assets (images, icons, logos)
│   │   └── src/
│   │       ├── app/             # App Router: (public), (auth), dashboard/*
│   │       ├── components/      # UI, layout, dashboard, tables, forms, charts
│   │       ├── features/        # Feature domain modules
│   │       ├── hooks/           # Custom React hooks
│   │       ├── lib/             # API client and utilities
│   │       └── store/           # Zustand global state stores
│   │
│   └── api/                     # Express.js REST API & Real-time Server
│       ├── src/
│       │   ├── config/          # Redis, Winston logger, Swagger, Env
│       │   ├── middlewares/     # Auth, RBAC, Validate, Upload, Error, Logger
│       │   ├── modules/         # 24 Layered Domain Modules
│       │   ├── realtime/        # Socket.IO, Notifications, Chat, Transport
│       │   ├── jobs/            # BullMQ workers (Email, Notifications, Reports)
│       │   ├── utils/           # Response envelope, JWT, Password helpers
│       │   ├── routes/          # Central v1 route registration
│       │   ├── app.ts           # Express application setup
│       │   └── server.ts        # Server bootstrap entrypoint
│       └── tests/               # API integration test suite
│
├── packages/
│   ├── database/                # Prisma schema (45+ entities), migrations, seed.ts
│   ├── shared/                  # Constants, domain enums, utility types
│   ├── validation/              # Zod validation schemas
│   ├── config/                  # Environment parser with fail-fast validation
│   ├── types/                   # Unified TypeScript definitions & API contracts
│   └── eslint-config/           # Monorepo ESLint configuration
│
├── infrastructure/
│   ├── docker/                  # Multi-stage production Dockerfiles
│   ├── nginx/                   # Reverse proxy configuration
│   └── monitoring/              # Prometheus metrics configuration
│
├── docs/                        # Architecture, database ER, requirements, and API specs
├── scripts/                     # Automated setup and health check scripts
├── .github/workflows/           # CI/CD automation pipelines
├── docker-compose.yml           # Dev environment orchestration (Postgres, Redis)
├── pnpm-workspace.yaml          # Workspace definitions
├── turbo.json                   # Turborepo task pipeline
└── .env.example                 # Environment variable templates
```

---

## 4. Requirements & Prerequisites

- **Node.js**: >= 20.0.0 LTS
- **pnpm**: >= 9.0.0 (`npm install -g pnpm`)
- **Docker & Docker Compose**: Recommended for local PostgreSQL & Redis services.

---

## 5. Installation & Setup

### 5.1 Clone & Install Dependencies
```bash
# Clone the repository
git clone <repo-url>
cd university-management-system

# Install all monorepo dependencies
pnpm install
```

### 5.2 Environment Configuration
```bash
# Copy example environment configuration
cp .env.example .env
```

### 5.3 Start Database & Redis (Docker Compose)
```bash
# Start PostgreSQL 16 and Redis 7 in background
docker compose up -d postgres redis

# Check container health
docker compose ps
```

### 5.4 Prisma Database Setup & Seeding
```bash
# Generate Prisma Client
pnpm db:generate

# Push schema directly to database (for dev) or run migrations
pnpm db:push

# Seed development users and academic structure
pnpm db:seed
```

---

## 6. Running Locally

```bash
# Run both Next.js Web (port 3000) and Express API (port 5000) in parallel:
pnpm dev

# Or run individual applications:
pnpm --filter @ums/api dev    # Starts API on http://localhost:5000
pnpm --filter @ums/web dev    # Starts Web on http://localhost:3000
```

---

## 7. Development Accounts & Portals

The database seed provides development accounts for all 8 system roles with the default password: **`DevPassword123!`**

| Portal Role | Development Email | Dashboard Route |
|---|---|---|
| **Admin** | `admin@ums.edu` | `/dashboard/admin` |
| **Student** | `student@ums.edu` | `/dashboard/student` |
| **Faculty** | `faculty@ums.edu` | `/dashboard/faculty` |
| **Parent** | `parent@ums.edu` | `/dashboard/parent` |
| **Accountant** | `accountant@ums.edu` | `/dashboard/accounts` |
| **Transport** | `transport@ums.edu` | `/dashboard/transport` |
| **Hostel** | `hostel@ums.edu` | `/dashboard/hostel` |
| **Canteen** | `canteen@ums.edu` | `/dashboard/canteen` |

---

## 8. Development Commands

| Command | Action |
|---|---|
| `pnpm build` | Compiles all packages and applications via Turborepo |
| `pnpm typecheck` | Validates TypeScript strict mode across all workspaces |
| `pnpm lint` | Runs ESLint rules across all workspaces |
| `pnpm test` | Runs Jest unit and integration tests |
| `pnpm db:studio` | Opens Prisma Studio GUI at `http://localhost:5555` |
| `pnpm format` | Auto-formats code with Prettier |

---

## 9. API Documentation

- **Interactive Swagger Docs**: `http://localhost:5000/api/docs`
- **Health Check Endpoint**: `http://localhost:5000/api/v1/health`
- **Full Architecture & ER Diagrams**: Available inside `/docs` directory.

---

## 10. Contribution Guidelines

1. Ensure all code passes `pnpm typecheck` and `pnpm lint`.
2. Adhere to the layered architecture (`Route -> Controller -> Service -> Repository -> Prisma`).
3. Never commit secrets, real credentials, or `.env` files.
