
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth?: Date;
  gender: string;
  nationality: string;
  phoneNumber: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };
  medicalConditions: string;
  dietaryRequirements: string;
  terms: boolean;
  marketing: boolean;
}
