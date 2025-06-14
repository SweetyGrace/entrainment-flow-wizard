
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import BirthDateInputs from './BirthDateInputs';

interface PersonalInfo {
  fullName?: string;
  gender?: string;
  mobile?: string;
  email?: string;
  birthDay?: string;
  birthMonth?: string;
  birthYear?: string;
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
  showPersonalizedTitle?: boolean;
  eventRequiresApproval?: boolean;
  columnLayout: 2 | 3;
  setColumnLayout: (layout: 2 | 3) => void;
  onSaveChanges: () => void;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  personalInfo,
  onPersonalInfoChange,
  editingSection,
  setEditingSection,
  showPersonalizedTitle = true,
  eventRequiresApproval = false,
  columnLayout,
  setColumnLayout,
  onSaveChanges
}) => {
  const isEditing = editingSection === 'personal';
  
  // Check if we have meaningful data (not just infinitheismContact)
  const hasMeaningfulData = personalInfo && Object.keys(personalInfo).some(key => 
    key !== 'infinitheismContact' && personalInfo[key as keyof PersonalInfo]
  );

  // Define all fields
  const allFields = [
    'fullName', 'gender', 'mobile', 'email', 'dateOfBirth', 
    'city', 'infinitheismContact', 'preferredRoommate', 'additionalNotes'
  ];

  // Separate filled and empty fields
  const filledFields = allFields.filter(field => {
    if (field === 'dateOfBirth') {
      return personalInfo?.birthDay && personalInfo?.birthMonth && personalInfo?.birthYear;
    }
    return personalInfo?.[field as keyof PersonalInfo] && 
           personalInfo[field as keyof PersonalInfo] !== '';
  });

  const emptyFields = allFields.filter(field => {
    if (field === 'dateOfBirth') {
      return !personalInfo?.birthDay || !personalInfo?.birthMonth || !personalInfo?.birthYear;
    }
    return !personalInfo?.[field as keyof PersonalInfo] || 
           personalInfo[field as keyof PersonalInfo] === '';
  });

  // Convert field labels to proper title case for display
  const formatFieldLabel = (label: string) => {
    const titleCaseLabels = {
      'fullName': 'Full name',
      'gender': 'Gender',
      'mobile': 'Mobile number',
      'email': 'Email address',
      'dateOfBirth': 'Date of birth',
      'city': 'City',
      'infinitheismContact': 'Infinitheism contact',
      'preferredRoommate': 'Preferred roommate',
      'additionalNotes': 'Note'
    };
    
    return titleCaseLabels[label] || label;
  };

  const renderFieldValue = (field: string, value: any) => {
    if (field === 'dateOfBirth') {
      const { birthDay, birthMonth, birthYear } = personalInfo || {};
      if (birthDay && birthMonth && birthYear) {
        const months = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const monthName = months[parseInt(birthMonth) - 1];
        return `${birthDay} ${monthName} ${birthYear}`;
      }
      return '';
    }
    return value;
  };

  const renderEmptyFieldInput = (field: string) => {
    switch (field) {
      case 'gender':
        return (
          <Select value="" onValueChange={(value) => onPersonalInfoChange(field, value)}>
            <SelectTrigger className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        );
      case 'dateOfBirth':
        return (
          <BirthDateInputs
            birthDay={personalInfo?.birthDay}
            birthMonth={personalInfo?.birthMonth}
            birthYear={personalInfo?.birthYear}
            onDayChange={(day) => onPersonalInfoChange('birthDay', day)}
            onMonthChange={(month) => onPersonalInfoChange('birthMonth', month)}
            onYearChange={(year) => onPersonalInfoChange('birthYear', year)}
          />
        );
      case 'additionalNotes':
        return (
          <Textarea
            value=""
            onChange={(e) => onPersonalInfoChange(field, e.target.value)}
            className="border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
            rows={3}
            placeholder="Any special requirements or notes..."
          />
        );
      default:
        return (
          <Input
            type={field === 'email' ? 'email' : 'text'}
            value=""
            onChange={(e) => onPersonalInfoChange(field, e.target.value)}
            className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder={`Enter your ${formatFieldLabel(field).toLowerCase()}`}
          />
        );
    }
  };

  // If has data and not editing, show segregated sections
  if (hasMeaningfulData && !isEditing) {
    return (
      <div className="space-y-6">
        {/* Pre-filled Fields Section */}
        {filledFields.length > 0 && (
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg font-medium text-gray-900 mb-3">
                    Review the details and update anything that needs realignment — <button 
                      onClick={() => setEditingSection('personal')}
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      click here to edit
                    </button>
                  </CardTitle>
                  
                  {/* Column Layout Toggle */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">View:</span>
                    <Button
                      variant={columnLayout === 2 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setColumnLayout(2)}
                      className="h-7 px-3 text-xs rounded-full"
                    >
                      2 Columns
                    </Button>
                    <Button
                      variant={columnLayout === 3 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setColumnLayout(3)}
                      className="h-7 px-3 text-xs rounded-full"
                    >
                      3 Columns
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className={`grid grid-cols-1 ${columnLayout === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
                {filledFields.map((field) => (
                  <div key={field} className="space-y-3">
                    <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {formatFieldLabel(field)}
                    </Label>
                    <div className="text-sm text-gray-900 font-medium">
                      {renderFieldValue(field, personalInfo?.[field as keyof PersonalInfo])}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Missing Fields Section */}
        {emptyFields.length > 0 && (
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="pb-6">
              <CardTitle className="text-lg font-medium text-gray-900">
                Please fill the missing fields
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className={`grid grid-cols-1 ${columnLayout === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
                {emptyFields.map((field) => (
                  <div key={field} className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">
                      {formatFieldLabel(field)}
                      {(field === 'preferredRoommate' || field === 'additionalNotes') && (
                        <span className="text-gray-400 text-xs"> (Optional)</span>
                      )}
                    </Label>
                    {renderEmptyFieldInput(field)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* T&C Checkbox - Always show at bottom */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <Checkbox
                id="terms"
                checked={personalInfo?.acceptedTerms || false}
                onCheckedChange={(checked) => onPersonalInfoChange('acceptedTerms', checked)}
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                I accept the terms and conditions{eventRequiresApproval ? ' and understand that this registration is subject to approval' : ''}
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className={`mb-6 border-0 shadow-sm ${isEditing ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}>
      <CardHeader className="pb-6">
        {isEditing && (
          <div>
            <CardTitle className="text-lg font-medium text-gray-900">
              {personalInfo?.fullName ? `Edit ${personalInfo.fullName}'s information` : 'Edit Personal Information'}
            </CardTitle>
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
            <BirthDateInputs
              birthDay={personalInfo?.birthDay}
              birthMonth={personalInfo?.birthMonth}
              birthYear={personalInfo?.birthYear}
              onDayChange={(day) => onPersonalInfoChange('birthDay', day)}
              onMonthChange={(month) => onPersonalInfoChange('birthMonth', month)}
              onYearChange={(year) => onPersonalInfoChange('birthYear', year)}
            />
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
              className="px-6 rounded-full"
            >
              Cancel
            </Button>
            <Button 
              onClick={onSaveChanges}
              className="px-6 rounded-full"
            >
              Save Changes
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PersonalInfoSection;
