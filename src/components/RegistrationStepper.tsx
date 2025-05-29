
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
    <div className={cn("flex flex-col space-y-6 max-w-xs", className)}>
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-start space-x-4">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                step.isCompleted
                  ? "bg-blue-600 border-blue-600 text-white shadow-md"
                  : step.isCurrent
                  ? "bg-white border-blue-600 text-blue-600 shadow-md"
                  : "bg-gray-100 border-gray-300 text-gray-500"
              )}
            >
              {step.isCompleted ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <span className="text-sm font-semibold">{step.id}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-0.5 h-8 mt-2 transition-colors duration-300",
                  step.isCompleted ? "bg-blue-600" : "bg-gray-300"
                )}
              />
            )}
          </div>
          <div className="flex-1 pt-2">
            <span
              className={cn(
                "text-sm font-medium",
                step.isCompleted || step.isCurrent
                  ? "text-gray-900"
                  : "text-gray-500"
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
