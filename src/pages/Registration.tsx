import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RegistrationHeader from '@/components/registration/RegistrationHeader';
import PersonalInfoSection from '@/components/registration/PersonalInfoSection';
import EventDetailsSection from '@/components/registration/EventDetailsSection';
import PaymentInfoSection from '@/components/registration/PaymentInfoSection';
import RegistrationSuccess from '@/components/registration/RegistrationSuccess';
import AwaitingApprovalScreen from '@/components/registration/AwaitingApprovalScreen';

interface UserData {
  personalInfo?: {
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
  };
  paymentInfo?: {
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
  };
  travelInfo?: {
    idType?: string;
    idNumber?: string;
    idPicture?: File;
    userPhoto?: File;
    tshirtSize?: string;
    travelPlan?: 'flight' | 'own' | 'pickup';
    flightDetails?: {
      airline?: string;
      flightNumber?: string;
      arrivalDate?: Date;
      comingFrom?: string;
      pickupInfo?: string;
    };
    ownTransport?: {
      checkinTime?: string;
      checkinLocation?: string;
    };
    cityPickup?: {
      pickupTime?: string;
      pickupLocation?: string;
    };
  };
  registrationStatus?: 'pending' | 'approved' | 'rejected';
}

interface Event {
  id: string;
  name: string;
  isPaid: boolean;
  requiresApproval: boolean;
  isOffline: boolean;
  amount?: number;
}

type RegistrationStep = 'personal' | 'invoice' | 'awaiting-approval' | 'payment' | 'complete';

