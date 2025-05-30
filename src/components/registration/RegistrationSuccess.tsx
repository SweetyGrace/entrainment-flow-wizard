import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

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
  requiresApproval: boolean;
  isPaid: boolean;
  name: string;
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
            <p className="text-xl opacity-90 font-light">Thank you for joining {event.name}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card className="border-0 shadow-lg bg-white">
          <CardContent className="p-8">
            <div className="text-center mb-10">
              <div className="relative w-20 h-20 mx-auto mb-6">
                {/* Animated success icon */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-emerald-500 animate-bounce" />
                </div>
                {/* Floating particles */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {event.requiresApproval ? "Awaiting Mahatria's Approval" : "You're All Set!"}
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                {event.requiresApproval 
                  ? "Your registration has been submitted and is pending approval. We'll notify you once it's confirmed."
                  : `Your registration for ${event.name} has been confirmed. We look forward to seeing you there!`
                }
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                className="relative overflow-hidden px-8 py-3 text-base font-medium rounded-full text-white border-0 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
                style={{
                  backgroundImage: `url('/lovable-uploads/203da045-4558-4833-92ac-07479a336dfb.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <span className="relative z-10">Add to Calendar</span>
              </Button>
              <Button 
                variant="outline" 
                className="px-6 py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Download Invoice
              </Button>
              <Button 
                variant="ghost"
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 text-gray-500 hover:bg-gray-100"
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
