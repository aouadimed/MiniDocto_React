import { Slot } from '../api/availabilityApi';

const WORKING_HOURS = { start: 8, end: 17 }; // 9am–5pm
const SLOT_INTERVAL = 30;

export function generateSlotsForDay(day: Date): Slot[] {
  const slots: Slot[] = [];
  for (let hour = WORKING_HOURS.start; hour < WORKING_HOURS.end; hour++) {
    for (let min = 0; min < 60; min += SLOT_INTERVAL) {
      const start = new Date(day);
      start.setHours(hour, min, 0, 0);
      const end = new Date(start.getTime() + SLOT_INTERVAL * 60 * 1000);
      slots.push({ id: start.toISOString(), startTime: start, endTime: end });
    }
  }
  return slots;
}

export function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function getNextMonthDate(currentDate: Date): Date {
  const nextMonth = new Date(currentDate);
  nextMonth.setMonth(nextMonth.getMonth() + 1, 1);
  return nextMonth;
}

export function getPreviousMonthDate(currentDate: Date, monthsBack: number = 2): Date {
  const prevMonth = new Date(currentDate);
  prevMonth.setMonth(prevMonth.getMonth() - monthsBack, 1);
  return prevMonth;
}

export function getNextMonthDateFromCurrent(currentDate: Date, monthsForward: number = 2): Date {
  const nextMonth = new Date(currentDate);
  nextMonth.setMonth(nextMonth.getMonth() + monthsForward, 1);
  return nextMonth;
} 