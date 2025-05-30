
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Edit, CheckCircle } from 'lucide-react';
import RegistrationHeader from './RegistrationHeader';

interface PersonalInfo {
  fullName?: string;
  email?: string;
  mobile?: string;
}

interface PaymentInfo {
  invoiceName?: string;
  amount?: number;
}

interface Event {
  name: string;
  amount?: number;
}

interface AwaitingApprovalScreenProps {
  event: Event;
  personalInfo?: PersonalInfo;
  paymentInfo?: PaymentInfo;
  onEditInfo: () => void;
}

const AwaitingApprovalScreen: React.FC<AwaitingApprovalScreenProps> = ({
  event,
  personalInfo,
  paymentInfo,
  onEditInfo
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <RegistrationHeader />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="border-0 shadow-lg bg-white">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Awaiting seat approval</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Your registration for {event.name} has been submitted and is pending Mahatria's approval. 
              We'll notify you once your seat is confirmed, and then you can proceed with payment.
            </p>
            
            {/* Show submitted information */}
            <div className="space-y-4 mb-8">
              {personalInfo && (
                <div className="bg-blue-50 rounded-lg p-6 text-left max-w-md mx-auto">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Personal Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {personalInfo.fullName}</p>
                    <p><span className="font-medium">Email:</span> {personalInfo.email}</p>
                    <p><span className="font-medium">Mobile:</span> {personalInfo.mobile}</p>
                    <p><span className="font-medium">Programme:</span> {event.name}</p>
                  </div>
                </div>
              )}

              {paymentInfo && (
                <div className="bg-green-50 rounded-lg p-6 text-left max-w-md mx-auto">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Invoice Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Invoice Name:</span> {paymentInfo.invoiceName}</p>
                    <p><span className="font-medium">Amount:</span> ₹{paymentInfo.amount}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="text-left">
                  <h4 className="font-medium text-yellow-800">What happens next?</h4>
                  <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                    <li>• We'll review your registration within 24-48 hours</li>
                    <li>• You'll receive an email notification about the approval status</li>
                    <li>• Once approved, you can complete your payment to secure your spot</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline"
                onClick={onEditInfo}
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit registration
              </Button>
              <Button 
                variant="ghost"
                onClick={() => window.location.href = '/'}
                className="text-gray-500 hover:bg-gray-100"
              >
                Go to homepage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AwaitingApprovalScreen;
