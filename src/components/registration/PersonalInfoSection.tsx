
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, User, Edit } from 'lucide-react';
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
  const dataState = hasData && Object.keys(personalInfo).length > 4 ? 'complete' : hasData ? 'partial' : 'new';

  if (hasData && !isEditing) {
    return (
      <Card className="mb-6 border-0 shadow-sm bg-white">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-medium text-gray-900">Personal Information</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Your basic details</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setEditingSection('personal')}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8 px-3 rounded-md"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {personalInfo?.fullName && (
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Full Name</Label>
                <div className="text-sm text-gray-900 font-medium">{personalInfo.fullName}</div>
              </div>
            )}
            {personalInfo?.email && (
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email Address</Label>
                <div className="text-sm text-gray-900 font-medium">{personalInfo.email}</div>
              </div>
            )}
            {personalInfo?.mobile && (
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Mobile Number</Label>
                <div className="text-sm text-gray-900 font-medium">{personalInfo.mobile}</div>
              </div>
            )}
            {personalInfo?.gender && (
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Gender</Label>
                <div className="text-sm text-gray-900 font-medium">{personalInfo.gender}</div>
              </div>
            )}
            {personalInfo?.city && (
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">City</Label>
                <div className="text-sm text-gray-900 font-medium">{personalInfo.city}</div>
              </div>
            )}
            {personalInfo?.dateOfBirth && (
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Date of Birth</Label>
                <div className="text-sm text-gray-900 font-medium">{format(personalInfo.dateOfBirth, "PPP")}</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6 border-0 shadow-sm bg-white">
      <CardHeader className="pb-6">
        {isEditing && (
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-medium text-gray-900">Edit Personal Information</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Update your details below</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setEditingSection(null)}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 h-8 px-3 rounded-md"
            >
              Cancel
            </Button>
          </div>
        )}
        
        {!isEditing && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-medium text-gray-900">
                {dataState === 'new' ? "Welcome to Entrainment'25" : "We're almost there, Aravind."}
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                {dataState === 'new' 
                  ? "Let's get your journey started with some basic information." 
                  : "Just a few quick things to wrap up your profile."}
              </p>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</Label>
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
            <Label htmlFor="mobile" className="text-sm font-medium text-gray-700">Mobile Number</Label>
            <Input
              id="mobile"
              value={personalInfo?.mobile || ''}
              onChange={(e) => onPersonalInfoChange('mobile', e.target.value)}
              className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your mobile number"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
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
            <Label className="text-sm font-medium text-gray-700">Date of Birth</Label>
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
            <Label htmlFor="infinitheismContact" className="text-sm font-medium text-gray-700">Infinitheism Contact</Label>
            <Input
              id="infinitheismContact"
              value={personalInfo?.infinitheismContact || ''}
              onChange={(e) => onPersonalInfoChange('infinitheismContact', e.target.value)}
              className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter contact name"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="preferredRoommate" className="text-sm font-medium text-gray-700">Preferred Roommate</Label>
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
          <Label htmlFor="additionalNotes" className="text-sm font-medium text-gray-700">Additional Notes</Label>
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
              Cancel
            </Button>
            <Button 
              onClick={() => setEditingSection(null)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
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
