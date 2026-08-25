# Enterprise HRMS Frontend Development Guide

**Version:** 1.0.0  
**Project Type:** Enterprise HRMS & Project Management Dashboard

---

## UI Reference

| HR Dashboard | Modern Dashboard |
|--------------|------------------|
| ![HR Platform](https://images.openai.com/static-rsc-4/FW3tPwT-UdGOUnoo4HEIp1fXIDmcMSewkniqo5F4CmECPiUzlpwpyJ-e_3D_qdl7AbL_7x0WlpApyd9scHoMZacHwVVUFcci7mGO9wQVdIS6_85YCBoxBZNl430gj02075rvR653yP70vTfW4PEOnUUNhOg3AJMn9dKWTnLeKbg?purpose=inline) | ![Modern Dashboard](https://images.openai.com/static-rsc-4/X8PwpWpOulvZEwefYymDePT2BYbPpziDYSVfPNkbaQzaZT4ahalPjMmHKAopVJ0JBHs4Ga88hVtyOg-vK-w1KaUXEJTPPw-MaOcWPo479fARpYyTNco813OmIoEHA8df4CIPLL1UH-WD7nVXKikQOvwU8NChQV5k9PvZC8YAgnM?purpose=inline) |

---

# Table of Contents

1. Project Overview
2. Tech Stack
3. Folder Structure
4. Frontend Architecture
5. Routing Strategy
6. State Management
7. Feature-Based Structure
8. Design System
9. API Integration
10. Authentication Flow
11. Form Standards
12. Error Handling
13. Coding Standards
14. Performance Standards
15. Deployment
16. Environment Variables
17. Development Checklist
18. Frontend Workflow

---

# Project Overview

The frontend is a **React-based Enterprise HRMS Dashboard** responsible for handling all user interactions across the application.

## Responsibilities

- Authentication UI
- Dashboard
- Employee Management
- Attendance
- Leave Management
- Project Management
- Task Management
- Payroll
- Recruitment
- Reports
- Settings

## Core Principles

- Feature-first architecture
- Reusable UI components
- Clean separation of concerns
- Responsive-first development
- Dark mode support
- Minimal prop drilling

---

# Tech Stack

| Layer | Technology |
|--------|------------|
| Framework | React 19 |
| Language | JavaScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router DOM |
| Global State | Zustand |
| Server State | TanStack Query |
| Forms | React Hook Form |
| Charts | Recharts |
| Icons | Lucide React |

---

# Folder Structure

```text
frontend/
├── public/
│
├── src/
│   ├── app/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── router.jsx
│   │
│   ├── layouts/
│   │   ├── DashboardLayout.jsx
│   │   ├── AuthLayout.jsx
│   │   └── BlankLayout.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard/
│   │   ├── Employees/
│   │   ├── Projects/
│   │   ├── Attendance/
│   │   ├── Leave/
│   │   ├── Payroll/
│   │   ├── Recruitment/
│   │   ├── Reports/
│   │   └── Settings/
│   │
│   ├── features/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── store/
│   ├── utils/
│   ├── constants/
│   ├── assets/
│   └── styles/
│
├── .env
├── vite.config.js
└── package.json
```

---

# Feature-Based Structure

Each feature owns its own logic, components, validation, and API calls.

## Example

```text
features/
attendance/
├── api.js
├── hooks.js
├── validation.js
├── AttendanceCard.jsx
├── AttendanceTable.jsx
└── AttendancePage.jsx
```

### Why?

- Easier maintenance
- Better scalability
- Reduced coupling
- Clear ownership

---

# Frontend Architecture

```text
React App (Vite)

├── Pages
├── Layouts
├── Components
├── Features
│
└── State Layer
     ├── Zustand
     └── TanStack Query
            │
            ▼
       API Layer
            │
            ▼
     Backend REST API
```

---

# Routing Strategy

| Route | Access |
|--------|--------|
| `/login` | Public |
| `/dashboard` | Authenticated |
| `/employees` | Admin |
| `/attendance` | Employee |
| `/projects` | Team |
| `/tasks` | Assigned User |
| `/payroll` | HR |
| `/settings` | Authenticated |

## Route Flow

```text
Public Route
      │
      ▼
Protected Route
      │
      ▼
Role Check
      │
      ▼
Page Access
```

---

# State Management

The application uses:

- **Zustand** → UI & Global State
- **TanStack Query** → Server Data

## Store Structure

```text
store/
├── authStore.js
├── themeStore.js
├── sidebarStore.js
├── notificationStore.js
└── userStore.js
```

## Example Store

```javascript
import { create } from "zustand";

const useThemeStore = create((set) => ({
  darkMode: false,

  toggleTheme: () =>
    set((state) => ({
      darkMode: !state.darkMode,
    })),
}));

export default useThemeStore;
```

---

# TanStack Query Standards

Every API endpoint gets its own hook.

```text
hooks/
├── useEmployees.js
├── useProjects.js
└── useAttendance.js
```

**Rule:** Never fetch data directly inside components.

❌ Wrong

```javascript
useEffect(() => {
  fetch("/employees");
}, []);
```

✅ Correct

```javascript
const { data } = useEmployees();
```

---

# Design System

## Color Tokens

| Token | Value |
|--------|-------|
| Primary | Indigo |
| Success | Emerald |
| Warning | Amber |
| Danger | Red |

## Spacing Scale

| Token | Size |
|--------|------|
| XS | 4px |
| SM | 8px |
| MD | 16px |
| LG | 24px |
| XL | 32px |

## Component Requirements

Every reusable component must support:

- Loading State
- Error State
- Empty State
- Hover State
- Dark Mode
- Keyboard Navigation
- Focus States
- Accessibility

---

# API Integration

Never call `fetch()` directly inside UI components.

## API Flow

```text
Component
    │
    ▼
Custom Hook
    │
    ▼
Service
    │
    ▼
Axios Instance
    │
    ▼
Backend
```

## Service Structure

```text
services/
├── api.js
├── employeeService.js
├── attendanceService.js
└── projectService.js
```

---

# Authentication Flow

```text
Login
  │
  ▼
JWT Token
  │
  ▼
Zustand Auth Store
  │
  ▼
Protected Routes
```

Authentication uses:

- JWT Access Token
- Axios Interceptors
- Route Guards
- Role-based Access Control

---

# Form Standards

Every form follows the same lifecycle.

```text
Form
 ↓
Validation
 ↓
API Call
 ↓
Success Toast
 ↓
Refresh Data
```

## Example Structure

```text
EmployeeForm/
├── EmployeeForm.jsx
└── employeeValidation.js
```

---

# Error Handling

Every screen must implement four UI states.

| State | Required |
|--------|----------|
| Loading | Spinner |
| Success | Content |
| Empty | Illustration |
| Error | Retry Button |

---

# Coding Standards

## Naming Convention

| Item | Convention |
|------|------------|
| Component | PascalCase |
| Hook | `useSomething` |
| Store | `somethingStore` |
| Constant | `UPPER_CASE` |

## Rules

- No inline business logic
- No duplicate components
- Maximum component size ≈250 lines
- Extract reusable logic into custom hooks
- Prefer composition over prop drilling

---

# Performance Standards

| Metric | Target |
|--------|---------|
| First Paint | Fast |
| Lazy Loading | Enabled |
| Code Splitting | Enabled |
| Optimized Images | Required |
| Memoization | Where Needed |

### Performance Practices

- React Lazy
- Suspense
- Route-based code splitting
- TanStack Query caching
- Memoized components

---

# Deployment

```text
GitHub
   │
   ▼
GitHub Actions
   │
   ▼
Vercel
   │
   ▼
Production
```

---

# Environment Variables

```env
VITE_API_URL=
VITE_ENV=
VITE_APP_NAME=
```

---

# Development Checklist

Before merging any feature:

- [ ] Responsive design
- [ ] Dark mode works
- [ ] API integrated
- [ ] Loading state
- [ ] Error state
- [ ] Empty state
- [ ] Toast notifications
- [ ] Accessibility checked
- [ ] Code reviewed
- [ ] Tests passed

---

# Frontend Workflow

Recommended implementation order:

1. Authentication
2. Dashboard Layout
3. Shared Components
4. Employee Module
5. Attendance
6. Leave
7. Projects
8. Tasks
9. Payroll
10. Recruitment
11. Reports
12. Settings

---

# Project Standards Summary

### Architecture

- Feature-first
- Modular
- Scalable

### State

- Zustand for UI
- TanStack Query for server state

### Styling

- Tailwind CSS
- Responsive-first
- Dark mode

### Forms

- React Hook Form
- Centralized validation

### API

- Axios
- Service Layer
- Custom Hooks

### Deployment

- GitHub
- GitHub Actions
- Vercel

This documentation serves as the official frontend development guide for the **HRIVO Enterprise HRMS & Project Management Dashboard**, ensuring consistent architecture, coding standards, UI behavior, and scalable development practices across the entire frontend team.