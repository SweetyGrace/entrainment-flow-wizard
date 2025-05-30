
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { formatFieldLabel } from './PaymentFieldUtils';
import { convertToInputValue } from '../FieldValueUtils';

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

interface MissingFieldsCardProps {
  paymentInfo: PaymentInfo;
  staticMissingFields: string[];
  staticPreFilledFields: string[];
  columnLayout: 2 | 3;
  onPaymentInfoChange: (field: string, value: any) => void;
}

const MissingFieldsCard: React.FC<MissingFieldsCardProps> = ({
  paymentInfo,
  staticMissingFields,
  staticPreFilledFields,
  columnLayout,
  onPaymentInfoChange
}) => {
  const renderEmptyFieldInput = (field: string) => {
    const currentValue = paymentInfo?.[field as keyof PaymentInfo];
    
    switch (field) {
      case 'address':
        return (
          <Textarea
            value={convertToInputValue(currentValue)}
            onChange={(e) => onPaymentInfoChange(field, e.target.value)}
            className="border-orange-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-none"
            rows={3}
            placeholder="Enter your complete address..."
          />
        );
      default:
        return (
          <Input
            type={field === 'invoiceEmail' ? 'email' : 'text'}
            value={convertToInputValue(currentValue)}
            onChange={(e) => onPaymentInfoChange(field, e.target.value)}
            className="h-10 border-orange-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            placeholder={`Enter ${formatFieldLabel(field).toLowerCase()}`}
          />
        );
    }
  };

  if (staticMissingFields.length === 0) return null;

  return (
    <Card className="border-orange-200 shadow-sm bg-orange-50">
      <CardHeader className="pb-6">
        <div className="flex items-center mb-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
          <span className="text-orange-800 font-medium">Complete Your Registration</span>
        </div>
        <CardTitle className="text-lg font-medium text-gray-900">
          Please fill the missing fields to continue
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className={`grid grid-cols-1 ${columnLayout === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
          {/* Show GST checkbox if not in filled fields */}
          {!staticPreFilledFields.includes('gstRegistered') && (
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">GST registered?</Label>
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
          )}

          {/* Show empty fields */}
          {staticMissingFields.map((field) => (
            <div key={field} className={field === 'address' ? 'col-span-full space-y-3' : 'space-y-3'}>
              <Label className="text-sm font-medium text-gray-700">
                {formatFieldLabel(field)}
                <span className="text-orange-600 ml-1">*</span>
              </Label>
              {renderEmptyFieldInput(field)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MissingFieldsCard;
