
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Edit } from 'lucide-react';

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

interface PaymentInfoSectionProps {
  paymentInfo?: PaymentInfo;
  onPaymentInfoChange: (field: string, value: any) => void;
  editingSection: string | null;
  setEditingSection: (section: string | null) => void;
  eventAmount: number;
  isPaid: boolean;
}

const PaymentInfoSection: React.FC<PaymentInfoSectionProps> = ({
  paymentInfo,
  onPaymentInfoChange,
  editingSection,
  setEditingSection,
  eventAmount,
  isPaid
}) => {
  if (!isPaid) return null;

  const hasData = paymentInfo && Object.keys(paymentInfo).length > 0;
  const isEditing = editingSection === 'payment';
  
  if (hasData && !isEditing) {
    return (
      <Card className="mb-6 border-0 shadow-sm bg-white">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-lg font-medium text-gray-900">Invoice details</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Your billing information</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setEditingSection('payment')}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8 px-3 rounded-md ml-4"
            >
              <Edit className="w-4 h-4 mr-1" />
              edit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentInfo?.invoiceName && (
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Invoice name</Label>
                <div className="text-sm text-gray-900 font-medium">{paymentInfo.invoiceName}</div>
              </div>
            )}
            {paymentInfo?.invoiceEmail && (
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Invoice email</Label>
                <div className="text-sm text-gray-900 font-medium">{paymentInfo.invoiceEmail}</div>
              </div>
            )}
            {paymentInfo?.amount && (
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Amount</Label>
                <div className="text-sm text-gray-900 font-medium">₹{paymentInfo.amount}</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6 border-0 shadow-sm bg-white">
      <CardHeader className="pb-6">
        {isEditing && (
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <CardTitle className="text-lg font-medium text-gray-900">Edit invoice details</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Update your billing information</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setEditingSection(null)}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 h-8 px-3 rounded-md ml-4"
            >
              cancel
            </Button>
          </div>
        )}

        {!isEditing && (
          <div>
            <CardTitle className="text-lg font-medium text-gray-900">Invoice details</CardTitle>
            <p className="text-sm text-gray-500 mt-1">We need some billing information for your registration.</p>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="invoiceName" className="text-sm font-medium text-gray-700">Name for invoice</Label>
            <Input
              id="invoiceName"
              value={paymentInfo?.invoiceName || ''}
              onChange={(e) => onPaymentInfoChange('invoiceName', e.target.value)}
              className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter name for invoice"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="invoiceEmail" className="text-sm font-medium text-gray-700">Email for invoice</Label>
            <Input
              id="invoiceEmail"
              type="email"
              value={paymentInfo?.invoiceEmail || ''}
              onChange={(e) => onPaymentInfoChange('invoiceEmail', e.target.value)}
              className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter email for invoice"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="gstRegistered"
              checked={paymentInfo?.gstRegistered || false}
              onCheckedChange={(checked) => onPaymentInfoChange('gstRegistered', checked)}
            />
            <Label htmlFor="gstRegistered" className="text-sm font-medium text-gray-700">GST registered?</Label>
          </div>

          {paymentInfo?.gstRegistered && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-6 border-l-2 border-blue-100">
              <div className="space-y-3">
                <Label htmlFor="gstin" className="text-sm font-medium text-gray-700">GSTIN</Label>
                <Input
                  id="gstin"
                  value={paymentInfo?.gstin || ''}
                  onChange={(e) => onPaymentInfoChange('gstin', e.target.value)}
                  className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter GSTIN"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="tdsPercent" className="text-sm font-medium text-gray-700">TDS %</Label>
                <Input
                  id="tdsPercent"
                  value={paymentInfo?.tdsPercent || ''}
                  onChange={(e) => onPaymentInfoChange('tdsPercent', e.target.value)}
                  className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter TDS percentage"
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="address" className="text-sm font-medium text-gray-700">Address</Label>
          <Textarea
            id="address"
            value={paymentInfo?.address || ''}
            onChange={(e) => onPaymentInfoChange('address', e.target.value)}
            className="border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
            rows={3}
            placeholder="Enter your complete address..."
          />
        </div>

        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Total amount:</span>
            <span className="text-2xl font-semibold text-blue-600">₹{eventAmount}</span>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
            <Button 
              variant="outline"
              onClick={() => setEditingSection(null)}
              className="px-6"
            >
              cancel
            </Button>
            <Button 
              onClick={() => setEditingSection(null)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              save changes
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentInfoSection;
