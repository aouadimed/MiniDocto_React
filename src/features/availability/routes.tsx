import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AvailabilityPage from './pages/AvailabilityPage';

const AvailabilityRoutes: React.FC = () => (
  <Routes>
    <Route index element={<AvailabilityPage />} />
  </Routes>
);

export default AvailabilityRoutes;
