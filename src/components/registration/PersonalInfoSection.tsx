
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, Edit } from 'lucide-react';

interface PersonalInfo {
  infinitheismContact?: string;
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
          <div className="space-y-6">
            {personalInfo?.infinitheismContact && (
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Infinitheism Contact</Label>
                <div className="text-sm text-gray-900 font-medium">{personalInfo.infinitheismContact}</div>
              </div>
            )}
            {personalInfo?.preferredRoommate && (
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preferred Roommate</Label>
                <div className="text-sm text-gray-900 font-medium">{personalInfo.preferredRoommate}</div>
              </div>
            )}
            {personalInfo?.additionalNotes && (
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Additional Notes</Label>
                <div className="text-sm text-gray-900 font-medium">{personalInfo.additionalNotes}</div>
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
              <CardTitle className="text-lg font-medium text-gray-900">Welcome to Entrainment'25</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Let's get your journey started with some basic information.</p>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
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
          <Label htmlFor="preferredRoommate" className="text-sm font-medium text-gray-700">
            Preferred Roommate <span className="text-gray-400 text-xs">(Optional)</span>
          </Label>
          <Input
            id="preferredRoommate"
            value={personalInfo?.preferredRoommate || ''}
            onChange={(e) => onPersonalInfoChange('preferredRoommate', e.target.value)}
            className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Enter roommate preference"
          />
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
