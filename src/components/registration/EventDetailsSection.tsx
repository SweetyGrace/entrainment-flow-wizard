
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, Clock, MapPin, IndianRupee } from 'lucide-react';

interface EventDetailsSectionProps {
  eventName?: string;
  isCompact?: boolean;
}

const EventDetailsSection: React.FC<EventDetailsSectionProps> = ({ 
  eventName = "Entrainment'25", 
  isCompact = false 
}) => {
  if (isCompact) {
    return (
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-medium text-gray-900">{eventName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">Mysore, Karnataka</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <CalendarIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">March 15-17, 2025</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">3 days intensive</p>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-1">
                <IndianRupee className="w-5 h-5 text-blue-600" />
                <p className="text-base font-semibold text-blue-800">₹2,500</p>
              </div>
              <p className="text-sm text-blue-700">
                Event registration fee
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6 border-0 shadow-sm bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium text-gray-900">Event details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Venue</p>
                <p className="text-sm text-gray-600">Mysore, Karnataka</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CalendarIcon className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Event dates</p>
                <p className="text-sm text-gray-600">March 15-17, 2025</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Duration</p>
                <p className="text-sm text-gray-600">3 days intensive programme</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <IndianRupee className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Event cost</p>
                <p className="text-sm text-gray-600">₹2,500 per participant</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Note:</span> All timings are in Indian Standard Time (IST). 
            Detailed schedule will be shared closer to the event date.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventDetailsSection;

