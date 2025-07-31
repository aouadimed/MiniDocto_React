import React from 'react';
import { Sidebar, Topbar } from '@/shared/components';
import { StatCard, RevenueChart, TrafficChart, ClientTable } from '../components';

const DashboardPage: React.FC = () => (
  <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Topbar title="Dashboard" />
      <main className="h-full overflow-y-auto p-6">
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <StatCard 
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857" />
                <path d="M9 20H4v-2a3 3 0 015.356-1.857" />
                <path d="M15 11a4 4 0 10-8 0 4 4 0 008 0z" />
              </svg>
            } 
            label="Total Patients" 
            value="1,234" 
            growth="+3%" 
            growthPositive 
          />
          <StatCard 
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M3 3v18h18" />
                <path d="M9 17V9a3 3 0 016 0v8" />
              </svg>
            } 
            label="Revenue" 
            value="$12,000" 
            growth="+5%" 
            growthPositive 
          />
          <StatCard 
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M12 8v4l3 3" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            } 
            label="Pending Appointments" 
            value="23" 
            growth="-2%" 
          />
          <StatCard 
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            } 
            label="Today's Appointments" 
            value="8" 
            growth="+1%" 
            growthPositive 
          />
        </div>
        <div className="grid gap-6 mb-8 md:grid-cols-2">
          <RevenueChart />
          <TrafficChart />
        </div>
        <div className="mb-8">
          <ClientTable />
        </div>
      </main>
    </div>
  </div>
);

export default DashboardPage;
