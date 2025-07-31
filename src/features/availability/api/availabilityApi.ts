import axiosClient from '../../../shared/services/axiosClient';

// Renamed to match API response
export interface AvailabilitySlot {
  id: string;
  startTime: Date;
  endTime: Date;
}

// 1. Fetch availability for a specific date
export async function getAvailabilityForDate(date: string): Promise<AvailabilitySlot[]> {
  try {
    const response = await axiosClient.get('/availability/my-slots', {
      params: { date },
    });
    // Assuming the API returns slot objects with date strings
    return response.data.map((slot: any) => ({
      ...slot,
      startTime: new Date(slot.startTime),
      endTime: new Date(slot.endTime),
    }));
  } catch (error) {
    console.error('Failed to fetch availability:', error);
    throw error;
  }
}

// 2. Update availability (add/remove slots)
interface UpdateAvailabilityPayload {
  addedSlots: AvailabilitySlot[];
  removedSlots: AvailabilitySlot[];
}

export async function updateAvailability(payload: UpdateAvailabilityPayload): Promise<void> {
  try {
    // Remove id from addedSlots
    const addedSlots = payload.addedSlots.map(({ startTime, endTime }) => ({
      startTime,
      endTime,
    }));
    // Only send id for removedSlots
    const removedSlots = payload.removedSlots.map(({ id }) => ({ id }));

    await axiosClient.post('/availability/update', { addedSlots, removedSlots });
  } catch (error) {
    console.error('Failed to update availability:', error);
    throw error;
  }
}

export type { UpdateAvailabilityPayload };
// Keep Slot for backward compatibility in other components
export type Slot = AvailabilitySlot; 