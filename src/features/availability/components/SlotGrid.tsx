import React from 'react';
import { Slot } from '../api/availabilityApi';

interface SlotGridProps {
  slots: Slot[];
  originalSlots: Slot[];
  pendingSlots: Slot[];
  removedSlotIds: string[];
  onAddSlot: (slot: Slot) => void;
  onRemoveSlot: (id: string) => void;
  selectedDate: Date;
  onCancel: () => void;
  onSave: () => void; 
}

function getSlotState(
  slot: Slot,
  originalSlots: Slot[],
  pendingSlots: Slot[],
  removedSlotIds: string[]
) {
  const matchingOriginal = originalSlots.find(
    o => o.startTime.getTime() === slot.startTime.getTime()
  );
  const isOriginal = Boolean(matchingOriginal);
  const isPending = pendingSlots.some(s => s.id === slot.id);
  const isRemoved = matchingOriginal
    ? removedSlotIds.includes(matchingOriginal.id)
    : false;
  if (isOriginal && isRemoved) return 'red';
  if (isOriginal && !isRemoved) return 'green';
  if (isPending) return 'green';
  return 'gray';
}

function isSlotDisabled(slot: Slot, selectedDate: Date) {
  const now = new Date();
  if (
    selectedDate.getFullYear() === now.getFullYear() &&
    selectedDate.getMonth() === now.getMonth() &&
    selectedDate.getDate() === now.getDate()
  ) {
    return slot.endTime <= now;
  }
  return false;
}

function groupSlots(slots: Slot[]) {
  const morning: Slot[] = [];
  const afternoon: Slot[] = [];
  slots.forEach(slot => {
    const hour = new Date(slot.startTime).getHours();
    if (hour < 12) morning.push(slot);
    else afternoon.push(slot);
  });
  return { morning, afternoon };
}

