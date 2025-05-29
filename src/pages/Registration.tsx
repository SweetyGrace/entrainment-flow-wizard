import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Music, ArrowLeft, Edit, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import RegistrationStepper from '@/components/RegistrationStepper';

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
  const [currentStep, setCurrentStep] = useState(1);
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

  // Simulate different user states based on URL parameter
  useEffect(() => {
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
    }
  }, [scenario]);

  const getUserDataState = () => {
    const hasPersonalInfo = userData.personalInfo && Object.keys(userData.personalInfo).length > 4;
    const hasPaymentInfo = userData.paymentInfo && Object.keys(userData.paymentInfo).length > 0;
    
    if (!userData.personalInfo || Object.keys(userData.personalInfo).length === 0) {
      return 'new';
    }
    if (hasPersonalInfo && (!event.isPaid || hasPaymentInfo)) {
      return 'complete';
    }
    return 'partial';
  };

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
    setCurrentStep(4);
  };

  const renderPersonalInfoSection = () => {
    const dataState = getUserDataState();
    const hasData = userData.personalInfo && Object.keys(userData.personalInfo).length > 0;
    const isEditing = editingSection === 'personal';
    
    if (hasData && !isEditing) {
      return (
        <Card className="p-6 mb-6 bg-white border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-[#2D2D2D]">Personal Information</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setEditingSection('personal')}
              className="text-[#0799FF] hover:bg-blue-50"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Section
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userData.personalInfo?.fullName && (
              <div>
                <Label className="text-[#52585E] text-sm font-medium">Full Name</Label>
                <div className="mt-1 text-[#2D2D2D] font-medium">{userData.personalInfo.fullName}</div>
              </div>
            )}
            {userData.personalInfo?.email && (
              <div>
                <Label className="text-[#52585E] text-sm font-medium">Email Address</Label>
                <div className="mt-1 text-[#2D2D2D] font-medium">{userData.personalInfo.email}</div>
              </div>
            )}
            {userData.personalInfo?.mobile && (
              <div>
                <Label className="text-[#52585E] text-sm font-medium">Mobile Number</Label>
                <div className="mt-1 text-[#2D2D2D] font-medium">{userData.personalInfo.mobile}</div>
              </div>
            )}
            {userData.personalInfo?.gender && (
              <div>
                <Label className="text-[#52585E] text-sm font-medium">Gender</Label>
                <div className="mt-1 text-[#2D2D2D] font-medium">{userData.personalInfo.gender}</div>
              </div>
            )}
            {userData.personalInfo?.city && (
              <div>
                <Label className="text-[#52585E] text-sm font-medium">City</Label>
                <div className="mt-1 text-[#2D2D2D] font-medium">{userData.personalInfo.city}</div>
              </div>
            )}
            {userData.personalInfo?.dateOfBirth && (
              <div>
                <Label className="text-[#52585E] text-sm font-medium">Date of Birth</Label>
                <div className="mt-1 text-[#2D2D2D] font-medium">{format(userData.personalInfo.dateOfBirth, "PPP")}</div>
              </div>
            )}
          </div>
          {dataState === 'complete' && (
            <div className="flex items-center mt-4 text-green-600">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span className="text-sm">Section completed</span>
            </div>
          )}
        </Card>
      );
    }

    return (
      <Card className="p-6 mb-6 bg-white border border-gray-100">
        {isEditing && (
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-[#2D2D2D]">Edit Personal Information</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setEditingSection(null)}
              className="border-gray-300 text-[#52585E] hover:bg-gray-50"
            >
              Cancel
            </Button>
          </div>
        )}
        
        {!isEditing && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-[#2D2D2D] mb-2">
              {dataState === 'new' ? "Welcome to Entrainment'25" : "We're almost there, Aravind."}
            </h2>
            <p className="text-[#52585E]">
              {dataState === 'new' 
                ? "Let's get your journey started with some basic information." 
                : "Just a few quick things to wrap up your profile."}
            </p>
          </div>
        )}

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-[#2D2D2D]">Full Name</Label>
              <Input
                id="fullName"
                value={userData.personalInfo?.fullName || ''}
                onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                className="border-gray-200 focus:border-[#0799FF] focus:ring-[#0799FF]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-[#2D2D2D]">Gender</Label>
              <Select value={userData.personalInfo?.gender} onValueChange={(value) => handlePersonalInfoChange('gender', value)}>
                <SelectTrigger className="border-gray-200 focus:border-[#0799FF] focus:ring-[#0799FF]">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mobile" className="text-[#2D2D2D]">Mobile Number</Label>
              <Input
                id="mobile"
                value={userData.personalInfo?.mobile || ''}
                onChange={(e) => handlePersonalInfoChange('mobile', e.target.value)}
                className="border-gray-200 focus:border-[#0799FF] focus:ring-[#0799FF]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#2D2D2D]">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={userData.personalInfo?.email || ''}
                onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                className="border-gray-200 focus:border-[#0799FF] focus:ring-[#0799FF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[#2D2D2D]">Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-gray-200 focus:border-[#0799FF]",
                      !userData.personalInfo?.dateOfBirth && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {userData.personalInfo?.dateOfBirth ? format(userData.personalInfo.dateOfBirth, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={userData.personalInfo?.dateOfBirth}
                    onSelect={(date) => handlePersonalInfoChange('dateOfBirth', date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city" className="text-[#2D2D2D]">City</Label>
              <Input
                id="city"
                value={userData.personalInfo?.city || ''}
                onChange={(e) => handlePersonalInfoChange('city', e.target.value)}
                className="border-gray-200 focus:border-[#0799FF] focus:ring-[#0799FF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="infinitheismContact" className="text-[#2D2D2D]">Infinitheism Contact</Label>
              <Input
                id="infinitheismContact"
                value={userData.personalInfo?.infinitheismContact || ''}
                onChange={(e) => handlePersonalInfoChange('infinitheismContact', e.target.value)}
                className="border-gray-200 focus:border-[#0799FF] focus:ring-[#0799FF]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferredRoommate" className="text-[#2D2D2D]">Preferred Roommate</Label>
              <Input
                id="preferredRoommate"
                value={userData.personalInfo?.preferredRoommate || ''}
                onChange={(e) => handlePersonalInfoChange('preferredRoommate', e.target.value)}
                className="border-gray-200 focus:border-[#0799FF] focus:ring-[#0799FF]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalNotes" className="text-[#2D2D2D]">Additional Notes</Label>
            <Textarea
              id="additionalNotes"
              value={userData.personalInfo?.additionalNotes || ''}
              onChange={(e) => handlePersonalInfoChange('additionalNotes', e.target.value)}
              className="border-gray-200 focus:border-[#0799FF] focus:ring-[#0799FF]"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={userData.personalInfo?.acceptedTerms || false}
              onCheckedChange={(checked) => handlePersonalInfoChange('acceptedTerms', checked)}
            />
            <Label htmlFor="terms" className="text-sm text-[#52585E]">
              I accept the terms and conditions
            </Label>
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <Button 
                variant="outline"
                onClick={() => setEditingSection(null)}
                className="border-gray-300 text-[#52585E] hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => setEditingSection(null)}
                className="bg-[#0799FF] hover:bg-blue-600"
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </Card>
    );
  };

  const renderPaymentInfoSection = () => {
    if (!event.isPaid) return null;

    const hasData = userData.paymentInfo && Object.keys(userData.paymentInfo).length > 0;
    const isEditing = editingSection === 'payment';
    
    if (hasData && !isEditing) {
      return (
        <Card className="p-6 mb-6 bg-white border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-[#2D2D2D]">Invoice Details</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setEditingSection('payment')}
              className="text-[#0799FF] hover:bg-blue-50"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Section
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userData.paymentInfo?.invoiceName && (
              <div>
                <Label className="text-[#52585E] text-sm font-medium">Invoice Name</Label>
                <div className="mt-1 text-[#2D2D2D] font-medium">{userData.paymentInfo.invoiceName}</div>
              </div>
            )}
            {userData.paymentInfo?.invoiceEmail && (
              <div>
                <Label className="text-[#52585E] text-sm font-medium">Invoice Email</Label>
                <div className="mt-1 text-[#2D2D2D] font-medium">{userData.paymentInfo.invoiceEmail}</div>
              </div>
            )}
            {userData.paymentInfo?.amount && (
              <div>
                <Label className="text-[#52585E] text-sm font-medium">Amount</Label>
                <div className="mt-1 text-[#2D2D2D] font-medium">₹{userData.paymentInfo.amount}</div>
              </div>
            )}
          </div>
          <div className="flex items-center mt-4 text-green-600">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span className="text-sm">Section completed</span>
          </div>
        </Card>
      );
    }

    return (
      <Card className="p-6 mb-6 bg-white border border-gray-100">
        {isEditing && (
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-[#2D2D2D]">Edit Invoice Details</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setEditingSection(null)}
              className="border-gray-300 text-[#52585E] hover:bg-gray-50"
            >
              Cancel
            </Button>
          </div>
        )}

        {!isEditing && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#2D2D2D] mb-2">Invoice Details</h3>
            <p className="text-[#52585E]">We need some billing information for your registration.</p>
          </div>
        )}

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceName" className="text-[#2D2D2D]">Name for Invoice</Label>
              <Input
                id="invoiceName"
                value={userData.paymentInfo?.invoiceName || ''}
                onChange={(e) => handlePaymentInfoChange('invoiceName', e.target.value)}
                className="border-gray-200 focus:border-[#0799FF] focus:ring-[#0799FF]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoiceEmail" className="text-[#2D2D2D]">Email for Invoice</Label>
              <Input
                id="invoiceEmail"
                type="email"
                value={userData.paymentInfo?.invoiceEmail || ''}
                onChange={(e) => handlePaymentInfoChange('invoiceEmail', e.target.value)}
                className="border-gray-200 focus:border-[#0799FF] focus:ring-[#0799FF]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="gstRegistered"
                checked={userData.paymentInfo?.gstRegistered || false}
                onCheckedChange={(checked) => handlePaymentInfoChange('gstRegistered', checked)}
              />
              <Label htmlFor="gstRegistered" className="text-[#2D2D2D]">GST Registered?</Label>
            </div>

            {userData.paymentInfo?.gstRegistered && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gstin" className="text-[#2D2D2D]">GSTIN</Label>
                  <Input
                    id="gstin"
                    value={userData.paymentInfo?.gstin || ''}
                    onChange={(e) => handlePaymentInfoChange('gstin', e.target.value)}
                    className="border-gray-200 focus:border-[#0799FF] focus:ring-[#0799FF]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tdsPercent" className="text-[#2D2D2D]">TDS %</Label>
                  <Input
                    id="tdsPercent"
                    value={userData.paymentInfo?.tdsPercent || ''}
                    onChange={(e) => handlePaymentInfoChange('tdsPercent', e.target.value)}
                    className="border-gray-200 focus:border-[#0799FF] focus:ring-[#0799FF]"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-[#2D2D2D]">Address</Label>
            <Textarea
              id="address"
              value={userData.paymentInfo?.address || ''}
              onChange={(e) => handlePaymentInfoChange('address', e.target.value)}
              className="border-gray-200 focus:border-[#0799FF] focus:ring-[#0799FF]"
              rows={3}
            />
          </div>

          <div className="p-4 bg-[#F9FBFF] rounded-lg border border-blue-100">
            <div className="flex justify-between items-center">
              <span className="text-[#2D2D2D] font-medium">Total Amount:</span>
              <span className="text-2xl font-semibold text-[#1C3A6A]">₹{event.amount}</span>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <Button 
                variant="outline"
                onClick={() => setEditingSection(null)}
                className="border-gray-300 text-[#52585E] hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => setEditingSection(null)}
                className="bg-[#0799FF] hover:bg-blue-600"
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </Card>
    );
  };

  const getSteps = () => {
    const dataState = getUserDataState();
    const hasPersonalInfo = userData.personalInfo && Object.keys(userData.personalInfo).length > 4;
    const hasPaymentInfo = userData.paymentInfo && Object.keys(userData.paymentInfo).length > 0;
    
    const steps = [
      {
        id: 1,
        title: 'Personal Info',
        isCompleted: hasPersonalInfo,
        isCurrent: currentStep === 1 && !hasPersonalInfo
      },
      {
        id: 2,
        title: 'Payment',
        isCompleted: !event.isPaid || hasPaymentInfo,
        isCurrent: currentStep === 2 && event.isPaid && hasPersonalInfo && !hasPaymentInfo
      },
      {
        id: 3,
        title: 'Travel Info',
        isCompleted: false,
        isCurrent: currentStep === 3
      },
      {
        id: 4,
        title: 'Complete',
        isCompleted: isSubmitted,
        isCurrent: currentStep === 4
      }
    ];

    return event.isPaid ? steps : steps.filter(step => step.id !== 2);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F9FBFF]">
        {/* Banner */}
        <div className="relative h-48 bg-gradient-to-r from-[#1C3A6A] to-[#0799FF] overflow-hidden">
          <img 
            src="/lovable-uploads/24448433-14b3-4796-8f41-8ba4e87474b3.png" 
            alt="Entrainment'25 Banner" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-2">Registration Complete!</h1>
              <p className="text-lg opacity-90">Thank you for joining Entrainment'25</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="p-8 bg-white border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-[#2D2D2D] mb-2">
                {event.requiresApproval ? "Awaiting Mahatria's Approval" : "You're All Set!"}
              </h2>
              <p className="text-[#52585E]">
                {event.requiresApproval 
                  ? "Your registration has been submitted and is pending approval. We'll notify you once it's confirmed."
                  : "Your registration for Entrainment'25 has been confirmed. We look forward to seeing you there!"
                }
              </p>
            </div>

            <div className="space-y-6">
              {userData.personalInfo && (
                <div className="p-4 bg-[#F9FBFF] rounded-lg">
                  <h3 className="font-semibold text-[#2D2D2D] mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Personal Information
                  </h3>
                  <div className="text-sm text-[#52585E] space-y-1">
                    <p>Name: {userData.personalInfo.fullName}</p>
                    <p>Email: {userData.personalInfo.email}</p>
                    <p>Mobile: {userData.personalInfo.mobile}</p>
                  </div>
                </div>
              )}

              {event.isPaid && userData.paymentInfo && (
                <div className="p-4 bg-[#F9FBFF] rounded-lg">
                  <h3 className="font-semibold text-[#2D2D2D] mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Payment Information
                  </h3>
                  <div className="text-sm text-[#52585E] space-y-1">
                    <p>Invoice Name: {userData.paymentInfo.invoiceName}</p>
                    <p>Amount: ₹{userData.paymentInfo.amount}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Button 
                variant="outline" 
                onClick={() => setEditingSection('personal')}
                className="border-[#0799FF] text-[#0799FF] hover:bg-blue-50"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Info
              </Button>
              <Button className="bg-[#0799FF] hover:bg-blue-600">
                Add to Calendar
              </Button>
              <Button 
                variant="outline"
                className="border-[#1C3A6A] text-[#1C3A6A] hover:bg-gray-50"
              >
                Download Invoice
              </Button>
              <Button 
                variant="ghost"
                onClick={() => window.location.href = '/'}
                className="text-[#52585E] hover:bg-gray-50"
              >
                Go to Homepage
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FBFF]">
      {/* Banner */}
      <div className="relative h-48 bg-gradient-to-r from-[#1C3A6A] to-[#0799FF] overflow-hidden">
        <img 
          src="/lovable-uploads/24448433-14b3-4796-8f41-8ba4e87474b3.png" 
          alt="Entrainment'25 Banner" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold mb-2">Entrainment'25</h1>
            <p className="text-lg opacity-90">All set for Entrainment'25, Aravind. Just a quick glance.</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-[#52585E] hover:bg-gray-50"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <span className="text-[#2D2D2D] font-medium">Registration</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMusicEnabled(!musicEnabled)}
            className={cn(
              "text-[#52585E] hover:bg-gray-50",
              musicEnabled && "text-[#0799FF]"
            )}
          >
            <Music className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-4xl mx-auto px-4">
          <RegistrationStepper steps={getSteps()} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {renderPersonalInfoSection()}
        {renderPaymentInfoSection()}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          {editingSection ? (
            <div className="text-center text-[#52585E]">
              <p className="text-sm">Make your changes above and click "Save Changes"</p>
            </div>
          ) : (
            <Button 
              onClick={handleSubmit}
              className="bg-[#0799FF] hover:bg-blue-600 px-8"
              disabled={!userData.personalInfo?.acceptedTerms}
            >
              {event.isPaid ? 'Proceed to Payment' : 'Complete Registration'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registration;
