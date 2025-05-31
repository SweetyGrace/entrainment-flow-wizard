import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/Card';
import { Button } from '@/common/components/Button';
import { Input } from '@/common/components/Input';
import { Label } from '@/common/components/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/common/components/Select';
import { Textarea } from '@/common/components/Textarea';
import { Checkbox } from '@/common/components/Checkbox';
import { format } from 'date-fns';
import BirthDatePicker from '@/common/components/BirthDatePicker';
import styles from './index.module.css';

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

  // Static field definitions - fields are assigned based on initial data state
  const staticPreFilledFields = React.useMemo(() => {
    if (!personalInfo) return [];
    
    const allFields = [
      'fullName', 'gender', 'mobile', 'email', 'dateOfBirth', 
      'city', 'infinitheismContact', 'preferredRoommate', 'additionalNotes'
    ];
    
    return allFields.filter(field => 
      personalInfo[field as keyof PersonalInfo] && 
      personalInfo[field as keyof PersonalInfo] !== ''
    );
  }, [personalInfo?.fullName, personalInfo?.gender, personalInfo?.mobile, personalInfo?.email, personalInfo?.dateOfBirth, personalInfo?.city, personalInfo?.infinitheismContact, personalInfo?.preferredRoommate, personalInfo?.additionalNotes]);

  const staticMissingFields = React.useMemo(() => {
    const allFields = [
      'fullName', 'gender', 'mobile', 'email', 'dateOfBirth', 
      'city', 'infinitheismContact', 'preferredRoommate', 'additionalNotes'
    ];
    
    return allFields.filter(field => !staticPreFilledFields.includes(field));
  }, [staticPreFilledFields]);

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
    if (field === 'dateOfBirth' && value) {
      return format(value, "PPP");
    }
    return value;
  };

  const renderEmptyFieldInput = (field: string) => {
    switch (field) {
      case 'gender':
        return (
          <Select value="" onValueChange={(value) => onPersonalInfoChange(field, value)}>
            <SelectTrigger className={styles.select}>
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
          <BirthDatePicker
            value={undefined}
            onChange={(date) => onPersonalInfoChange(field, date)}
          />
        );
      case 'additionalNotes':
        return (
          <Textarea
            value=""
            onChange={(e) => onPersonalInfoChange(field, e.target.value)}
            className={styles.textarea}
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
            className={styles.input}
            placeholder={`Enter your ${formatFieldLabel(field).toLowerCase()}`}
          />
        );
    }
  };

  // If has data and not editing, show segregated sections
  if (hasMeaningfulData && !isEditing) {
    return (
      <div className={styles.container}>
        {/* Pre-filled Fields Section */}
        {staticPreFilledFields.length > 0 && (
          <Card className={styles.card}>
            <CardHeader className={styles.header}>
              <div className={styles.headerContent}>
                <div className={styles.headerLeft}>
                  <CardTitle className={styles.title}>
                    Review the details and update anything that needs realignment — <button 
                      onClick={() => setEditingSection('personal')}
                      className={styles.editButton}
                    >
                      click here to edit
                    </button>
                  </CardTitle>
                  
                  {/* Column Layout Toggle */}
                  <div className={styles.layoutToggle}>
                    <span className={styles.layoutLabel}>View:</span>
                    <Button
                      variant={columnLayout === 2 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setColumnLayout(2)}
                      className={styles.layoutButton}
                    >
                      2 Columns
                    </Button>
                    <Button
                      variant={columnLayout === 3 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setColumnLayout(3)}
                      className={styles.layoutButton}
                    >
                      3 Columns
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className={styles.contentEditing}>
              <div className={columnLayout === 2 ? styles.grid2 : styles.grid3}>
                {staticPreFilledFields.map((field) => (
                  <div key={field} className={styles.field}>
                    <Label className={styles.label}>
                      {formatFieldLabel(field)}
                    </Label>
                    <div className={styles.fieldValue}>
                      {renderFieldValue(field, personalInfo?.[field as keyof PersonalInfo])}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Missing Fields Section */}
        {staticMissingFields.length > 0 && (
          <Card className={styles.card}>
            <CardHeader className={styles.header}>
              <CardTitle className={styles.title}>
                Please fill the missing fields
              </CardTitle>
            </CardHeader>
            <CardContent className={styles.content}>
              <div className={columnLayout === 2 ? styles.grid2 : styles.grid3}>
                {staticMissingFields.map((field) => (
                  <div key={field} className={styles.field}>
                    <Label className={styles.labelEditing}>
                      {formatFieldLabel(field)}
                      {(field === 'preferredRoommate' || field === 'additionalNotes') && (
                        <span className={styles.optionalText}> (Optional)</span>
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
        <Card className={styles.termsCard}>
          <CardContent className={styles.termsContent}>
            <div className={styles.termsContainer}>
              <Checkbox
                id="terms"
                checked={personalInfo?.acceptedTerms || false}
                onCheckedChange={(checked) => onPersonalInfoChange('acceptedTerms', checked)}
                className={styles.termsCheckbox}
              />
              <Label htmlFor="terms" className={styles.termsLabel}>
                I accept the terms and conditions{eventRequiresApproval ? ' and understand that this registration is subject to approval' : ''}
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className={isEditing ? styles.cardEditing : styles.card}>
      <CardHeader className={styles.header}>
        {isEditing && (
          <div>
            <CardTitle className={styles.title}>
              {personalInfo?.fullName ? `Edit ${personalInfo.fullName}'s information` : 'Edit Personal Information'}
            </CardTitle>
          </div>
        )}
      </CardHeader>

      <CardContent className={styles.content}>
        <div className={styles.grid2}>
          <div className={styles.field}>
            <Label htmlFor="fullName" className={styles.labelEditing}>Full name</Label>
            <Input
              id="fullName"
              value={personalInfo?.fullName || ''}
              onChange={(e) => onPersonalInfoChange('fullName', e.target.value)}
              className={styles.input}
              placeholder="Enter your full name"
            />
          </div>
          <div className={styles.field}>
            <Label htmlFor="gender" className={styles.labelEditing}>Gender</Label>
            <Select value={personalInfo?.gender} onValueChange={(value) => onPersonalInfoChange('gender', value)}>
              <SelectTrigger className={styles.select}>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className={styles.grid2}>
          <div className={styles.field}>
            <Label htmlFor="mobile" className={styles.labelEditing}>Mobile number</Label>
            <Input
              id="mobile"
              value={personalInfo?.mobile || ''}
              onChange={(e) => onPersonalInfoChange('mobile', e.target.value)}
              className={styles.input}
              placeholder="Enter your mobile number"
            />
          </div>
          <div className={styles.field}>
            <Label htmlFor="email" className={styles.labelEditing}>Email address</Label>
            <Input
              id="email"
              type="email"
              value={personalInfo?.email || ''}
              onChange={(e) => onPersonalInfoChange('email', e.target.value)}
              className={styles.input}
              placeholder="Enter your email address"
            />
          </div>
        </div>

        <div className={styles.grid2}>
          <div className={styles.field}>
            <BirthDatePicker
              value={personalInfo?.dateOfBirth}
              onChange={(date) => onPersonalInfoChange('dateOfBirth', date)}
            />
          </div>
          <div className={styles.field}>
            <Label htmlFor="city" className={styles.labelEditing}>City</Label>
            <Input
              id="city"
              value={personalInfo?.city || ''}
              onChange={(e) => onPersonalInfoChange('city', e.target.value)}
              className={styles.input}
              placeholder="Enter your city"
            />
          </div>
        </div>

        <div className={styles.grid2}>
          <div className={styles.field}>
            <Label htmlFor="infinitheismContact" className={styles.labelEditing}>Infinitheism contact</Label>
            <Input
              id="infinitheismContact"
              value={personalInfo?.infinitheismContact || ''}
              onChange={(e) => onPersonalInfoChange('infinitheismContact', e.target.value)}
              className={styles.input}
              placeholder="Enter contact name"
            />
          </div>
          <div className={styles.field}>
            <Label htmlFor="preferredRoommate" className={styles.labelEditing}>
              Preferred roommate <span className={styles.optionalText}>(Optional)</span>
            </Label>
            <Input
              id="preferredRoommate"
              value={personalInfo?.preferredRoommate || ''}
              onChange={(e) => onPersonalInfoChange('preferredRoommate', e.target.value)}
              className={styles.input}
              placeholder="Enter roommate preference"
            />
          </div>
        </div>

        <div className={styles.field}>
          <Label htmlFor="additionalNotes" className={styles.labelEditing}>
            Note <span className={styles.optionalText}>(Optional)</span>
          </Label>
          <Textarea
            id="additionalNotes"
            value={personalInfo?.additionalNotes || ''}
            onChange={(e) => onPersonalInfoChange('additionalNotes', e.target.value)}
            className={styles.textarea}
            rows={3}
            placeholder="Any special requirements or notes..."
          />
        </div>

        {isEditing && (
          <div className={styles.actionButtons}>
            <Button 
              variant="outline"
              onClick={() => setEditingSection(null)}
              className={styles.cancelButton}
            >
              Cancel
            </Button>
            <Button 
              onClick={onSaveChanges}
              className={styles.saveButton}
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
