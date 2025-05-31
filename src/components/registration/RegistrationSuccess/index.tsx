
import React from 'react';
import { CheckCircle, Calendar, MapPin, Users, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Event {
  id: string;
  name: string;
  isPaid: boolean;
  requiresApproval: boolean;
  isOffline: boolean;
  amount?: number;
}

interface PersonalInfo {
  fullName?: string;
  gender?: string;
  mobile?: string;
  email?: string;
  dateOfBirth?: Date;
  infinitheismContact?: string;
  city?: string;
  preferredRoommate?: string;
  additionalNotes?: string;
  acceptedTerms?: boolean;
}

interface PaymentInfo {
  invoiceName?: string;
  invoiceEmail?: string;
  gstRegistered?: boolean;
  gstin?: string;
  tdsPercent?: string;
  tan?: string;
  address?: string;
  paymentMethod?: string;
  amount?: number;
  handoverDate?: Date;
  handoverTo?: string;
}

interface RegistrationSuccessProps {
  event: Event;
  personalInfo?: PersonalInfo;
  paymentInfo?: PaymentInfo;
  setEditingSection: (section: string | null) => void;
}

const RegistrationSuccess: React.FC<RegistrationSuccessProps> = ({
  event,
  personalInfo,
  paymentInfo,
  setEditingSection
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              Registration Successful!
            </CardTitle>
            <p className="text-gray-600">
              Thank you {personalInfo?.fullName} for registering for {event.name}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Event Details
              </h3>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex justify-between">
                  <span>Event:</span>
                  <span className="font-medium">{event.name}</span>
                </div>
                {event.isPaid && (
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-medium">₹{event.amount}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                A confirmation email has been sent to {personalInfo?.email}
              </p>
              
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/'}
                  className="px-6"
                >
                  Back to Home
                </Button>
                <Button
                  onClick={() => window.print()}
                  className="px-6"
                >
                  Print Confirmation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
