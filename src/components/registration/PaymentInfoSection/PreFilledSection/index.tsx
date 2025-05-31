
import React from 'react';
import { Edit2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/Card';

interface PreFilledSectionProps {
  staticPreFilledFields: string[];
  gstWasInitiallyRegistered: boolean;
  paymentInfo?: any;
  onPaymentInfoChange: (field: string, value: any) => void;
  setEditingSection: (section: string) => void;
  columnLayout: 2 | 3;
  setColumnLayout: (layout: 2 | 3) => void;
}

const PreFilledSection: React.FC<PreFilledSectionProps> = ({
  staticPreFilledFields,
  gstWasInitiallyRegistered,
  paymentInfo,
  onPaymentInfoChange,
  setEditingSection,
  columnLayout,
  setColumnLayout
}) => {
  return (
    <Card className="relative">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Pre-filled Information</CardTitle>
          <button
            onClick={() => setEditingSection('payment')}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Edit payment information"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {staticPreFilledFields.map((field) => (
            <div key={field} className="flex justify-between">
              <span className="font-medium capitalize">{field.replace(/([A-Z])/g, ' $1')}</span>
              <span className="text-gray-600">
                {paymentInfo?.[field] || 'Not provided'}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PreFilledSection;
