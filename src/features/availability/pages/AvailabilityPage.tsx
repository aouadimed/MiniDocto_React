import React, { useEffect, useState, useRef, useCallback } from 'react';
import AvailabilityCalendar from '../components/AvailabilityCalendar';
import { getAvailabilityForDate, updateAvailability, Slot } from '../api/availabilityApi';
import toast, { Toaster } from 'react-hot-toast';
import { Sidebar } from '../../../shared/components';
import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '../../../assets/loading.json';
import { Topbar } from '../../../shared/components';
import { getNextMonthDate, getPreviousMonthDate } from '../utils/calendarUtils'; // Import calendar utils

const SaveBar: React.FC<{ saving: boolean; onSave: () => void }> = ({ saving, onSave }) => (
    <button
      className="flex items-center gap-2 px-6 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-400 disabled:opacity-60"
      onClick={onSave}
      disabled={saving}
      aria-busy={saving}
    >
      {saving && (
        <svg
          className="animate-spin h-5 w-5 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      )}
      Save Changes
    </button>
);

const AvailabilityPage: React.FC = () => {
  // Confirm dialog state
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  // Show save confirmation, but require at least one add or delete
  const handleSaveClick = () => {
    if (!hasChanges) {
      toast.error('Please add or remove at least one slot before saving.');
      return;
    }
    setShowSaveConfirm(true);
  };

  // State for slots
  const [originalSlots, setOriginalSlots] = useState<Slot[]>([]);
  const [pendingSlots, setPendingSlots] = useState<Slot[]>([]);
  const [removedSlotIds, setRemovedSlotIds] = useState<string[]>([]);
  
  // State for UI
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  // State for calendar
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });
  const [calendarStartDate, setCalendarStartDate] = useState<Date>(() => {
    const today = new Date();
    today.setDate(1);
    today.setHours(0, 0, 0, 0);
    return today;
  });

  // Derived state
  const isOriginalSlot = useCallback((id: string) => originalSlots.some(s => s.id === id), [originalSlots]);
  const isPendingSlot = useCallback((id: string) => pendingSlots.some(s => s.id === id), [pendingSlots]);

  // Effects
  useEffect(() => {
    setHasChanges(pendingSlots.length > 0 || removedSlotIds.length > 0);
  }, [pendingSlots, removedSlotIds]);

  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true);
      try {
        // Format date as YYYY-MM-DD in local time to avoid timezone issues
        const dateString = selectedDate.toLocaleDateString('en-CA'); // 'en-CA' gives 'YYYY-MM-DD'
        const slots = await getAvailabilityForDate(dateString);
        setOriginalSlots(slots);
      } catch (error) {
        toast.error('Failed to fetch availability.');
      } finally {
        setLoading(false);
      }
    };
    fetchSlots();
  }, [selectedDate]); // Refetch when the date changes

  // Handlers for calendar controls
  const handleDateChange = (date: Date) => {
    if (hasChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to switch dates? Your changes will be lost.')) {
        setSelectedDate(date);
        setPendingSlots([]);
        setRemovedSlotIds([]);
      }
    } else {
      setSelectedDate(date);
    }
  };
  const goToPrevMonth = () => setCalendarStartDate(prev => getPreviousMonthDate(prev, 1));
  const goToNextMonth = () => setCalendarStartDate(prev => getNextMonthDate(prev));

  // Handlers for slot management
  const handleAddSlot = useCallback(
    (slot: Slot) => {
      const id = slot.id;
      if (!id) {
        toast.error('Slot ID is missing');
        return;
      }
      if (isOriginalSlot(id) && removedSlotIds.includes(id)) {
        setRemovedSlotIds(prev => prev.filter(rid => rid !== id));
        toast.success('Slot re-added');
        return;
      }
      if (isOriginalSlot(id) || isPendingSlot(id)) {
        return;
      }
      setPendingSlots(prev => [...prev, slot]);
    },
    [isOriginalSlot, isPendingSlot, removedSlotIds]
  );

  const handleRemoveSlot = useCallback(
    (id: string) => {
      if (isPendingSlot(id)) {
        setPendingSlots(prev => prev.filter(s => s.id !== id));
        return;
      }
      if (isOriginalSlot(id) && !removedSlotIds.includes(id)) {
        setRemovedSlotIds(prev => [...prev, id]);
      }
    },
    [isPendingSlot, isOriginalSlot, removedSlotIds]
  );
  
  // Handlers for save and cancel
  const handleSave = useCallback(async () => {
    setSaving(true);
    const payload = {
      addedSlots: pendingSlots,
      removedSlots: originalSlots.filter(slot => removedSlotIds.includes(slot.id)),
    };

    try {
      await updateAvailability(payload);
      toast.success('Availability saved successfully!');
      
      // Refetch data for the current date to get the updated state
      // Format date as YYYY-MM-DD in local time, matching initial fetch
      const dateString = selectedDate.toLocaleDateString('en-CA');
      const slots = await getAvailabilityForDate(dateString);
      setOriginalSlots(slots);
      // Clear local edits after fresh data arrives
      setPendingSlots([]);
      setRemovedSlotIds([]);

    } catch (error) {
      toast.error('Failed to save availability.');
    } finally {
      setSaving(false);
    }
  }, [pendingSlots, removedSlotIds, originalSlots, selectedDate]);

  const handleCancel = useCallback(() => {
    setPendingSlots([]);
    setRemovedSlotIds([]);
    toast('Changes canceled', { icon: '❌' });
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="h-full overflow-y-auto p-6">
          <Toaster position="top-right" toastOptions={{ className: 'text-sm' }} />
          {!loading && (
            <div className="w-full px-4 py-6">
              <AvailabilityCalendar
                slots={originalSlots} // Pass original slots from state
                pendingSlots={pendingSlots}
                removedSlotIds={removedSlotIds}
                onAddSlot={handleAddSlot}
                onRemoveSlot={handleRemoveSlot}
                onCancel={handleCancel}
                onSave={handleSaveClick}
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
                activeStartDate={calendarStartDate}
                onPrevMonth={goToPrevMonth}
                onNextMonth={goToNextMonth}
              />
            </div>
          )}
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <Player src={loadingAnimation} loop autoplay style={{ width: '96px', height: '96px' }} className="!w-24 !h-24" />
            </div>
          )}
          {saving && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/50 dark:bg-gray-900/50">
              <Player src={loadingAnimation} loop autoplay style={{ width: '96px', height: '96px' }} className="!w-24 !h-24" />
            </div>
          )}
          {hasChanges && <SaveBar saving={saving} onSave={handleSaveClick} />}
        {/* Save confirmation modal */}
        {showSaveConfirm && (
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 max-w-md">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Confirm Save</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">Are you sure you want to save your changes?</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowSaveConfirm(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                >Cancel</button>
                <button
                  onClick={() => { setShowSaveConfirm(false); handleSave(); }}
                  className="px-4 py-2 bg-indigo-600 text-black rounded hover:bg-indigo-700"
                >Confirm</button>
              </div>
            </div>
          </div>
        )}
        </main>
      </div>
    </div>
  );
};

export default AvailabilityPage;
