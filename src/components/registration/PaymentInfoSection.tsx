
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
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
  hideAmountField?: boolean;
  showPersonalizedTitle?: boolean;
}

const PaymentInfoSection: React.FC<PaymentInfoSectionProps> = ({
  paymentInfo,
  onPaymentInfoChange,
  editingSection,
  setEditingSection,
  eventAmount,
  isPaid,
  hideAmountField = false,
  showPersonalizedTitle = true
}) => {
  const [tempFormData, setTempFormData] = useState<PaymentInfo>({});
  const hasData = paymentInfo && Object.keys(paymentInfo).length > 0;
  const isEditing = editingSection === 'payment';
  
  // Convert field labels to proper title case for display
  const formatFieldLabel = (label: string) => {
    const titleCaseLabels = {
      'INVOICE NAME': 'Invoice name',
      'INVOICE EMAIL': 'Invoice email',
      'GST REGISTERED': 'GST registered',
      'GSTIN': 'GSTIN',
      'TDS PERCENT': 'TDS percent',
      'ADDRESS': 'Address',
      'AMOUNT': 'Amount'
    };
    
    return titleCaseLabels[label] || label.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  // Check which fields are filled and unfilled
  const filledFields = [];
  const unfilledFields = [];
  
  const allFields = [
    { key: 'invoiceName', label: 'INVOICE NAME', type: 'text' },
    { key: 'invoiceEmail', label: 'INVOICE EMAIL', type: 'email' },
    { key: 'gstRegistered', label: 'GST REGISTERED', type: 'boolean' },
    { key: 'gstin', label: 'GSTIN', type: 'text', conditional: true },
    { key: 'tdsPercent', label: 'TDS PERCENT', type: 'text', conditional: true },
    { key: 'address', label: 'ADDRESS', type: 'textarea' }
  ];
  
  if (hasData) {
    allFields.forEach(field => {
      if (field.conditional && !paymentInfo?.gstRegistered) return;
      if (paymentInfo?.[field.key as keyof PaymentInfo]) {
        filledFields.push(field);
      } else {
        unfilledFields.push(field);
      }
    });
  }

  const handleTempChange = (field: string, value: any) => {
    setTempFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    // Save all temp changes to actual data
    Object.keys(tempFormData).forEach(field => {
      onPaymentInfoChange(field, tempFormData[field as keyof PaymentInfo]);
    });
    setTempFormData({});
    setEditingSection(null);
  };

  if (hasData && !isEditing) {
    return (
      <>
        {/* Filled Fields Section */}
        {filledFields.length > 0 && (
          <Card className="mb-6 border-0 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-lg font-medium text-gray-900">Invoice details</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setEditingSection('payment')}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8 px-3 rounded-md"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      edit
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Your billing information</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filledFields.map(field => (
                  <div key={field.key} className="space-y-2">
                    <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {formatFieldLabel(field.label)}
                    </Label>
                    <div className="text-sm text-gray-900 font-medium">
                      {field.type === 'boolean' 
                        ? (paymentInfo?.[field.key as keyof PaymentInfo] ? 'Yes' : 'No')
                        : field.key === 'amount' 
                        ? `₹${paymentInfo?.[field.key as keyof PaymentInfo]}`
                        : String(paymentInfo?.[field.key as keyof PaymentInfo] || '')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Unfilled Fields Section */}
        {unfilledFields.length > 0 && (
          <Card className="mb-6 border-0 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg font-medium text-gray-900">
                    Please fill the missing fields
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Complete your invoice details</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-6">
                {unfilledFields.map(field => (
                  <div key={field.key} className="space-y-3">
                    <Label htmlFor={field.key} className="text-sm font-medium text-gray-700">
                      {formatFieldLabel(field.label)}
                    </Label>
                    
                    {field.type === 'textarea' ? (
                      <Textarea
                        id={field.key}
                        value={tempFormData?.[field.key as keyof PaymentInfo] as string || paymentInfo?.[field.key as keyof PaymentInfo] as string || ''}
                        onChange={(e) => handleTempChange(field.key, e.target.value)}
                        className="border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                        rows={3}
                        placeholder={`Enter ${formatFieldLabel(field.label).toLowerCase()}...`}
                      />
                    ) : field.type === 'boolean' ? (
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={field.key}
                          checked={tempFormData?.[field.key as keyof PaymentInfo] as boolean || paymentInfo?.[field.key as keyof PaymentInfo] as boolean || false}
                          onCheckedChange={(checked) => handleTempChange(field.key, checked)}
                        />
                        <Label htmlFor={field.key} className="text-sm font-medium text-gray-700">
                          {formatFieldLabel(field.label)}
                        </Label>
                      </div>
                    ) : (
                      <Input
                        id={field.key}
                        type={field.type}
                        value={tempFormData?.[field.key as keyof PaymentInfo] as string || paymentInfo?.[field.key as keyof PaymentInfo] as string || ''}
                        onChange={(e) => handleTempChange(field.key, e.target.value)}
                        className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder={`Enter ${formatFieldLabel(field.label).toLowerCase()}`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Save Changes Button */}
              <div className="flex justify-end pt-6 border-t border-gray-100">
                <Button 
                  onClick={handleSaveChanges}
                  className="relative overflow-hidden px-8 py-3 text-base font-medium rounded-full text-white border-0 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
                  style={{
                    backgroundImage: `url('/lovable-uploads/203da045-4558-4833-92ac-07479a336dfb.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <span className="relative z-10">save changes</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </>
    );
  }

  return (
    <Card className="mb-6 border-0 shadow-sm bg-white">
      <CardHeader className="pb-6">
        {isEditing && (
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <CardTitle className="text-lg font-medium text-gray-900">Edit invoice details</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setEditingSection(null)}
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 h-8 px-3 rounded-md"
                >
                  cancel
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-1">Update your billing information</p>
            </div>
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
              className="relative overflow-hidden px-8 py-3 text-base font-medium rounded-full text-white border-0 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
              style={{
                backgroundImage: `url('/lovable-uploads/203da045-4558-4833-92ac-07479a336dfb.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <span className="relative z-10">save changes</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentInfoSection;
