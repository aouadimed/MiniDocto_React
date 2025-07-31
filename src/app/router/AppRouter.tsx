import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../../shared/layout';
import { AuthRoutes } from '../../features/auth';
import { DashboardRoutes } from '../../features/dashboard';
import { AvailabilityRoutes } from '../../features/availability';
import { AppointmentsRoutes } from '../../features/appointments';

const AppRouter: React.FC = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Navigate to="/login" replace />} />
      <Route path="/*" element={<AuthRoutes />} />
      <Route path="/dashboard/*" element={<DashboardRoutes />} />
      <Route path="/availability/*" element={<AvailabilityRoutes />} />
      <Route path="/appointments/*" element={<AppointmentsRoutes />} />
    </Route>
  </Routes>
);

export default AppRouter;
