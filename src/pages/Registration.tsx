import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import PersonalInfoSection from '@/components/registration/PersonalInfoSection';
import PaymentInfoSection from '@/components/registration/PaymentInfoSection';
import RegistrationSuccess from '@/components/registration/RegistrationSuccess';
import RegistrationHeader from '@/components/registration/RegistrationHeader';

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
}

interface Event {
  id: string;
  name: string;
  isPaid: boolean;
  requiresApproval: boolean;
  isOffline: boolean;
  amount?: number;
}

type RegistrationStep = 'personal' | 'registered' | 'payment' | 'complete';

const Registration = () => {
  const [searchParams] = useSearchParams();
  const scenario = searchParams.get('scenario') || 'new';
  
  const [userData, setUserData] = useState<UserData>({});
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('personal');
  const [editingSection, setEditingSection] = useState<string | null>(null);

  // Mock event data
  const event: Event = {
    id: 'entrainment25',
    name: "Entrainment'25",
    isPaid: true,
    requiresApproval: true,
    isOffline: true,
    amount: 2500
  };

  // Simulate different user states based on URL parameter or default scenarios
  useEffect(() => {
    // Check for specific scenario parameter
    if (scenario === 'partial') {
      setUserData({
        personalInfo: {
          fullName: 'Aravind Kumar',
          email: 'aravind@example.com',
          mobile: '+91 9876543210',
          gender: 'Male'
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
          acceptedTerms: true
        },
        paymentInfo: {
          invoiceName: 'Aravind Kumar',
          invoiceEmail: 'aravind@example.com',
          amount: 2500
        }
      });
    } else {
      // For demonstrating different states without URL parameters
      // You can modify this logic to show different scenarios
      const randomScenario = Math.floor(Math.random() * 3);
      
      if (randomScenario === 1) {
        // Partial data scenario
        setUserData({
          personalInfo: {
            fullName: 'Priya Sharma',
            email: 'priya@example.com',
            mobile: '+91 9876543211',
            gender: 'Female'
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
            acceptedTerms: true
          },
          paymentInfo: {
            invoiceName: 'Raj Patel',
            invoiceEmail: 'raj@example.com',
            amount: 2500
          }
        });
      }
      // else remains empty for new user scenario
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
    setCurrentStep('registered');
  };

  const handleProceedToPayment = () => {
    setCurrentStep('payment');
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

  // Registration confirmation page
  if (currentStep === 'registered') {
    return (
      <div className="min-h-screen bg-gray-50">
        <RegistrationHeader 
          musicEnabled={musicEnabled}
          setMusicEnabled={setMusicEnabled}
        />

        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Programme Registered!</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Congratulations! You have successfully registered for {event.name}. 
                {event.isPaid ? " Please proceed to complete your payment to secure your spot." : " Your registration is now complete."}
              </p>
              
              {/* Show registered personal info */}
              <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
                <h3 className="font-semibold text-gray-900 mb-4">Registration Details:</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {userData.personalInfo?.fullName}</p>
                  <p><span className="font-medium">Email:</span> {userData.personalInfo?.email}</p>
                  <p><span className="font-medium">Mobile:</span> {userData.personalInfo?.mobile}</p>
                  <p><span className="font-medium">Programme:</span> {event.name}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {event.isPaid && (
                  <Button 
                    onClick={handleProceedToPayment}
                    className="relative overflow-hidden px-8 py-3 text-base font-medium rounded-full text-white border-0 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
                    style={{
                      backgroundImage: `url('/lovable-uploads/203da045-4558-4833-92ac-07479a336dfb.png')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    <span className="relative z-10">Proceed to Payment</span>
                  </Button>
                )}
                <Button 
                  variant="outline"
                  onClick={() => setCurrentStep('personal')}
                  className="px-8 py-3 text-base"
                >
                  Edit Registration
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Payment step
  if (currentStep === 'payment') {
    return (
      <div className="min-h-screen bg-gray-50">
        <RegistrationHeader 
          musicEnabled={musicEnabled}
          setMusicEnabled={setMusicEnabled}
        />

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="space-y-6">
            {/* Progress indicator */}
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="text-green-600 font-medium">✓ Registration Complete</span>
                  <span className="font-medium text-blue-600">Payment Details</span>
                </div>
              </CardContent>
            </Card>

            <PaymentInfoSection
              paymentInfo={userData.paymentInfo}
              onPaymentInfoChange={handlePaymentInfoChange}
              editingSection={editingSection}
              setEditingSection={setEditingSection}
              eventAmount={event.amount || 0}
              isPaid={event.isPaid}
            />

            {/* Payment action buttons */}
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex justify-center space-x-4">
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentStep('registered')}
                    className="px-6 py-3"
                  >
                    Back
                  </Button>
                  {editingSection ? (
                    <div className="text-center text-gray-600">
                      <p className="text-sm">Make your changes above and click "Save Changes"</p>
                    </div>
                  ) : (
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
                      <span className="relative z-10">Complete Payment</span>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
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
      <RegistrationHeader 
        musicEnabled={musicEnabled}
        setMusicEnabled={setMusicEnabled}
      />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <PersonalInfoSection
            personalInfo={userData.personalInfo}
            onPersonalInfoChange={handlePersonalInfoChange}
            editingSection={editingSection}
            setEditingSection={setEditingSection}
          />

          {/* Terms and Conditions + Action Buttons */}
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-100 mb-6">
                <Checkbox
                  id="terms"
                  checked={userData.personalInfo?.acceptedTerms || false}
                  onCheckedChange={(checked) => handlePersonalInfoChange('acceptedTerms', checked)}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                  I accept the terms and conditions and understand that this registration is subject to approval
                </Label>
              </div>

              <div className="flex justify-center">
                {editingSection ? (
                  <div className="text-center text-gray-600">
                    <p className="text-sm">Make your changes above and click "Save Changes"</p>
                  </div>
                ) : (
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
                    <span className="relative z-10">Continue</span>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Registration;
