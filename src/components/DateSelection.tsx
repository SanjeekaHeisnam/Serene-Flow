
import React from 'react';
import { format, addDays, isSameDay } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { CalendarIcon } from 'lucide-react';

interface DateSelectionProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
}

const DateSelection = ({ selectedDate, onDateSelect }: DateSelectionProps) => {
  // Disable past dates and dates too far in the future
  const disabledDays = {
    before: new Date(),
    after: addDays(new Date(), 60),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto px-4 py-8"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-light text-gray-800 mb-2">Select a Date</h2>
        <p className="text-gray-500">Choose your preferred appointment date</p>
      </div>

      <div className="flex justify-center">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-center mb-4 text-wellness-teal">
            <CalendarIcon className="h-5 w-5 mr-2" />
            <span className="font-medium">
              {selectedDate ? format(selectedDate, 'MMMM yyyy') : 'Select a date'}
            </span>
          </div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateSelect}
            disabled={disabledDays}
            className={cn("rounded-md border-none pointer-events-auto")}
            classNames={{
              day_selected: "bg-wellness-teal text-white hover:bg-wellness-teal hover:text-white focus:bg-wellness-teal focus:text-white",
              day_today: "bg-wellness-lightBlue/20 text-wellness-teal",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default DateSelection;
