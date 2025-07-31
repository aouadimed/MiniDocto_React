import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppointmentsPage from './pages/AppointmentsPage';

const AppointmentsRoutes: React.FC = () => (
  <Routes>
    <Route index element={<AppointmentsPage />} />
  </Routes>
);

export default AppointmentsRoutes;
