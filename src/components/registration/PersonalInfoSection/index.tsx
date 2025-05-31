
import React, { useState } from 'react';
import { Input } from '@/common/components/Input';
import { Label } from '@/common/components/Label';
import { Button } from '@/common/components/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/common/components/Select';
import { BirthDatePicker } from '@/common/components/BirthDatePicker';
import { format } from './utils';
import { PersonalInfo } from './types';
import { Textarea } from '@/common/components/Textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/Card';
import { Checkbox } from '@/common/components/Checkbox';

interface PersonalInfoSectionProps {
  onSubmit: (data: PersonalInfo) => void;
  onBack: () => void;
  initialData?: Partial<PersonalInfo>;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  onSubmit,
  onBack,
  initialData = {}
}) => {
  const [formData, setFormData] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: undefined,
    gender: '',
    nationality: '',
    phoneNumber: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phoneNumber: '',
    },
    medicalConditions: '',
    dietaryRequirements: '',
    terms: false,
    marketing: false,
    ...initialData
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PersonalInfo, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof PersonalInfo, string>> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.nationality) newErrors.nationality = 'Nationality is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.emergencyContact.name.trim()) newErrors.emergencyContact = 'Emergency contact name is required';
    if (!formData.emergencyContact.relationship.trim()) newErrors.emergencyContact = 'Emergency contact relationship is required';
    if (!formData.emergencyContact.phoneNumber.trim()) newErrors.emergencyContact = 'Emergency contact phone is required';
    if (!formData.terms) newErrors.terms = 'You must accept the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const updateField = <K extends keyof PersonalInfo>(field: K, value: PersonalInfo[K]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const updateEmergencyContact = <K extends keyof PersonalInfo['emergencyContact']>(
    field: K, 
    value: PersonalInfo['emergencyContact'][K]
  ) => {
    setFormData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value
      }
    }));
    if (errors.emergencyContact) {
      setErrors(prev => ({
        ...prev,
        emergencyContact: undefined
      }));
    }
  };

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  const relationshipOptions = [
    'Parent', 'Guardian', 'Spouse', 'Partner', 'Sibling', 'Friend', 'Other'
  ];

  const nationalityOptions = [
    'British', 'American', 'Canadian', 'Australian', 'German', 'French', 'Spanish', 'Italian', 'Other'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Please provide your personal details</p>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                className={errors.firstName ? 'border-red-500' : ''}
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                className={errors.lastName ? 'border-red-500' : ''}
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <BirthDatePicker
              value={formData.dateOfBirth}
              onChange={(date) => updateField('dateOfBirth', date)}
              error={errors.dateOfBirth}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Gender *</Label>
              <Select value={formData.gender} onValueChange={(value) => updateField('gender', value)}>
                <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {genderOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>

            <div>
              <Label>Nationality *</Label>
              <Select value={formData.nationality} onValueChange={(value) => updateField('nationality', value)}>
                <SelectTrigger className={errors.nationality ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent>
                  {nationalityOptions.map(nationality => (
                    <SelectItem key={nationality} value={nationality}>
                      {nationality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="phoneNumber">Phone Number *</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => updateField('phoneNumber', e.target.value)}
              className={errors.phoneNumber ? 'border-red-500' : ''}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="emergencyContactName">Contact Name *</Label>
            <Input
              id="emergencyContactName"
              value={formData.emergencyContact.name}
              onChange={(e) => updateEmergencyContact('name', e.target.value)}
              className={errors.emergencyContact ? 'border-red-500' : ''}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Relationship *</Label>
              <Select 
                value={formData.emergencyContact.relationship} 
                onValueChange={(value) => updateEmergencyContact('relationship', value)}
              >
                <SelectTrigger className={errors.emergencyContact ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  {relationshipOptions.map(relationship => (
                    <SelectItem key={relationship} value={relationship}>
                      {relationship}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="emergencyContactPhone">Phone Number *</Label>
              <Input
                id="emergencyContactPhone"
                type="tel"
                value={formData.emergencyContact.phoneNumber}
                onChange={(e) => updateEmergencyContact('phoneNumber', e.target.value)}
                className={errors.emergencyContact ? 'border-red-500' : ''}
              />
            </div>
          </div>

          {errors.emergencyContact && <p className="text-red-500 text-sm">{errors.emergencyContact}</p>}
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="medicalConditions">Medical Conditions</Label>
            <p className="text-sm text-gray-600 mb-2">
              Please list any medical conditions, allergies, or medications we should be aware of
            </p>
            <Textarea
              id="medicalConditions"
              value={formData.medicalConditions}
              onChange={(e) => updateField('medicalConditions', e.target.value)}
              placeholder="e.g., Asthma, food allergies, diabetes..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="dietaryRequirements">Dietary Requirements</Label>
            <p className="text-sm text-gray-600 mb-2">
              Please specify any dietary requirements or food allergies
            </p>
            <Textarea
              id="dietaryRequirements"
              value={formData.dietaryRequirements}
              onChange={(e) => updateField('dietaryRequirements', e.target.value)}
              placeholder="e.g., Vegetarian, vegan, gluten-free, nut allergy..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={formData.terms}
                onCheckedChange={(checked) => updateField('terms', !!checked)}
                className={errors.terms ? 'border-red-500' : ''}
              />
              <div className="text-sm">
                <label htmlFor="terms" className="cursor-pointer">
                  I agree to the{' '}
                  <button type="button" className="text-blue-600 hover:underline">
                    Terms and Conditions
                  </button>{' '}
                  and{' '}
                  <button type="button" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </button>{' '}
                  *
                </label>
                {errors.terms && <p className="text-red-500 mt-1">{errors.terms}</p>}
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="marketing"
                checked={formData.marketing}
                onCheckedChange={(checked) => updateField('marketing', !!checked)}
              />
              <label htmlFor="marketing" className="text-sm cursor-pointer">
                I would like to receive email updates about future programmes and events
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          Back
        </Button>
        <Button type="submit">
          Continue to Payment
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfoSection;
