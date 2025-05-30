
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

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

interface PersonalInfoSectionProps {
  personalInfo?: PersonalInfo;
  onPersonalInfoChange: (field: string, value: any) => void;
  editingSection: string | null;
  setEditingSection: (section: string | null) => void;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  personalInfo,
  onPersonalInfoChange,
  editingSection,
  setEditingSection
}) => {
  const hasData = personalInfo && Object.keys(personalInfo).length > 0;
  const isEditing = editingSection === 'personal';
  
  // Generate personalized title
  const generatePersonalizedTitle = (fullName: string) => {
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
  };

  // Generate personalized title for missing information
  const generateMissingInfoTitle = (fullName?: string) => {
    if (fullName) {
      const variations = [
        `${fullName}, let's complete your remaining details`,
        `${fullName}, just a few more details needed`,
        `${fullName}, help us finish your profile`,
        `${fullName}, we're almost done with your profile`,
        `${fullName}, let's add the missing information`
      ];
      const index = fullName.length % variations.length;
      return variations[index];
    }
    return 'Missing information';
  };

  // Convert field labels to proper title case for display
  const formatFieldLabel = (label: string) => {
    // Map of field keys to proper title case labels
    const titleCaseLabels = {
      'FULL NAME': 'Full name',
      'GENDER': 'Gender',
      'MOBILE NUMBER': 'Mobile number',
      'EMAIL ADDRESS': 'Email address',
      'DATE OF BIRTH': 'Date of birth',
      'CITY': 'City',
      'INFINITHEISM CONTACT': 'Infinitheism contact',
      'PREFERRED ROOMMATE': 'Preferred roommate',
      'NOTE': 'Note'
    };
    
    return titleCaseLabels[label] || label.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };
  
  // Check which fields are filled and unfilled
  const filledFields = [];
  const unfilledFields = [];
  
  const allFields = [
    { key: 'fullName', label: 'FULL NAME', type: 'text' },
    { key: 'gender', label: 'GENDER', type: 'select' },
    { key: 'mobile', label: 'MOBILE NUMBER', type: 'text' },
    { key: 'email', label: 'EMAIL ADDRESS', type: 'email' },
    { key: 'dateOfBirth', label: 'DATE OF BIRTH', type: 'date' },
    { key: 'city', label: 'CITY', type: 'text' },
    { key: 'infinitheismContact', label: 'INFINITHEISM CONTACT', type: 'text' },
    { key: 'preferredRoommate', label: 'PREFERRED ROOMMATE', type: 'text', optional: true },
    { key: 'additionalNotes', label: 'NOTE', type: 'textarea', optional: true }
  ];
  
  if (hasData) {
    allFields.forEach(field => {
      if (personalInfo?.[field.key as keyof PersonalInfo]) {
        filledFields.push(field);
      } else {
        unfilledFields.push(field);
      }
    });
  }
  
  const dataState = hasData && filledFields.length > 4 ? 'complete' : hasData && filledFields.length > 0 ? 'partial' : 'new';

  if (hasData && !isEditing) {
    return (
      <>
        {/* Filled Fields Section */}
        {filledFields.length > 0 && (
          <Card className="mb-6 border-0 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-lg font-medium text-gray-900">
                      {personalInfo?.fullName ? generatePersonalizedTitle(personalInfo.fullName) : 'Personal Information'}
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setEditingSection('personal')}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8 px-3 rounded-md"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      edit
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Your basic details</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filledFields.map(field => (
                  <div key={field.key} className="space-y-2">
                    <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {formatFieldLabel(field.label)}
                    </Label>
                    <div className="text-sm text-gray-900 font-medium">
                      {field.type === 'date' && personalInfo?.[field.key as keyof PersonalInfo] instanceof Date
                        ? format(personalInfo[field.key as keyof PersonalInfo] as Date, "PPP")
                        : String(personalInfo?.[field.key as keyof PersonalInfo] || '')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Unfilled Fields Section */}
        {unfilledFields.length > 0 && (
          <Card className="mb-6 border-0 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-lg font-medium text-gray-900">
                      {generateMissingInfoTitle(personalInfo?.fullName)}
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setEditingSection('personal')}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8 px-3 rounded-md"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      edit
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Complete your profile</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-6">
                {unfilledFields.map(field => (
                  <div key={field.key} className="space-y-3">
                    <Label htmlFor={field.key} className="text-sm font-medium text-gray-700">
                      {formatFieldLabel(field.label)}
                      {field.optional && <span className="text-gray-400 text-xs ml-1">(Optional)</span>}
                    </Label>
                    
                    {field.type === 'select' && field.key === 'gender' ? (
                      <Select value={personalInfo?.gender} onValueChange={(value) => onPersonalInfoChange('gender', value)}>
                        <SelectTrigger className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : field.type === 'date' ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal h-10 border-gray-200 hover:bg-gray-50",
                              !personalInfo?.dateOfBirth && "text-gray-400"
                            )}
                          >
                            <CalendarIcon className="mr-3 h-4 w-4 text-gray-400" />
                            {personalInfo?.dateOfBirth ? format(personalInfo.dateOfBirth, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={personalInfo?.dateOfBirth}
                            onSelect={(date) => onPersonalInfoChange('dateOfBirth', date)}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    ) : field.type === 'textarea' ? (
                      <Textarea
                        id={field.key}
                        value={personalInfo?.[field.key as keyof PersonalInfo] as string || ''}
                        onChange={(e) => onPersonalInfoChange(field.key, e.target.value)}
                        className="border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                        rows={3}
                        placeholder={`Enter ${formatFieldLabel(field.label).toLowerCase()}...`}
                      />
                    ) : (
                      <Input
                        id={field.key}
                        type={field.type}
                        value={personalInfo?.[field.key as keyof PersonalInfo] as string || ''}
                        onChange={(e) => onPersonalInfoChange(field.key, e.target.value)}
                        className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder={`Enter your ${formatFieldLabel(field.label).toLowerCase()}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </>
    );
  }

  return (
    <Card className="mb-6 border-0 shadow-sm bg-white">
      <CardHeader className="pb-6">
        {isEditing && (
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <CardTitle className="text-lg font-medium text-gray-900">
                  {personalInfo?.fullName ? `Edit ${personalInfo.fullName}'s information` : 'Edit Personal Information'}
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setEditingSection(null)}
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 h-8 px-3 rounded-md"
                >
                  cancel
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-1">Update your details below</p>
            </div>
          </div>
        )}
        
        {!isEditing && (
          <div>
            <CardTitle className="text-lg font-medium text-gray-900">
              {dataState === 'new' ? "Welcome to Entrainment'25" : "We're almost there!"}
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              {dataState === 'new' 
                ? "Let's get your journey started with some basic information." 
                : "Just a few quick things to wrap up your profile."}
            </p>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full name</Label>
            <Input
              id="fullName"
              value={personalInfo?.fullName || ''}
              onChange={(e) => onPersonalInfoChange('fullName', e.target.value)}
              className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="gender" className="text-sm font-medium text-gray-700">Gender</Label>
            <Select value={personalInfo?.gender} onValueChange={(value) => onPersonalInfoChange('gender', value)}>
              <SelectTrigger className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
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
            <Label htmlFor="mobile" className="text-sm font-medium text-gray-700">Mobile number</Label>
            <Input
              id="mobile"
              value={personalInfo?.mobile || ''}
              onChange={(e) => onPersonalInfoChange('mobile', e.target.value)}
              className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your mobile number"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</Label>
            <Input
              id="email"
              type="email"
              value={personalInfo?.email || ''}
              onChange={(e) => onPersonalInfoChange('email', e.target.value)}
              className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your email address"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Date of birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal h-10 border-gray-200 hover:bg-gray-50",
                    !personalInfo?.dateOfBirth && "text-gray-400"
                  )}
                >
                  <CalendarIcon className="mr-3 h-4 w-4 text-gray-400" />
                  {personalInfo?.dateOfBirth ? format(personalInfo.dateOfBirth, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={personalInfo?.dateOfBirth}
                  onSelect={(date) => onPersonalInfoChange('dateOfBirth', date)}
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
              value={personalInfo?.city || ''}
              onChange={(e) => onPersonalInfoChange('city', e.target.value)}
              className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your city"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="infinitheismContact" className="text-sm font-medium text-gray-700">Infinitheism contact</Label>
            <Input
              id="infinitheismContact"
              value={personalInfo?.infinitheismContact || ''}
              onChange={(e) => onPersonalInfoChange('infinitheismContact', e.target.value)}
              className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter contact name"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="preferredRoommate" className="text-sm font-medium text-gray-700">
              Preferred roommate <span className="text-gray-400 text-xs">(Optional)</span>
            </Label>
            <Input
              id="preferredRoommate"
              value={personalInfo?.preferredRoommate || ''}
              onChange={(e) => onPersonalInfoChange('preferredRoommate', e.target.value)}
              className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter roommate preference"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="additionalNotes" className="text-sm font-medium text-gray-700">
            Note <span className="text-gray-400 text-xs">(Optional)</span>
          </Label>
          <Textarea
            id="additionalNotes"
            value={personalInfo?.additionalNotes || ''}
            onChange={(e) => onPersonalInfoChange('additionalNotes', e.target.value)}
            className="border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
            rows={3}
            placeholder="Any special requirements or notes..."
          />
        </div>

        {isEditing && (
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
            <Button 
              variant="outline"
              onClick={() => setEditingSection(null)}
              className="px-6"
            >
              cancel
            </Button>
            <Button 
              onClick={() => setEditingSection(null)}
              className="relative overflow-hidden px-8 py-3 text-base font-medium rounded-full text-white border-0 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
              style={{
                backgroundImage: `url('/lovable-uploads/203da045-4558-4833-92ac-07479a336dfb.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <span className="relative z-10">save changes</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PersonalInfoSection;
