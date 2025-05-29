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

  const canProceedToPayment = () => {
    const hasRequiredPersonalInfo = userData.personalInfo?.fullName && 
                                   userData.personalInfo?.email && 
                                   userData.personalInfo?.mobile && 
                                   userData.personalInfo?.acceptedTerms;
    return hasRequiredPersonalInfo;
  };

  const renderPersonalInfoSection = () => {
    const dataState = getUserDataState();
    const hasData = userData.personalInfo && Object.keys(userData.personalInfo).length > 0;
    const isEditing = editingSection === 'personal';
    
    if (hasData && !isEditing) {
      return (
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-1">Personal Information</h3>
              <p className="text-sm text-gray-500">Your basic details</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setEditingSection('personal')}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-blue-200 rounded-full px-4"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {userData.personalInfo?.fullName && (
              <div className="space-y-1">
                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Full Name</Label>
                <div className="text-gray-900 font-medium">{userData.personalInfo.fullName}</div>
              </div>
            )}
            {userData.personalInfo?.email && (
              <div className="space-y-1">
                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email Address</Label>
                <div className="text-gray-900 font-medium">{userData.personalInfo.email}</div>
              </div>
            )}
            {userData.personalInfo?.mobile && (
              <div className="space-y-1">
                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Mobile Number</Label>
                <div className="text-gray-900 font-medium">{userData.personalInfo.mobile}</div>
              </div>
            )}
            {userData.personalInfo?.gender && (
              <div className="space-y-1">
                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Gender</Label>
                <div className="text-gray-900 font-medium">{userData.personalInfo.gender}</div>
              </div>
            )}
            {userData.personalInfo?.city && (
              <div className="space-y-1">
                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">City</Label>
                <div className="text-gray-900 font-medium">{userData.personalInfo.city}</div>
              </div>
            )}
            {userData.personalInfo?.dateOfBirth && (
              <div className="space-y-1">
                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Date of Birth</Label>
                <div className="text-gray-900 font-medium">{format(userData.personalInfo.dateOfBirth, "PPP")}</div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="mb-8">
        {isEditing && (
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-light text-gray-900 mb-2">Edit Personal Information</h3>
              <p className="text-gray-600">Update your details below</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setEditingSection(null)}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full px-4"
            >
              Cancel
            </Button>
          </div>
        )}
        
        {!isEditing && (
          <div className="mb-8">
            <h2 className="text-3xl font-light text-gray-900 mb-3">
              {dataState === 'new' ? "Welcome to Entrainment'25" : "We're almost there, Aravind."}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {dataState === 'new' 
                ? "Let's get your journey started with some basic information." 
                : "Just a few quick things to wrap up your profile."}
            </p>
          </div>
        )}

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</Label>
              <Input
                id="fullName"
                value={userData.personalInfo?.fullName || ''}
                onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                className="border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 focus:border-blue-500 focus:ring-0 bg-transparent text-lg"
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="gender" className="text-sm font-medium text-gray-700">Gender</Label>
              <Select value={userData.personalInfo?.gender} onValueChange={(value) => handlePersonalInfoChange('gender', value)}>
                <SelectTrigger className="border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 focus:border-blue-500 focus:ring-0 bg-transparent text-lg h-auto">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="mobile" className="text-sm font-medium text-gray-700">Mobile Number</Label>
              <Input
                id="mobile"
                value={userData.personalInfo?.mobile || ''}
                onChange={(e) => handlePersonalInfoChange('mobile', e.target.value)}
                className="border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 focus:border-blue-500 focus:ring-0 bg-transparent text-lg"
                placeholder="Enter your mobile number"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={userData.personalInfo?.email || ''}
                onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                className="border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 focus:border-blue-500 focus:ring-0 bg-transparent text-lg"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-left font-normal border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 text-lg h-auto hover:bg-transparent focus:border-blue-500",
                      !userData.personalInfo?.dateOfBirth && "text-gray-400"
                    )}
                  >
                    <CalendarIcon className="mr-3 h-5 w-5 text-gray-400" />
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
            <div className="space-y-3">
              <Label htmlFor="city" className="text-sm font-medium text-gray-700">City</Label>
              <Input
                id="city"
                value={userData.personalInfo?.city || ''}
                onChange={(e) => handlePersonalInfoChange('city', e.target.value)}
                className="border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 focus:border-blue-500 focus:ring-0 bg-transparent text-lg"
                placeholder="Enter your city"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="infinitheismContact" className="text-sm font-medium text-gray-700">Infinitheism Contact</Label>
              <Input
                id="infinitheismContact"
                value={userData.personalInfo?.infinitheismContact || ''}
                onChange={(e) => handlePersonalInfoChange('infinitheismContact', e.target.value)}
                className="border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 focus:border-blue-500 focus:ring-0 bg-transparent text-lg"
                placeholder="Enter contact name"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="preferredRoommate" className="text-sm font-medium text-gray-700">Preferred Roommate</Label>
              <Input
                id="preferredRoommate"
                value={userData.personalInfo?.preferredRoommate || ''}
                onChange={(e) => handlePersonalInfoChange('preferredRoommate', e.target.value)}
                className="border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 focus:border-blue-500 focus:ring-0 bg-transparent text-lg"
                placeholder="Enter roommate preference"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="additionalNotes" className="text-sm font-medium text-gray-700">Additional Notes</Label>
            <Textarea
              id="additionalNotes"
              value={userData.personalInfo?.additionalNotes || ''}
              onChange={(e) => handlePersonalInfoChange('additionalNotes', e.target.value)}
              className="border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 focus:border-blue-500 focus:ring-0 bg-transparent text-lg resize-none"
              rows={3}
              placeholder="Any special requirements or notes..."
            />
          </div>

          <div className="flex items-start space-x-3 pt-4">
            <Checkbox
              id="terms"
              checked={userData.personalInfo?.acceptedTerms || false}
              onCheckedChange={(checked) => handlePersonalInfoChange('acceptedTerms', checked)}
              className="mt-1"
            />
            <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
              I accept the terms and conditions and understand that this registration is subject to approval
            </Label>
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-4 pt-8 border-t border-gray-100">
              <Button 
                variant="ghost"
                onClick={() => setEditingSection(null)}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full px-6"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => setEditingSection(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderPaymentInfoSection = () => {
    if (!event.isPaid) return null;

    const hasData = userData.paymentInfo && Object.keys(userData.paymentInfo).length > 0;
    const isEditing = editingSection === 'payment';
    
    if (hasData && !isEditing) {
      return (
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-1">Invoice Details</h3>
              <p className="text-sm text-gray-500">Your billing information</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setEditingSection('payment')}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-blue-200 rounded-full px-4"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {userData.paymentInfo?.invoiceName && (
              <div className="space-y-1">
                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Invoice Name</Label>
                <div className="text-gray-900 font-medium">{userData.paymentInfo.invoiceName}</div>
              </div>
            )}
            {userData.paymentInfo?.invoiceEmail && (
              <div className="space-y-1">
                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Invoice Email</Label>
                <div className="text-gray-900 font-medium">{userData.paymentInfo.invoiceEmail}</div>
              </div>
            )}
            {userData.paymentInfo?.amount && (
              <div className="space-y-1">
                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Amount</Label>
                <div className="text-gray-900 font-medium">₹{userData.paymentInfo.amount}</div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="mb-8">
        {isEditing && (
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-light text-gray-900 mb-2">Edit Invoice Details</h3>
              <p className="text-gray-600">Update your billing information</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setEditingSection(null)}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full px-4"
            >
              Cancel
            </Button>
          </div>
        )}

        {!isEditing && (
          <div className="mb-8">
            <h3 className="text-2xl font-light text-gray-900 mb-3">Invoice Details</h3>
            <p className="text-lg text-gray-600 leading-relaxed">We need some billing information for your registration.</p>
          </div>
        )}

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="invoiceName" className="text-sm font-medium text-gray-700">Name for Invoice</Label>
              <Input
                id="invoiceName"
                value={userData.paymentInfo?.invoiceName || ''}
                onChange={(e) => handlePaymentInfoChange('invoiceName', e.target.value)}
                className="border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 focus:border-blue-500 focus:ring-0 bg-transparent text-lg"
                placeholder="Enter name for invoice"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="invoiceEmail" className="text-sm font-medium text-gray-700">Email for Invoice</Label>
              <Input
                id="invoiceEmail"
                type="email"
                value={userData.paymentInfo?.invoiceEmail || ''}
                onChange={(e) => handlePaymentInfoChange('invoiceEmail', e.target.value)}
                className="border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 focus:border-blue-500 focus:ring-0 bg-transparent text-lg"
                placeholder="Enter email for invoice"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="gstRegistered"
                checked={userData.paymentInfo?.gstRegistered || false}
                onCheckedChange={(checked) => handlePaymentInfoChange('gstRegistered', checked)}
              />
              <Label htmlFor="gstRegistered" className="text-sm font-medium text-gray-700">GST Registered?</Label>
            </div>

            {userData.paymentInfo?.gstRegistered && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-6 border-l-2 border-blue-100">
                <div className="space-y-3">
                  <Label htmlFor="gstin" className="text-sm font-medium text-gray-700">GSTIN</Label>
                  <Input
                    id="gstin"
                    value={userData.paymentInfo?.gstin || ''}
                    onChange={(e) => handlePaymentInfoChange('gstin', e.target.value)}
                    className="border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 focus:border-blue-500 focus:ring-0 bg-transparent text-lg"
                    placeholder="Enter GSTIN"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="tdsPercent" className="text-sm font-medium text-gray-700">TDS %</Label>
                  <Input
                    id="tdsPercent"
                    value={userData.paymentInfo?.tdsPercent || ''}
                    onChange={(e) => handlePaymentInfoChange('tdsPercent', e.target.value)}
                    className="border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 focus:border-blue-500 focus:ring-0 bg-transparent text-lg"
                    placeholder="Enter TDS percentage"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="address" className="text-sm font-medium text-gray-700">Address</Label>
            <Textarea
              id="address"
              value={userData.paymentInfo?.address || ''}
              onChange={(e) => handlePaymentInfoChange('address', e.target.value)}
              className="border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 focus:border-blue-500 focus:ring-0 bg-transparent text-lg resize-none"
              rows={3}
              placeholder="Enter your complete address..."
            />
          </div>

          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Total Amount:</span>
              <span className="text-3xl font-light text-blue-600">₹{event.amount}</span>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-4 pt-8 border-t border-gray-100">
              <Button 
                variant="ghost"
                onClick={() => setEditingSection(null)}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full px-6"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => setEditingSection(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const getSteps = () => {
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
      <div className="min-h-screen bg-gray-50">
        {/* Banner */}
        <div className="relative h-64 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 overflow-hidden">
          <img 
            src="/lovable-uploads/24448433-14b3-4796-8f41-8ba4e87474b3.png" 
            alt="Entrainment'25 Banner" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-light mb-3">Registration Complete</h1>
              <p className="text-xl opacity-90 font-light">Thank you for joining Entrainment'25</p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-light text-gray-900 mb-4">
                {event.requiresApproval ? "Awaiting Mahatria's Approval" : "You're All Set!"}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
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

            <div className="flex flex-wrap gap-4 justify-center mt-10">
              <Button 
                variant="outline" 
                onClick={() => setEditingSection('personal')}
                className="border-blue-200 text-blue-600 hover:bg-blue-50 rounded-full px-6"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Info
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
                Add to Calendar
              </Button>
              <Button 
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full px-6"
              >
                Download Invoice
              </Button>
              <Button 
                variant="ghost"
                onClick={() => window.location.href = '/'}
                className="text-gray-500 hover:bg-gray-100 rounded-full px-6"
              >
                Go to Homepage
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="relative h-64 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 overflow-hidden">
        <img 
          src="/lovable-uploads/24448433-14b3-4796-8f41-8ba4e87474b3.png" 
          alt="Entrainment'25 Banner" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-light mb-3">Entrainment'25</h1>
            <p className="text-xl opacity-90 font-light">Your journey of awakening begins here</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <span className="text-gray-900 font-medium">Registration</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMusicEnabled(!musicEnabled)}
            className={cn(
              "text-gray-600 hover:bg-gray-100 rounded-full",
              musicEnabled && "text-blue-600 bg-blue-50"
            )}
          >
            <Music className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content - Side by Side Layout */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex gap-12">
          {/* Left Side - Stepper */}
          <div className="w-80 flex-shrink-0">
            <div className="sticky top-32">
              <RegistrationStepper steps={getSteps()} />
            </div>
          </div>

          {/* Right Side - Form Content */}
          <div className="flex-1">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-8">
              {renderPersonalInfoSection()}
              
              {/* Terms and Conditions Checkbox */}
              {canProceedToPayment() && event.isPaid && !userData.paymentInfo && (
                <div className="mb-8 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="termsConditions"
                      checked={userData.personalInfo?.acceptedTerms || false}
                      onCheckedChange={(checked) => handlePersonalInfoChange('acceptedTerms', checked)}
                      className="mt-1"
                    />
                    <Label htmlFor="termsConditions" className="text-sm text-gray-700 leading-relaxed">
                      I agree to the terms and conditions, privacy policy, and understand that this registration is subject to approval by Mahatria. I consent to the processing of my personal data for registration purposes.
                    </Label>
                  </div>
                </div>
              )}

              {renderPaymentInfoSection()}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center">
              {editingSection ? (
                <div className="text-center text-gray-600">
                  <p className="text-sm">Make your changes above and click "Save Changes"</p>
                </div>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={!canProceedToPayment()}
                >
                  {event.isPaid ? 'Proceed to Payment' : 'Complete Registration'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
