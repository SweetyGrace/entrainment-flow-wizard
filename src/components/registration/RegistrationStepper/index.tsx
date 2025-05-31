import React from 'react';
import { Button } from '@/common/components/Button';
import styles from './index.module.css';

interface RegistrationStepperProps {
  currentStep: number;
  totalSteps: number;
  handleNext: () => void;
  handleBack: () => void;
  isNextDisabled: boolean;
  isBackDisabled: boolean;
  children: React.ReactNode;
}

const RegistrationStepper: React.FC<RegistrationStepperProps> = ({
  currentStep,
  totalSteps,
  handleNext,
  handleBack,
  isNextDisabled,
  isBackDisabled,
  children,
}) => {
  return (
    <div className={styles.stepperContainer}>
      <div className={styles.stepContent}>{children}</div>

      <div className={styles.navigation}>
        <Button variant="secondary" onClick={handleBack} disabled={isBackDisabled}>
          Back
        </Button>
        <div className={styles.stepIndicator}>
          Step {currentStep + 1} of {totalSteps}
        </div>
        <Button onClick={handleNext} disabled={isNextDisabled}>
          {currentStep === totalSteps - 1 ? 'Complete' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default RegistrationStepper;
