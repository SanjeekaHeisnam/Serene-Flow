
import React from 'react';
import { format } from 'date-fns';
import { CheckCircle, Calendar, Clock, Activity, User, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface ConfirmationViewProps {
  service: string | null;
  date: Date | undefined;
  time: string | null;
  onBookAnother: () => void;
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

const ConfirmationView = ({ service, date, time, onBookAnother }: ConfirmationViewProps) => {
  React.useEffect(() => {
    // Trigger confetti effect on mount
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const runAnimation = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#4DB6AC', '#A8D0B6', '#B3E5FC'],
      });
      
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#4DB6AC', '#A8D0B6', '#B3E5FC'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(runAnimation);
      }
    };

    runAnimation();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto px-4 py-8"
    >
      <div className="bg-white rounded-xl p-6 shadow-sm border border-wellness-teal/30 relative">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-32 overflow-hidden rounded-t-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-wellness-teal/10 to-wellness-sage/10" />
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 text-wellness-teal/5 fill-current"
          >
            <path d="M0,0 L100,0 L100,25 C75,50 50,25 25,50 L0,25 Z" />
          </svg>
        </div>
        
        <div className="flex flex-col items-center justify-center text-center mb-8 relative z-10 pt-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
            className="bg-wellness-teal/10 rounded-full p-4 mb-4"
          >
            <CheckCircle className="h-12 w-12 text-wellness-teal" />
          </motion.div>
          <h2 className="text-2xl font-light text-gray-800 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-500">Your wellness appointment has been successfully scheduled.</p>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-0.5 bg-wellness-teal/30 rounded-full mt-6"
          />
        </div>

        <div className="space-y-4 mb-8 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-700 mb-3 flex items-center">
            <Sparkles className="h-4 w-4 text-wellness-teal mr-2" />
            Appointment Details
          </h3>
          
          <div className="flex items-center">
            <Activity className="h-5 w-5 text-wellness-teal mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Service</p>
              <p className="font-medium text-gray-800">{service ? getServiceName(service) : 'No service selected'}</p>
            </div>
          </div>

          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-wellness-teal mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium text-gray-800">
                {date ? format(date, 'EEEE, MMMM do, yyyy') : 'No date selected'}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <Clock className="h-5 w-5 text-wellness-teal mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <p className="font-medium text-gray-800">{time || '10:00 AM'}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <User className="h-5 w-5 text-wellness-teal mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Specialist</p>
              <p className="font-medium text-gray-800">Emma Johnson</p>
            </div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-wellness-teal/5 p-3 rounded-lg mb-6 text-center"
        >
          <p className="text-sm text-gray-600">
            We've sent a confirmation email with all details and instructions to your registered email address.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            className="border-wellness-teal/50 text-wellness-teal hover:bg-wellness-teal/10 transition-colors"
            onClick={onBookAnother}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Book Another Appointment
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ConfirmationView;
