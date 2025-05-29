
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <div className={cn("flex items-center justify-between w-full max-w-2xl mx-auto", className)}>
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                step.isCompleted
                  ? "bg-blue-600 border-blue-600 text-white shadow-md"
                  : step.isCurrent
                  ? "bg-white border-blue-600 text-blue-600 shadow-md"
                  : "bg-gray-100 border-gray-300 text-gray-500"
              )}
            >
              {step.isCompleted ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <span className="text-sm font-semibold">{step.id}</span>
              )}
            </div>
            <span
              className={cn(
                "mt-3 text-sm font-medium",
                step.isCompleted || step.isCurrent
                  ? "text-gray-900"
                  : "text-gray-500"
              )}
            >
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "flex-1 h-0.5 mx-4 transition-colors duration-300",
                step.isCompleted ? "bg-blue-600" : "bg-gray-300"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default RegistrationStepper;
