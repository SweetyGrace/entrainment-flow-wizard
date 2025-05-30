
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { formatFieldLabel, renderFieldValue } from './PaymentFieldUtils';

interface PaymentInfo {
  invoiceName?: string;
  invoiceEmail?: string;
  gstRegistered?: boolean;
  gstin?: string;
  tdsPercent?: string;
  tan?: string;
  address?: string;
  paymentMethod?: string;
  amount?: number;
  handoverDate?: Date;
  handoverTo?: string;
}

interface PreFilledFieldsCardProps {
  paymentInfo: PaymentInfo;
  staticPreFilledFields: string[];
  columnLayout: 2 | 3;
  setColumnLayout: (layout: 2 | 3) => void;
  setEditingSection: (section: string | null) => void;
  onPaymentInfoChange: (field: string, value: any) => void;
}

const PreFilledFieldsCard: React.FC<PreFilledFieldsCardProps> = ({
  paymentInfo,
  staticPreFilledFields,
  columnLayout,
  setColumnLayout,
  setEditingSection,
  onPaymentInfoChange
}) => {
  if (staticPreFilledFields.length === 0) return null;

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-medium text-gray-900 mb-3">
              Review the details and update anything that needs realignment — <button 
                onClick={() => setEditingSection('payment')}
                className="text-blue-600 hover:text-blue-700 underline"
              >
                click here to edit
              </button>
            </CardTitle>
            
            {/* Column Layout Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">View:</span>
              <Button
                variant={columnLayout === 2 ? "default" : "outline"}
                size="sm"
                onClick={() => setColumnLayout(2)}
                className="h-7 px-3 text-xs rounded-full"
              >
                2 Columns
              </Button>
              <Button
                variant={columnLayout === 3 ? "default" : "outline"}
                size="sm"
                onClick={() => setColumnLayout(3)}
                className="h-7 px-3 text-xs rounded-full"
              >
                3 Columns
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className={`grid grid-cols-1 ${columnLayout === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
          {/* GST Registered Status */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-600">
              {formatFieldLabel('gstRegistered')}
            </Label>
            <div className="flex items-center space-x-3">
              <Checkbox
                checked={paymentInfo?.gstRegistered || false}
                onCheckedChange={(checked) => onPaymentInfoChange('gstRegistered', checked)}
              />
              <span className="text-sm text-gray-700">
                {paymentInfo?.gstRegistered ? 'Yes' : 'No'}
              </span>
            </div>
          </div>

          {/* Show filled fields */}
          {staticPreFilledFields.map((field) => (
            <div key={field} className={field === 'address' ? 'col-span-full space-y-3' : 'space-y-3'}>
              <Label className="text-sm font-medium text-gray-600">
                {formatFieldLabel(field)}
              </Label>
              <div className="text-sm text-gray-900 font-medium">
                {renderFieldValue(field, paymentInfo?.[field as keyof PaymentInfo])}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PreFilledFieldsCard;
