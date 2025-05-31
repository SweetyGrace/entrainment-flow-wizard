
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/Card';

interface MissingFieldsSectionProps {
  staticMissingFields: string[];
  gstWasInitiallyRegistered: boolean;
  paymentInfo?: any;
  onPaymentInfoChange: (field: string, value: any) => void;
  columnLayout: 2 | 3;
}

const MissingFieldsSection: React.FC<MissingFieldsSectionProps> = ({
  staticMissingFields,
  gstWasInitiallyRegistered,
  paymentInfo,
  onPaymentInfoChange,
  columnLayout
}) => {
  if (staticMissingFields.length === 0) {
    return null;
  }

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-800">
          <AlertTriangle className="w-5 h-5" />
          Missing Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-orange-700 mb-4">
          Please complete the following required fields:
        </p>
        <div className="space-y-2">
          {staticMissingFields.map((field) => (
            <div
              key={field}
              className="w-full text-left p-3 bg-white border border-orange-200 rounded-lg"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900 capitalize">
                  {field.replace(/([A-Z])/g, ' $1')}
                </span>
                <span className="text-orange-600 text-sm">Required</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MissingFieldsSection;
