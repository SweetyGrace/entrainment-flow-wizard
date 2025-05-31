
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from './index.module.css';

interface Step {
  id: number;
  title: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

interface RegistrationStepperProps {
  steps: Step[];
  className?: string;
}

const RegistrationStepper: React.FC<RegistrationStepperProps> = ({ steps, className }) => {
  return (
    <div className={cn(styles.container, className)}>
      {steps.map((step, index) => (
        <div key={step.id} className={styles.step}>
          <div className={styles.stepIndicator}>
            <div
              className={cn(
                styles.stepCircle,
                step.isCompleted
                  ? styles.stepCircleCompleted
                  : step.isCurrent
                  ? styles.stepCircleCurrent
                  : styles.stepCircleInactive
              )}
            >
              {step.isCompleted ? (
                <CheckCircle className={styles.stepIcon} />
              ) : (
                <span className={styles.stepNumber}>{step.id}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  styles.stepConnector,
                  step.isCompleted ? styles.stepConnectorCompleted : styles.stepConnectorInactive
                )}
              />
            )}
          </div>
          <div className={styles.stepContent}>
            <span
              className={cn(
                styles.stepTitle,
                step.isCompleted || step.isCurrent
                  ? styles.stepTitleActive
                  : styles.stepTitleInactive
              )}
            >
              {step.title}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RegistrationStepper;
