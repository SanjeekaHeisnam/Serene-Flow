
import React from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface TimeSelectionProps {
  selectedDate: Date | undefined;
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
}

// Sample available time slots
const generateTimeSlots = (date: Date | undefined) => {
  if (!date) return [];
  
  // In a real app, these would be fetched from a backend based on availability
  const baseSlots = [
    '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'
  ];
  
  // Simulate some slots being unavailable on certain days
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0) { // Sunday
    return baseSlots.filter((_, i) => i % 3 !== 0);
  } else if (dayOfWeek === 6) { // Saturday
    return baseSlots.filter((_, i) => i % 2 !== 0);
  }
  
  return baseSlots;
};

const TimeSelection = ({ selectedDate, selectedTime, onTimeSelect }: TimeSelectionProps) => {
  const availableTimeSlots = generateTimeSlots(selectedDate);

  if (!selectedDate) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto px-4 py-8"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-light text-gray-800 mb-2">Select a Time</h2>
        <p className="text-gray-500">
          Available time slots for {format(selectedDate, 'EEEE, MMMM do')}
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-center mb-6 text-wellness-teal">
          <Clock className="h-5 w-5 mr-2" />
          <span className="font-medium">Available Times</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {availableTimeSlots.map((time) => (
            <motion.button
              key={time}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "py-3 px-4 rounded-lg text-center transition-colors",
                selectedTime === time
                  ? "bg-wellness-teal text-white"
                  : "bg-gray-50 hover:bg-wellness-teal/10 text-gray-700"
              )}
              onClick={() => onTimeSelect(time)}
            >
              {time}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TimeSelection;
