import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Slot } from '../api/availabilityApi';
import { getNextMonthDate, getPreviousMonthDate } from '../utils/calendarUtils';
import CalendarMonth from './CalendarMonth';

interface CalendarControlsProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  activeStartDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const CalendarControls: React.FC<CalendarControlsProps> = ({
  selectedDate,
  onDateChange,
  activeStartDate,
  onPrevMonth,
  onNextMonth,
}) => (
  <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center justify-center gap-2">
    <div className="flex justify-center items-center mb-4 w-full max-w-[360px] mx-auto">
      <button
        onClick={onPrevMonth}
        className="flex-1 min-w-20 px-3 py-1 rounded bg-purple-600 dark:bg-purple-700 text-white font-semibold hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
      >
        Previous
      </button>
      <div className="w-8"></div>
      <button
        onClick={onNextMonth}
        className="flex-1 min-w-20 px-3 py-1 rounded bg-purple-600 dark:bg-purple-700 text-white font-semibold hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
      >
        Next
      </button>
    </div>
    <div className="flex justify-center items-center">
      <CalendarMonth
        selectedDate={selectedDate}
        onDateChange={onDateChange}
        activeStartDate={activeStartDate}
      />
    </div>
  </div>
);

export default CalendarControls; 