const Registration = () => {
  const [searchParams] = useSearchParams();
  const scenario = searchParams.get('scenario') || 'new';
  const eventId = searchParams.get('event') || 'entrainment25'; // Get event from URL
  
  const [userData, setUserData] = useState<UserData>({});
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('personal');
  const [editingSection, setEditingSection] = useState<string | null>(null);

  // Configure different event types to demonstrate all flow cases
  const getEventConfig = (id: string): Event => {
    switch (id) {
      case 'entrainment25':
        // Case: Paid Program (No Approval Required)
        return {
          id: 'entrainment25',
          name: "Entrainment'25",
          isPaid: true,
          requiresApproval: false,
          isOffline: true,
          amount: 2500
        };
      case 'hdb':
        // Case: Paid Program with Approval
        return {
          id: 'hdb',
          name: "HDB",
          isPaid: true,
          requiresApproval: true,
          isOffline: true,
          amount: 1500
        };
      case 'msd':
        // Case: No waiting list (Paid Program, No Approval)
        return {
          id: 'msd',
          name: "MSD",
          isPaid: true,
          requiresApproval: false,
          isOffline: true,
          amount: 1200
        };
      case 'tat':
        // Case: Free Program (No Payment, No Approval)
        return {
          id: 'tat',
          name: "TAT",
          isPaid: false,
          requiresApproval: false,
          isOffline: true,
          amount: 0
        };
      default:
        return {
          id: 'entrainment25',
          name: "Entrainment'25",
          isPaid: true,
          requiresApproval: false,
          isOffline: true,
          amount: 2500
        };
    }
  };

  const event = getEventConfig(eventId);

  // Simulate different user states based on URL parameter or default scenarios
  useEffect(() => {
    // Check for specific scenario parameter
    if (scenario === 'partial') {
      setUserData({
        personalInfo: {
          fullName: 'Aravind Kumar',
          email: 'aravind@example.com',
          mobile: '+91 9876543210',
          gender: 'Male',
          infinitheismContact: 'Admin Sarah'
        }
      });
    } else if (scenario === 'complete') {
      setUserData({
        personalInfo: {
          fullName: 'Aravind Kumar',
          email: 'aravind@example.com',
          mobile: '+91 9876543210',
          gender: 'Male',
          dateOfBirth: new Date('1990-01-01'),
          city: 'Chennai',
          infinitheismContact: 'Admin Sarah',
          preferredRoommate: 'John Doe',
          additionalNotes: 'Vegetarian meals preferred',
          acceptedTerms: true
        },
        paymentInfo: {
          invoiceName: 'Aravind Kumar',
          invoiceEmail: 'aravind@example.com',
          amount: 2500
        }
      });
    } else if (scenario === 'approved') {
      // User who was previously awaiting approval and is now approved
      setUserData({
        personalInfo: {
          fullName: 'Raj Patel',
          email: 'raj@example.com',
          mobile: '+91 9876543212',
          gender: 'Male',
          dateOfBirth: new Date('1985-05-15'),
          city: 'Mumbai',
          infinitheismContact: 'Admin Maya',
          acceptedTerms: true
        },
        paymentInfo: {
          invoiceName: 'Raj Patel',
          invoiceEmail: 'raj@example.com',
          amount: 2500
        },
        registrationStatus: 'approved'
      });
      setCurrentStep('payment');
    } else {
      // For demonstrating different states without URL parameters
      const randomScenario = Math.floor(Math.random() * 3);
      
      if (randomScenario === 1) {
        // Partial data scenario
        setUserData({
          personalInfo: {
            fullName: 'Priya Sharma',
            email: 'priya@example.com',
            mobile: '+91 9876543211',
            gender: 'Female',
            infinitheismContact: 'Admin Raj'
          }
        });
      } else if (randomScenario === 2) {
        // Complete data scenario
        setUserData({
          personalInfo: {
            fullName: 'Raj Patel',
            email: 'raj@example.com',
            mobile: '+91 9876543212',
            gender: 'Male',
            dateOfBirth: new Date('1985-05-15'),
            city: 'Mumbai',
            infinitheismContact: 'Admin Maya',
            preferredRoommate: 'Best friend',
            additionalNotes: 'Early check-in required',
            acceptedTerms: true
          },
          paymentInfo: {
            invoiceName: 'Raj Patel',
            invoiceEmail: 'raj@example.com',
            amount: 2500
          }
        });
      } else {
        // New user with default infinitheism contact
        setUserData({
          personalInfo: {
            infinitheismContact: 'Admin Team'
          }
        });
      }
    }
  }, [scenario]);

  const handlePersonalInfoChange = (field: string, value: any) => {
    setUserData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const handlePaymentInfoChange = (field: string, value: any) => {
    setUserData(prev => ({
      ...prev,
      paymentInfo: { ...prev.paymentInfo, [field]: value }
    }));
  };

  const handlePersonalInfoSubmit = () => {
    // Case 1: Free Program (No Payment, No Approval)
    if (!event.isPaid && !event.requiresApproval) {
      setCurrentStep('complete');
      return;
    }

    // Case 2 & 3: Paid Programs
    if (event.isPaid) {
      setCurrentStep('invoice');
    }
  };

  const handleInvoiceSubmit = () => {
    // Case 2: Paid Program (No Approval Required)
    if (event.isPaid && !event.requiresApproval) {
      setCurrentStep('payment');
      return;
    }

    // Case 3: Paid Program with Approval
    if (event.isPaid && event.requiresApproval) {
      setCurrentStep('awaiting-approval');
    }
  };

  const handlePaymentSubmit = () => {
    setCurrentStep('complete');
  };

  const canContinue = () => {
    const hasRequiredPersonalInfo = userData.personalInfo?.fullName && 
                                   userData.personalInfo?.email && 
                                   userData.personalInfo?.mobile && 
                                   userData.personalInfo?.acceptedTerms;
    return hasRequiredPersonalInfo;
  };

  const canProceedToPayment = () => {
    const hasRequiredPaymentInfo = userData.paymentInfo?.invoiceName && 
                                  userData.paymentInfo?.invoiceEmail;
    return hasRequiredPaymentInfo;
  };

  // Generate personalized title
  const generatePersonalizedTitle = (fullName?: string) => {
    if (fullName) {
      const variations = [
        `${fullName}, let's complete your profile details`,
        `${fullName}, here are your personal details`,
        `${fullName}, your information looks great so far`,
        `${fullName}, let's review your details`,
        `${fullName}, your personal profile summary`,
        `${fullName}, these are your current details`
      ];
      
      // Use name length to create consistent but varied selection
      const index = fullName.length % variations.length;
      return variations[index];
    }
    return "Hey, let's complete your profile details";
  };

  // Generate personalized title for invoice details
  const generateInvoicePersonalizedTitle = (fullName?: string) => {
    if (fullName) {
      const variations = [
        `${fullName}, let's complete your billing details`,
        `${fullName}, we need a few more payment details`,
        `${fullName}, finish your invoice information`,
        `${fullName}, let's complete your payment setup`
      ];
      
      const index = fullName.length % variations.length;
      return variations[index];
    }
    return "Hey, let's complete your billing details";
  };

  // Awaiting approval screen
  if (currentStep === 'awaiting-approval') {
    return (
      <AwaitingApprovalScreen
        event={event}
        personalInfo={userData.personalInfo}
        paymentInfo={userData.paymentInfo}
        onEditInfo={() => setCurrentStep('personal')}
      />
    );
  }

  // Invoice details step (for paid programs)
  if (currentStep === 'invoice') {
    return (
      <div className="min-h-screen bg-gray-50">
        <RegistrationHeader />

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Personalized Title - Always show */}
          <div className="mb-8 text-left">
            <h1 className="text-2xl font-semibold text-gray-900">
              {generateInvoicePersonalizedTitle(userData.personalInfo?.fullName)}
            </h1>
            <p className="text-gray-600 mt-2">Complete your billing information</p>
          </div>

          <div className="flex items-start gap-8">
            {/* Main Content - Center Aligned with Max Width */}
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-4xl space-y-6">
                <PaymentInfoSection
                  paymentInfo={userData.paymentInfo}
                  onPaymentInfoChange={handlePaymentInfoChange}
                  editingSection={editingSection}
                  setEditingSection={setEditingSection}
                  eventAmount={event.amount || 0}
                  isPaid={event.isPaid}
                  hideAmountField={true}
                  showPersonalizedTitle={false}
                />

                {/* Action buttons */}
                {!editingSection && (
                  <div className="flex justify-center space-x-4 pt-6">
                    <Button 
                      variant="outline"
                      onClick={() => setCurrentStep('personal')}
                      className="px-6 py-3"
                    >
                      back
                    </Button>
                    <Button 
                      onClick={handleInvoiceSubmit}
                      className="relative overflow-hidden px-8 py-3 text-base font-medium rounded-full text-white border-0 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
                      disabled={!canProceedToPayment()}
                      style={{
                        backgroundImage: `url('/lovable-uploads/203da045-4558-4833-92ac-07479a336dfb.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                      <span className="relative z-10">
                        {event.requiresApproval ? 'submit for approval' : 'proceed to payment'}
                      </span>
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Event Details Sidebar */}
            <div className="w-80 flex-shrink-0 sticky top-8">
              <EventDetailsSection eventName={event.name} isCompact={true} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Payment step
  if (currentStep === 'payment') {
    return (
      <div className="min-h-screen bg-gray-50">
        <RegistrationHeader />

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Personalized Title - Always show unless coming from approved state */}
          {!userData.registrationStatus && (
            <div className="mb-8 text-left">
              <h1 className="text-2xl font-semibold text-gray-900">
                {generateInvoicePersonalizedTitle(userData.personalInfo?.fullName)}
              </h1>
              <p className="text-gray-600 mt-2">Complete your payment details</p>
            </div>
          )}

          <div className="flex items-start gap-8">
            {/* Main Content - Center Aligned with Max Width */}
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-4xl space-y-6">
                {/* Show approval success message if coming from approved state */}
                {userData.registrationStatus === 'approved' && (
                  <Card className="mb-6 border-0 shadow-sm bg-green-50 border-green-200">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-semibold text-green-800 mb-2">You're approved!</h2>
                      <p className="text-green-700">Let's finish your registration with payment.</p>
                    </CardContent>
                  </Card>
                )}

                <PaymentInfoSection
                  paymentInfo={userData.paymentInfo}
                  onPaymentInfoChange={handlePaymentInfoChange}
                  editingSection={editingSection}
                  setEditingSection={setEditingSection}
                  eventAmount={event.amount || 0}
                  isPaid={event.isPaid}
                  hideAmountField={true}
                  showPersonalizedTitle={false}
                />

                {/* Action buttons */}
                {!editingSection && (
                  <div className="flex justify-center space-x-4 pt-6">
                    <Button 
                      variant="outline"
                      onClick={() => setCurrentStep('invoice')}
                      className="px-6 py-3"
                    >
                      back
                    </Button>
                    <Button 
                      onClick={handlePaymentSubmit}
                      className="relative overflow-hidden px-8 py-3 text-base font-medium rounded-full text-white border-0 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
                      disabled={!canProceedToPayment()}
                      style={{
                        backgroundImage: `url('/lovable-uploads/203da045-4558-4833-92ac-07479a336dfb.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                      <span className="relative z-10">complete payment</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Event Details Sidebar */}
            <div className="w-80 flex-shrink-0 sticky top-8">
              <EventDetailsSection eventName={event.name} isCompact={true} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Final success page
  if (currentStep === 'complete') {
    return (
      <RegistrationSuccess
        event={event}
        personalInfo={userData.personalInfo}
        paymentInfo={userData.paymentInfo}
        setEditingSection={setEditingSection}
      />
    );
  }

  // Personal information step (initial step)
  return (
    <div className="min-h-screen bg-gray-50">
      <RegistrationHeader />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Personalized Title - Always show */}
        <div className="mb-8 text-left">
          <h1 className="text-2xl font-semibold text-gray-900">
            {generatePersonalizedTitle(userData.personalInfo?.fullName)}
          </h1>
          <p className="text-gray-600 mt-2">Review and complete your registration details</p>
        </div>

        <div className="flex items-start gap-8">
          {/* Main Content - Center Aligned with Max Width */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-4xl space-y-6">
              <PersonalInfoSection
                personalInfo={userData.personalInfo}
                onPersonalInfoChange={handlePersonalInfoChange}
                editingSection={editingSection}
                setEditingSection={setEditingSection}
                showPersonalizedTitle={false}
                eventRequiresApproval={event.requiresApproval}
              />

              {/* Action Buttons */}
              {!editingSection && (
                <div className="flex justify-center pt-6">
                  <Button 
                    onClick={handlePersonalInfoSubmit}
                    className="relative overflow-hidden px-8 py-3 text-base font-medium rounded-full text-white border-0 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
                    disabled={!canContinue()}
                    style={{
                      backgroundImage: `url('/lovable-uploads/203da045-4558-4833-92ac-07479a336dfb.png')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    <span className="relative z-10">
                      {!event.isPaid && !event.requiresApproval ? 'confirm & register' : 'continue'}
                    </span>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Event Details Sidebar */}
          <div className="w-80 flex-shrink-0 sticky top-8">
            <EventDetailsSection eventName={event.name} isCompact={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
