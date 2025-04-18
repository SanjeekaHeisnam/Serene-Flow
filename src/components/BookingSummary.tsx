
import React from 'react';
import { format } from 'date-fns';
import { CheckCircle, Calendar, Clock, Activity, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface BookingSummaryProps {
  service: string | null;
  date: Date | undefined;
  time: string | null;
  specialist?: string | null;
  onConfirm: () => void;
  onEdit: () => void;
}

const getServiceName = (serviceId: string) => {
  const services: Record<string, string> = {
    spa: 'Spa Treatment',
    yoga: 'Yoga Session',
    therapy: 'Therapy Session',
    meditation: 'Meditation Session',
  };
  return services[serviceId] || serviceId;
};

const getSpecialistName = (specialistId: string) => {
  const specialists: Record<string, string> = {
    emma: 'Emma Johnson',
    michael: 'Michael Chen',
    sarah: 'Sarah Williams',
    david: 'David Patel',
  };
  return specialists[specialistId] || specialistId;
};

const BookingSummary = ({ service, date, time, specialist, onConfirm, onEdit }: BookingSummaryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto px-4 py-8"
    >
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-light text-gray-800 mb-2">Booking Summary</h2>
          <p className="text-gray-500">Review your appointment details</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <Activity className="h-5 w-5 text-wellness-teal mr-3" />
            <div>
              <p className="text-sm text-gray-500">Service</p>
              <p className="font-medium text-gray-800">{service ? getServiceName(service) : 'No service selected'}</p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <Calendar className="h-5 w-5 text-wellness-teal mr-3" />
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium text-gray-800">
                {date ? format(date, 'EEEE, MMMM do, yyyy') : 'No date selected'}
              </p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <Clock className="h-5 w-5 text-wellness-teal mr-3" />
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <p className="font-medium text-gray-800">{time || '10:00 AM'}</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <User className="h-5 w-5 text-wellness-teal mr-3" />
            <div>
              <p className="text-sm text-gray-500">Specialist</p>
              <p className="font-medium text-gray-800">{specialist ? getSpecialistName(specialist) : 'No specialist selected'}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            className="border-gray-300 hover:bg-gray-100 hover:text-gray-800 transition-colors"
            onClick={onEdit}
          >
            Edit Booking
          </Button>
          
          <Button
            className="bg-wellness-teal hover:bg-wellness-teal/90 text-white transition-colors"
            onClick={onConfirm}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Confirm Booking
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingSummary;
