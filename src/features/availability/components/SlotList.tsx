import React from 'react';
import { Slot } from '../api/availabilityApi';

// Determine visual state of slots
function getSlotState(
  slot: Slot,
  originalSlots: Slot[],
  pendingSlots: Slot[],
  removedSlotIds: string[]
) {
  const isOriginal = originalSlots.some(
    o => o.startTime.getTime() === slot.startTime.getTime()
  );
  const isPending = pendingSlots.some(s => s.id === slot.id);
  const isRemoved = removedSlotIds.includes(slot.id);
  if (isOriginal && isRemoved) return 'red';
  if (isOriginal && !isRemoved) return 'green';
  if (isPending) return 'green';
  return 'gray';
}

interface SlotListProps {
  slots: Slot[];
  originalSlots?: Slot[];
  pendingSlots?: Slot[];
  removedSlotIds?: string[];
  onRemove: (id: string) => void;
  emptyState?: React.ReactNode;
}

const formatSlot = (slot: Slot) => {
  const day = slot.startTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
  const startTime = slot.startTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const endTime = slot.endTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${day}, ${startTime} - ${endTime}`;
};

const SlotList: React.FC<SlotListProps> = ({ slots, onRemove, emptyState, originalSlots, pendingSlots, removedSlotIds }) => (
  <div className="bg-white dark:bg-gray-800 shadow p-4 mt-4 rounded-lg">
    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Your Availability Slots</h2>

    {slots.length === 0 && emptyState ? (
      emptyState
    ) : slots.length === 0 ? (
      <div className="text-gray-500 dark:text-gray-400">No slots selected.</div>
    ) : (
      <div className="flex flex-wrap gap-4">
        {slots.map(slot => {
          // derive state, defaulting arrays to empty
          const state = getSlotState(
            slot,
            originalSlots || [],
            pendingSlots || [],
            removedSlotIds || []
          );
          let bg = 'bg-gray-200 text-gray-700 border border-gray-400';
          if (state === 'green') bg = 'bg-green-500 text-black border border-green-600';
          if (state === 'red') bg = 'bg-red-500 text-black border border-red-600';
          return (
          <div
            key={slot.id}
            className={`w-full sm:w-[300px] flex items-center justify-between ${bg} px-4 py-3 rounded-full`}
           >
             <span className="text-sm font-mono whitespace-nowrap min-w-[210px] truncate">
               {formatSlot(slot)}
             </span>
             <button
              className="ml-3 p-1 focus:outline-none focus:ring focus:ring-purple-400 rounded-full transition-colors hover:opacity-80"
               onClick={() => onRemove(slot.id)}
               aria-label={`Remove slot for ${formatSlot(slot)}`}>
               <span role="img" aria-label="Delete" className="text-xs">🗑️</span>
             </button>
           </div>
         );
         })}
      </div>
    )}
  </div>
);

export default SlotList;
