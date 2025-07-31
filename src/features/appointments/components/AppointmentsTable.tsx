import React from 'react';
import { Appointment } from '../types';
import { formatDistanceToNow, format } from 'date-fns';

interface AppointmentsTableProps {
  appointments: Appointment[];
  loading?: boolean;
  onStatusChange?: (appointmentId: string, status: string) => void;
}

const StatusBadge: React.FC<{ status: Appointment['status'] }> = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

const AppointmentsTable: React.FC<AppointmentsTableProps> = ({ 
  appointments, 
  loading, 
  onStatusChange 
}) => {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: format(date, 'MMM dd, yyyy'),
      time: format(date, 'HH:mm'),
      relative: formatDistanceToNow(date, { addSuffix: true })
    };
  };

  const handleStatusChange = (appointmentId: string, newStatus: string) => {
    if (onStatusChange) {
      onStatusChange(appointmentId, newStatus);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-b border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No appointments</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          You don't have any appointments scheduled yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {appointments.map((appointment) => {
          const startTime = formatDateTime(appointment.startTime);
          const endTime = formatDateTime(appointment.endTime);
          
          return (
            <li key={appointment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {appointment.patientName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {appointment.patientName}
                        </p>
                        <StatusBadge status={appointment.status} />
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {appointment.patientEmail}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {startTime.date}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {startTime.time} - {endTime.time}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      {startTime.relative}
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Duration: {((new Date(appointment.endTime).getTime() - new Date(appointment.startTime).getTime()) / (1000 * 60))} minutes
                    </p>
                  </div>
                  
                  {appointment.status === 'PENDING' && onStatusChange && (
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 space-x-2">
                      <button
                        onClick={() => handleStatusChange(appointment.id, 'CONFIRMED')}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-xs font-medium transition-colors"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleStatusChange(appointment.id, 'CANCELLED')}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  
                  {appointment.status === 'CONFIRMED' && onStatusChange && (
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <button
                        onClick={() => handleStatusChange(appointment.id, 'COMPLETED')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs font-medium transition-colors"
                      >
                        Mark Complete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AppointmentsTable;
