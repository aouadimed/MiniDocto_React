# 🏥 Mini Docto+ - Doctor Appointment Management System

A modern, professional React application for managing doctor appointments with a clean, responsive interface.

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand + Redux Toolkit
- **Routing**: React Router DOM 7
- **HTTP Client**: Axios
- **UI Components**: Custom components with Tailwind
- **Icons**: Heroicons (SVG)
- **Notifications**: React Hot Toast
- **Testing**: Vitest + React Testing Library
- **Code Quality**: ESLint + Prettier

## 📁 Project Structure

```
src/
├── features/                 # Feature-based architecture
│   ├── auth/                # Authentication feature
│   │   ├── api/             # Auth API calls
│   │   ├── components/      # Login/Signup forms
│   │   ├── hooks/           # Auth-specific hooks
│   │   ├── pages/           # Auth pages
│   │   ├── state/           # Auth state management
│   │   └── types/           # Auth TypeScript types
│   ├── appointments/        # Appointment management
│   │   ├── api/             # Appointment API calls
│   │   ├── components/      # Appointment tables, filters
│   │   ├── hooks/           # useAppointments hook
│   │   ├── pages/           # Appointment pages
│   │   └── types/           # Appointment types
│   ├── availability/        # Doctor availability
│   └── dashboard/           # Dashboard feature 
├── shared/                  # Shared resources
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx       # Custom button component
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   └── Topbar.tsx       # Top navigation bar
│   ├── constants/           # App-wide constants
│   ├── hooks/               # Shared custom hooks
│   ├── layout/              # Layout components
│   ├── services/            # API client configuration
│   ├── types/               # Global TypeScript types
│   └── utils/               # Utility functions
├── app/                     # App-level configuration
│   ├── router/              # Route definitions
│   └── store/               # Global state store
└── assets/                  # Static assets (images, icons)
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aouadimed/MiniDocto_React.git
   cd react_pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready application |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm test` | Run test suite with Vitest |

## 🔧 Development Setup

### Environment Configuration
The app is configured to work with a backend API. Update the API base URL in:
```typescript
// src/shared/services/axiosClient.ts
const API_BASE_URL = 'your-api-base-url';
```

### API Endpoints Used
- `POST /auth/doctor/login` - Doctor authentication
- `GET /appointments/doctor/me` - Get doctor's appointments
- `PATCH /appointments/{id}/status` - Update appointment status

### Code Quality
This project uses ESLint and Prettier for code quality:

```bash
# Check linting
npm run lint

# Format code
npx prettier --write .
```

## 🎯 Key Features Walkthrough

### 1. Authentication
- Navigate to `/login`
- Enter doctor credentials
- Automatic redirect to dashboard

### 2. Appointment Management
- View all patient appointments in `/appointments`

### 2. availability Management
- availability in `/availability`


### Adding New Features
1. Create feature folder in `src/features/`
2. Follow the established pattern: `api/`, `components/`, `hooks/`, `pages/`, `types/`
3. Export from feature `index.ts`
4. Add routes in `src/app/router/`

## 🧪 Testing

Run the test suite:
```bash
npm test
```