export default function SlotGrid({
  slots,
  originalSlots,
  pendingSlots,
  removedSlotIds,
  onAddSlot,
  onRemoveSlot,
  selectedDate,
  onCancel,
  onSave,
}: SlotGridProps) {
  if (slots.length === 0) {
    return (
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        No slots available for this day.
      </p>
    );
  }

  const { morning, afternoon } = groupSlots(slots);

  // Legend
  const legend = (
    <div className="flex justify-center gap-6 mb-4 text-xs font-medium">
      <span className="flex items-center gap-1">
        <span className="inline-block w-4 h-4 rounded-full bg-green-500 border border-green-600"></span>
        Green = Selected
      </span>
      <span className="flex items-center gap-1">
        <span className="inline-block w-4 h-4 rounded-full bg-red-500 border border-red-600"></span>
        Red = Will be removed
      </span>
      <span className="flex items-center gap-1">
        <span className="inline-block w-4 h-4 rounded-full bg-gray-200 border border-gray-400"></span>
        Gray = Available
      </span>
    </div>
  );

  // Summary
  const selectedCount = slots.filter(slot => getSlotState(slot, originalSlots, pendingSlots, removedSlotIds) === 'green').length;
  const summary = (
    <div className="mb-4 text-center text-sm font-semibold text-indigo-700 dark:text-indigo-300">
      You have selected {selectedCount} slot{selectedCount !== 1 ? 's' : ''} for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
    </div>
  );

  // Quick Actions
  function getGroupState(group: Slot[]) {
    const enabledSlots = group.filter(slot => !isSlotDisabled(slot, selectedDate));
    if (enabledSlots.length === 0) return 'empty';
    const anyGreen = enabledSlots.some(slot => getSlotState(slot, originalSlots, pendingSlots, removedSlotIds) === 'green');
    return anyGreen ? 'hasGreen' : 'allGray';
  }
  const morningState = getGroupState(morning);
  const afternoonState = getGroupState(afternoon);

  // Improved Add/Clear logic
  const handleAddGroup = (group: Slot[]) => {
    group.forEach(slot => {
      if (isSlotDisabled(slot, selectedDate)) return;
      const matchingOriginal = originalSlots.find(
        o => o.startTime.getTime() === slot.startTime.getTime()
      );
      const state = getSlotState(slot, originalSlots, pendingSlots, removedSlotIds);
      if (state === 'gray') {
        // add new pending slot
        onAddSlot(slot);
      } else if (state === 'red' && matchingOriginal) {
        // restore removed original
        onAddSlot(matchingOriginal);
      }
    });
  };
  const handleClearGroup = (group: Slot[]) => {
    group.forEach(slot => {
      if (isSlotDisabled(slot, selectedDate)) return;
      const matchingOriginal = originalSlots.find(
        o => o.startTime.getTime() === slot.startTime.getTime()
      );
      const state = getSlotState(slot, originalSlots, pendingSlots, removedSlotIds);
      if (state === 'green') {
        if (matchingOriginal) {
          // remove original slot by API id
          onRemoveSlot(matchingOriginal.id);
        } else {
          // remove pending slot
          onRemoveSlot(slot.id);
        }
      }
    });
  };

  // Slot button rendering
  function renderSlotButton(slot: Slot) {
    const state = getSlotState(slot, originalSlots, pendingSlots, removedSlotIds);
    const disabled = isSlotDisabled(slot, selectedDate);
    let bg = 'bg-gray-200 text-gray-700 border border-gray-400';
    if (state === 'green') bg = 'bg-green-500 text-black border border-green-600';
    if (state === 'red') bg =   'bg-red-500 text-black border border-red-600';
    return (
    <button
  key={slot.id}
  className={`px-4 py-2 rounded-full text-xs font-semibold transition w-28 h-10 flex items-center justify-center mb-2 mr-3 ${bg} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'} focus:outline-none`}
  disabled={disabled}
      onClick={() => {
        if (disabled) return;
        // Match the original API slot by timestamp
        const matchingOriginal = originalSlots.find(
          o => o.startTime.getTime() === slot.startTime.getTime()
        );
        const isPending = pendingSlots.some(s => s.id === slot.id);
        const removedId = matchingOriginal ? matchingOriginal.id : slot.id;
        const isRemoved = removedSlotIds.includes(removedId);
        if (matchingOriginal) {
          if (!isRemoved) {
            // Original green → mark removed (use API id)
            onRemoveSlot(matchingOriginal.id);
          } else {
            // Red → restore original
            onAddSlot(matchingOriginal);
          }
        } else {
          if (isPending) {
            // Pending green → remove pending
            onRemoveSlot(slot.id);
          } else {
            // Gray → add new pending
            onAddSlot(slot);
          }
        }
      }}
>
  <span style={{ fontFeatureSettings: '"tnum"' }}>
    {new Date(slot.startTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })}
    {' - '}
    {new Date(slot.endTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })}
  </span>
</button>

    );
  }

  return (
    <div>
       {summary}
      {legend}
      {/* Morning Group */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-sm text-gray-700 dark:text-gray-200">Morning Slot</span>
          {morning.length > 0 && (
            morningState === 'hasGreen' ? (
              <button className="text-xs px-2 py-1 rounded bg-red-100 text-red-700 font-semibold hover:bg-red-200" onClick={() => handleClearGroup(morning)}>
                Clear Morning
              </button>
            ) : (
              <button className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 font-semibold hover:bg-green-200" onClick={() => handleAddGroup(morning)}>
                Add Morning
              </button>
            )
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {morning.map(renderSlotButton)}
        </div>
      </div>
      {/* Afternoon Group */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-sm text-gray-700 dark:text-gray-200">Afternoon Slot</span>
          {afternoon.length > 0 && (
            afternoonState === 'hasGreen' ? (
              <button className="text-xs px-2 py-1 rounded bg-red-100 text-red-700 font-semibold hover:bg-red-200" onClick={() => handleClearGroup(afternoon)}>
                Clear Afternoon
              </button>
            ) : (
              <button className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 font-semibold hover:bg-green-200" onClick={() => handleAddGroup(afternoon)}>
                Add Afternoon
              </button>
            )
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {afternoon.map(renderSlotButton)}
        </div>
      </div>
      {/* Action Buttons */}
        <div className="flex justify-center items-center mb-4 w-full max-w-[360px] mx-auto">
          <button
            onClick={onCancel}
            className="flex-1 min-w-20 px-3 py-1 rounded bg-red-600 dark:bg-red-700 text-white font-semibold hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
          >
            Cancel
          </button>
          <div className="w-8"></div>
          <button
            onClick={onSave}
            className="flex-1 min-w-20 px-3 py-1 rounded bg-blue-600 dark:bg-blue-700 text-white font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
             Save
          </button>
        </div>
      
    </div>
  );
}