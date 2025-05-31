
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/common/components/Button';

interface RegistrationHeaderProps {
  onBack: () => void;
  title: string;
  subtitle?: string;
}

const RegistrationHeader: React.FC<RegistrationHeaderProps> = ({
  onBack,
  title,
  subtitle
}) => {
  return (
    <div className="flex items-center space-x-4 mb-8">
      <Button
        variant="ghost"
        size="icon"
        onClick={onBack}
        className="shrink-0"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && (
          <p className="text-gray-600 mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default RegistrationHeader;
