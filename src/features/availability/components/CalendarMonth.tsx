import React from 'react';
import Calendar from 'react-calendar';
import { isSameDay } from '../utils/calendarUtils';
import { CalendarContainer } from '../styles/calendarStyles';

interface CalendarMonthProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  activeStartDate: Date;
  className?: string;
}

export default function CalendarMonth({
  selectedDate,
  onDateChange,
  activeStartDate,
  className = "react-calendar w-full max-w-[360px]"
}: CalendarMonthProps) {
  return (
<CalendarContainer>
    <Calendar
      locale="en-US"
      value={selectedDate}
      onChange={date => {
        if (!date) return;
        if (Array.isArray(date)) onDateChange(date[0] ?? selectedDate);
        else onDateChange(date as Date);
      }}
      tileClassName={({ date }) =>
        isSameDay(date, selectedDate)
          ? 'bg-indigo-200 dark:bg-indigo-700 font-semibold text-indigo-800 dark:text-white rounded-lg'
          : ''
      }
      minDetail="month"
      prevLabel={null}
      nextLabel={null}
      prev2Label={null}
      next2Label={null}
      showFixedNumberOfWeeks={true}
      className={className}
      minDate={new Date()}
      activeStartDate={activeStartDate}
    />
    </CalendarContainer>

  );
} 