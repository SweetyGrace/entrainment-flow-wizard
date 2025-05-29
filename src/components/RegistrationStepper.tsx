
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
                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200",
                step.isCompleted
                  ? "bg-[#0799FF] border-[#0799FF] text-white"
                  : step.isCurrent
                  ? "bg-white border-[#0799FF] text-[#0799FF]"
                  : "bg-gray-100 border-gray-300 text-gray-500"
              )}
            >
              {step.isCompleted ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <span className="text-sm font-medium">{step.id}</span>
              )}
            </div>
            <span
              className={cn(
                "mt-2 text-xs font-medium",
                step.isCompleted || step.isCurrent
                  ? "text-[#2D2D2D]"
                  : "text-gray-500"
              )}
            >
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "flex-1 h-0.5 mx-2 transition-colors duration-200",
                step.isCompleted ? "bg-[#0799FF]" : "bg-gray-300"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default RegistrationStepper;
