
import React from 'react';
import { CheckCircle, Download, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/Card';
import { Button } from '@/common/components/Button';

interface RegistrationSuccessProps {
  registrationId: string;
  eventTitle: string;
  onDownloadTicket: () => void;
  onAddToCalendar: () => void;
  onBackToEvents: () => void;
}

const RegistrationSuccess: React.FC<RegistrationSuccessProps> = ({
  registrationId,
  eventTitle,
  onDownloadTicket,
  onAddToCalendar,
  onBackToEvents
}) => {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <div className="flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Registration Successful!</h1>
        <p className="text-gray-600">
          Thank you for registering for <strong>{eventTitle}</strong>
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registration Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Registration ID</p>
            <p className="font-mono text-lg font-semibold">{registrationId}</p>
          </div>
          
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-4">
              A confirmation email has been sent to your registered email address with all the details.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={onDownloadTicket} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Ticket
              </Button>
              <Button onClick={onAddToCalendar} variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Add to Calendar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Need help? Contact us at support@events.com or call +44 123 456 7890
        </p>
        
        <Button onClick={onBackToEvents} className="w-full sm:w-auto">
          Browse More Events
        </Button>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
