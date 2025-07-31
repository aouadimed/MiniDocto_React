# Appointments Feature 📅

A comprehensive appointments management system for doctors to view and manage patient appointments.

## Features

### 🏥 **Appointment Management**
- **View all appointments** with patient details
- **Filter by status** (Pending, Confirmed, Completed, Cancelled)
- **Date range filtering** for specific time periods
- **Status updates** for appointment management
- **Pagination** for large appointment lists

### 📊 **Rich Data Display**
- **Patient information** (name, email, initials avatar)
- **Appointment timing** (date, time, duration)
- **Status badges** with color coding
- **Relative time** (e.g., "2 hours ago")
- **Action buttons** for status changes

### 🎨 **User Experience**
- **Dark mode support** throughout
- **Loading states** with animations
- **Error handling** with toast notifications
- **Responsive design** for all devices
- **Quick filter buttons** (Today, Tomorrow, Next 7 Days)

## API Integration

### Endpoint
- **GET** `/appointments/doctor/me?page=0&size=20`
- **PATCH** `/appointments/{id}/status` (for status updates)

### Response Structure
```typescript
{
  "success": true,
  "message": "Doctor appointments retrieved successfully",
  "appointments": [...],
  "totalCount": 25,
  "pagination": {
    "currentPage": 0,
    "pageSize": 10,
    "totalPages": 3,
    "totalItems": 25,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

## Components

### 📋 **AppointmentsTable**
- Displays appointments in a card-based layout
- Patient avatars with initials
- Status badges with appropriate colors
- Action buttons for status management
- Loading skeleton states

### 🔍 **AppointmentFilters**
- Status dropdown filter
- Date range picker (From/To)
- Page size selector
- Quick filter buttons
- Clear filters functionality

### 📄 **PaginationControls**
- Previous/Next navigation
- Page number buttons with ellipsis
- Results count display
- Mobile-responsive design

### 🎣 **useAppointments Hook**
- Fetches appointments data
- Handles pagination state
- Manages loading and error states
- Updates appointment status
- Provides refresh functionality

## Usage

```typescript
// Import the feature
import { AppointmentsRoutes } from './features/appointments';

// Use in routing
<Route path="/appointments/*" element={<AppointmentsRoutes />} />

// Or use components directly
import { AppointmentsTable, useAppointments } from './features/appointments';

const MyComponent = () => {
  const { appointments, loading } = useAppointments();
  
  return (
    <AppointmentsTable 
      appointments={appointments} 
      loading={loading}
      onStatusChange={handleStatusChange}
    />
  );
};
```

## File Structure

```
src/features/appointments/
├── api/
│   ├── appointmentsApi.ts      # API service layer
│   └── index.ts                # API exports
├── components/
│   ├── AppointmentsTable.tsx   # Main table component
│   ├── PaginationControls.tsx  # Pagination UI
│   ├── AppointmentFilters.tsx  # Filter controls
│   └── index.ts                # Component exports
├── hooks/
│   ├── useAppointments.ts      # Main hook
│   └── index.ts                # Hook exports
├── pages/
│   ├── AppointmentsPage.tsx    # Main page
│   └── index.ts                # Page exports
├── types/
│   └── index.ts                # TypeScript definitions
├── routes.tsx                  # Feature routing
└── index.ts                    # Feature exports
```

## Status Workflow

1. **PENDING** → Can be **CONFIRMED** or **CANCELLED**
2. **CONFIRMED** → Can be **COMPLETED**
3. **COMPLETED** → Final state
4. **CANCELLED** → Final state

## Statistics Dashboard

The page includes real-time statistics:
- **Total appointments** count
- **Current page** item count
- **Page information** (X of Y)
- **Items per page** setting

This feature provides a complete appointment management solution with modern UX patterns and comprehensive functionality! 🚀
