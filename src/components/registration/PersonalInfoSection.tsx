import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

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
  showPersonalizedTitle?: boolean;
  eventRequiresApproval?: boolean;
  columnLayout: 1 | 2 | 3;
  setColumnLayout: (layout: 1 | 2 | 3) => void;
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
  
  // Convert field labels to proper title case for display
  const formatFieldLabel = (label: string) => {
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
  
  // All form fields - no dynamic movement
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

  const getGridColumns = () => {
    switch (columnLayout) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 3:
        return 'grid-cols-1 md:grid-cols-3';
      default:
        return 'grid-cols-1 md:grid-cols-2';
    }
  };

  if (hasMeaningfulData && !isEditing) {
    return (
      <Card className="mb-6 border-0 shadow-sm bg-white">
        <CardHeader className="pb-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-lg font-medium text-gray-900">
                Review the details and update anything that needs realignment — <button 
                  onClick={() => setEditingSection('personal')}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  click here to edit
                </button>
              </CardTitle>
              
              {/* Column Layout Toggle */}
              <div className="flex items-center gap-2 mt-3">
                <span className="text-sm text-gray-500">View:</span>
                <Button
                  variant={columnLayout === 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setColumnLayout(1)}
                  className="h-7 px-3 text-xs rounded-full"
                >
                  1 Column
                </Button>
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
          <div className={`grid ${getGridColumns()} gap-6`}>
            {allFields.map(field => {
              const value = personalInfo?.[field.key as keyof PersonalInfo];
              return (
                <div key={field.key} className="space-y-2">
                  <Label className="text-xs font-medium text-gray-500 tracking-wide">
                    {formatFieldLabel(field.label)}
                  </Label>
                  <div className="text-sm text-gray-900 font-medium">
                    {field.type === 'date' && value instanceof Date
                      ? format(value, "PPP")
                      : value ? String(value) : 
                        <span className="text-gray-400 italic">Not provided</span>}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* T&C Checkbox */}
          <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-100 mt-6">
            <Checkbox
              id="terms-complete"
              checked={personalInfo?.acceptedTerms || false}
              onCheckedChange={(checked) => onPersonalInfoChange('acceptedTerms', checked)}
              className="mt-1"
            />
            <Label htmlFor="terms-complete" className="text-sm text-gray-700 leading-relaxed">
              I accept the terms and conditions{eventRequiresApproval ? ' and understand that this registration is subject to approval' : ''}
            </Label>
          </div>
        </CardContent>
      </Card>
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
        
        {!isEditing && (
          <div>
            <CardTitle className="text-lg font-medium text-gray-900">
              {hasMeaningfulData ? "We're almost there!" : "Welcome to Entrainment'25"}
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
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal h-10 border-gray-200 hover:bg-gray-50 rounded-md",
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
