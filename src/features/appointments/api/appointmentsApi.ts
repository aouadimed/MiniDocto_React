import axiosClient from '../../../shared/services/axiosClient';
import { AppointmentsResponse, AppointmentsParams } from '../types';

export const appointmentsApi = {
  // Get doctor's appointments with pagination
  getDoctorAppointments: async (params: AppointmentsParams = {}): Promise<AppointmentsResponse> => {
    const {
      page = 0,
      size = 20,
      status,
      dateFrom,
      dateTo
    } = params;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    if (status) queryParams.append('status', status);
    if (dateFrom) queryParams.append('dateFrom', dateFrom);
    if (dateTo) queryParams.append('dateTo', dateTo);

    try {
      const response = await axiosClient.get(`/appointments/doctor/me?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
      throw error;
    }
  },

  // Update appointment status
  updateAppointmentStatus: async (appointmentId: string, status: string) => {
    try {
      const response = await axiosClient.patch(`/appointments/${appointmentId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Failed to update appointment status:', error);
      throw error;
    }
  }
};
