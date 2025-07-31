import React, { useState } from 'react';
import { Slot } from '../api/availabilityApi';
import { generateSlotsForDay } from '../utils/calendarUtils';
import SlotGrid from './SlotGrid';
import CalendarControls from './CalendarControls'; // Import the new component

interface AvailabilityCalendarProps {
  slots: Slot[];
  pendingSlots: Slot[];
  removedSlotIds: string[];
  onAddSlot: (slot: Slot) => void;
  onRemoveSlot: (id: string) => void;
  onCancel: () => void;
  onSave: () => void;
  selectedDate: Date; // Now a prop
  onDateChange: (date: Date) => void; // Now a prop
  activeStartDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export default function AvailabilityCalendar({
  slots,
  pendingSlots,
  removedSlotIds,
  onAddSlot,
  onRemoveSlot,
  onCancel,
  onSave,
  selectedDate,
  onDateChange,
  activeStartDate,
  onPrevMonth,
  onNextMonth,
}: AvailabilityCalendarProps) {
  const slotsForDay = generateSlotsForDay(selectedDate);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Calendar Panel */}
      <CalendarControls
        selectedDate={selectedDate}
        onDateChange={onDateChange}
        activeStartDate={activeStartDate}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
      />

      {/* Slots Panel */}
      <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <SlotGrid
          slots={slotsForDay}
          originalSlots={slots}
          pendingSlots={pendingSlots}
          removedSlotIds={removedSlotIds}
          onAddSlot={onAddSlot}
          onRemoveSlot={onRemoveSlot}
          selectedDate={selectedDate}
          onCancel={onCancel}
          onSave={onSave}
        />
      </div>
    </div>
  );
}
