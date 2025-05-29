
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

const Registration = () => {
  const [searchParams] = useSearchParams();
  const scenario = searchParams.get('scenario') || 'new';
  
  const [userData, setUserData] = useState<UserData>({});
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const canProceedToPayment = () => {
    const hasRequiredPersonalInfo = userData.personalInfo?.fullName && 
                                   userData.personalInfo?.email && 
                                   userData.personalInfo?.mobile && 
                                   userData.personalInfo?.acceptedTerms;
    return hasRequiredPersonalInfo;
  };

  if (isSubmitted) {
    return (
      <RegistrationSuccess
        event={event}
        personalInfo={userData.personalInfo}
        paymentInfo={userData.paymentInfo}
        setEditingSection={setEditingSection}
      />
    );
  }

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
          
          <PaymentInfoSection
            paymentInfo={userData.paymentInfo}
            onPaymentInfoChange={handlePaymentInfoChange}
            editingSection={editingSection}
            setEditingSection={setEditingSection}
            eventAmount={event.amount || 0}
            isPaid={event.isPaid}
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
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg"
                    disabled={!canProceedToPayment()}
                  >
                    {event.isPaid ? 'Proceed to Payment' : 'Complete Registration'}
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
