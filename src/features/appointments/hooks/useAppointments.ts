import { useState, useEffect, useCallback } from 'react';
import { appointmentsApi } from '../api';
import { Appointment, AppointmentsParams, Pagination } from '../types';
import toast from 'react-hot-toast';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async (params: AppointmentsParams = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await appointmentsApi.getDoctorAppointments(params);
      
      if (response.success) {
        setAppointments(response.appointments);
        setPagination(response.pagination);
      } else {
        throw new Error(response.message || 'Failed to fetch appointments');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch appointments';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAppointmentStatus = useCallback(async (appointmentId: string, status: string) => {
    try {
      await appointmentsApi.updateAppointmentStatus(appointmentId, status);
      
      // Update local state
      setAppointments(prev => 
        prev.map(appointment => 
          appointment.id === appointmentId 
            ? { ...appointment, status: status as any, updatedAt: new Date().toISOString() }
            : appointment
        )
      );
      
      toast.success(`Appointment ${status.toLowerCase()} successfully`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update appointment';
      toast.error(errorMessage);
      throw err;
    }
  }, []);

  const refreshAppointments = useCallback((params?: AppointmentsParams) => {
    fetchAppointments(params);
  }, [fetchAppointments]);

  return {
    appointments,
    pagination,
    loading,
    error,
    fetchAppointments,
    updateAppointmentStatus,
    refreshAppointments
  };
};
