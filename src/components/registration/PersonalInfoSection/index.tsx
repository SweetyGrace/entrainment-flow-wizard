import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/Card';
import { Input } from '@/common/components/Input';
import { Label } from '@/common/components/Label';
import { Textarea } from '@/common/components/Textarea';
import { Checkbox } from '@/common/components/Checkbox';
import { BirthDatePicker } from '@/common/components/BirthDatePicker';
import { format } from 'date-fns';
import styles from './index.module.css';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: Date | null;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  emergencyContact: string;
  emergencyPhone: string;
  dietaryRestrictions: string;
  medicalConditions: string;
  consent: boolean;
  newsletter: boolean;
}

const PersonalInfoSection: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: null,
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    emergencyContact: '',
    emergencyPhone: '',
    dietaryRestrictions: '',
    medicalConditions: '',
    consent: false,
    newsletter: false
  });

  const handleInputChange = (field: string, value: any) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardHeader className={styles.header}>
          <CardTitle className={styles.title}>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className={styles.content}>
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                type="text"
                value={personalInfo.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                type="text"
                value={personalInfo.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={personalInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={personalInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <Label htmlFor="birthDate">Date of Birth</Label>
              <BirthDatePicker
                date={personalInfo.birthDate}
                onDateChange={(date) => handleInputChange('birthDate', date)}
              />
            </div>

            <div className={styles.fullWidth}>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={personalInfo.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={styles.card}>
        <CardHeader className={styles.header}>
          <CardTitle className={styles.title}>Emergency Contact</CardTitle>
        </CardHeader>
        <CardContent className={styles.content}>
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
              <Input
                id="emergencyContact"
                type="text"
                value={personalInfo.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
              <Input
                id="emergencyPhone"
                type="tel"
                value={personalInfo.emergencyPhone}
                onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={styles.card}>
        <CardContent className={styles.content}>
          <div className={styles.checkboxGroup}>
            <Checkbox
              id="consent"
              checked={personalInfo.consent}
              onCheckedChange={(checked) => handleInputChange('consent', checked)}
            />
            <Label htmlFor="consent" className={styles.checkboxLabel}>
              I consent to the processing of my personal data *
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInfoSection;
