
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Edit } from 'lucide-react';

interface PersonalInfo {
  infinitheismContact?: string;
  preferredRoommate?: string;
  additionalNotes?: string;
}

interface PaymentInfo {
  invoiceName?: string;
  amount?: number;
}

interface Event {
  requiresApproval: boolean;
  isPaid: boolean;
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
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="relative h-64 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 overflow-hidden">
        <img 
          src="/lovable-uploads/24448433-14b3-4796-8f41-8ba4e87474b3.png" 
          alt="Entrainment'25 Banner" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-light mb-3">Registration Complete</h1>
            <p className="text-xl opacity-90 font-light">Thank you for joining Entrainment'25</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card className="border-0 shadow-lg bg-white">
          <CardContent className="p-8">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {event.requiresApproval ? "Awaiting Mahatria's Approval" : "You're All Set!"}
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                {event.requiresApproval 
                  ? "Your registration has been submitted and is pending approval. We'll notify you once it's confirmed."
                  : "Your registration for Entrainment'25 has been confirmed. We look forward to seeing you there!"
                }
              </p>
            </div>

            <div className="space-y-4 mb-10">
              {personalInfo && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Personal Information
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Contact: {personalInfo.infinitheismContact}</p>
                    {personalInfo.preferredRoommate && (
                      <p>Roommate: {personalInfo.preferredRoommate}</p>
                    )}
                    {personalInfo.additionalNotes && (
                      <p>Notes: {personalInfo.additionalNotes}</p>
                    )}
                  </div>
                </div>
              )}

              {event.isPaid && paymentInfo && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Payment Information
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Invoice Name: {paymentInfo.invoiceName}</p>
                    <p>Amount: ₹{paymentInfo.amount}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <Button 
                variant="outline" 
                onClick={() => setEditingSection('personal')}
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Info
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Add to Calendar
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                Download Invoice
              </Button>
              <Button 
                variant="ghost"
                onClick={() => window.location.href = '/'}
                className="text-gray-500 hover:bg-gray-100"
              >
                Go to Homepage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
