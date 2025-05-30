
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';

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
  columnLayout: 2 | 3;
  setColumnLayout: (layout: 2 | 3) => void;
  onSaveChanges: () => void;
}

const PaymentInfoSection: React.FC<PaymentInfoSectionProps> = ({
  paymentInfo,
  onPaymentInfoChange,
  editingSection,
  setEditingSection,
  eventAmount,
  isPaid,
  hideAmountField = false,
  showPersonalizedTitle = true,
  columnLayout,
  setColumnLayout,
  onSaveChanges
}) => {
  const hasData = paymentInfo && Object.keys(paymentInfo).length > 0;
  const isEditing = editingSection === 'payment';

  // Capture initial field state only once when component mounts and never update it
  const [initialFieldCategories] = React.useState(() => {
    if (!paymentInfo || Object.keys(paymentInfo).length === 0) {
      return { 
        preFilledFields: [], 
        missingFields: ['invoiceName', 'invoiceEmail', 'address'],
        gstWasInitiallyRegistered: false
      };
    }
    
    const baseRequiredFields = ['invoiceName', 'invoiceEmail', 'address'];
    const gstWasRegistered = Boolean(paymentInfo.gstRegistered);
    const gstFields = gstWasRegistered ? ['gstin', 'tdsPercent'] : [];
    const allRelevantFields = [...baseRequiredFields, ...gstFields];
    
    // Determine which fields had meaningful values at component mount
    const preFilledFields = allRelevantFields.filter(field => {
      const value = paymentInfo[field as keyof PaymentInfo];
      return value !== undefined && value !== null && value !== '';
    });
    
    const missingFields = allRelevantFields.filter(field => !preFilledFields.includes(field));
    
    return { 
      preFilledFields, 
      missingFields, 
      gstWasInitiallyRegistered: gstWasRegistered 
    };
  });

  // Use the captured initial state - these never change
  const staticPreFilledFields = initialFieldCategories.preFilledFields;
  const staticMissingFields = initialFieldCategories.missingFields;
  const gstWasInitiallyRegistered = initialFieldCategories.gstWasInitiallyRegistered;

  // Convert field labels to proper title case for display
  const formatFieldLabel = (label: string) => {
    const titleCaseLabels = {
      'invoiceName': 'Invoice name',
      'invoiceEmail': 'Invoice email',
      'gstRegistered': 'GST registered',
      'gstin': 'GSTIN',
      'tdsPercent': 'TDS percent',
      'address': 'Address',
      'amount': 'Amount'
    };
    
    return titleCaseLabels[label] || label;
  };

  const renderFieldValue = (field: string, value: any) => {
    if (field === 'handoverDate' && value instanceof Date) {
      return format(value, "PPP");
    }
    return value;
  };

  const renderEmptyFieldInput = (field: string) => {
    const fieldValue = paymentInfo?.[field as keyof PaymentInfo];
    const stringValue = typeof fieldValue === 'string' ? fieldValue : '';

    switch (field) {
      case 'address':
        return (
          <Textarea
            value={stringValue}
            onChange={(e) => onPaymentInfoChange(field, e.target.value)}
            className="border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
            rows={3}
            placeholder="Enter your complete address..."
          />
        );
      default:
        return (
          <Input
            type={field === 'invoiceEmail' ? 'email' : 'text'}
            value={stringValue}
            onChange={(e) => onPaymentInfoChange(field, e.target.value)}
            className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder={`Enter ${formatFieldLabel(field).toLowerCase()}`}
          />
        );
    }
  };

  // If has data and not editing, show segregated sections
  if (hasData && !isEditing) {
    return (
      <div className="space-y-6">
        {/* Pre-filled Fields Section */}
        {staticPreFilledFields.length > 0 && (
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
                {/* GST Registered Status - only show if it was initially filled */}
                {gstWasInitiallyRegistered && (
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
                )}

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
        )}

        {/* Missing Fields Section */}
        {staticMissingFields.length > 0 && (
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="pb-6">
              <CardTitle className="text-lg font-medium text-gray-900">
                Please fill the missing fields
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className={`grid grid-cols-1 ${columnLayout === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
                {/* Show GST checkbox if it wasn't initially registered */}
                {!gstWasInitiallyRegistered && (
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
                    </Label>
                    {renderEmptyFieldInput(field)}
                  </div>
                ))}

                {/* Show GST fields if GST is now checked but wasn't initially registered */}
                {!gstWasInitiallyRegistered && paymentInfo?.gstRegistered && (
                  <>
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-700">GSTIN</Label>
                      {renderEmptyFieldInput('gstin')}
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-700">TDS percent</Label>
                      {renderEmptyFieldInput('tdsPercent')}
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <Card className={`mb-6 border-0 shadow-sm ${isEditing ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}>
      <CardHeader className="pb-6">
        {isEditing && (
          <div>
            <CardTitle className="text-lg font-medium text-gray-900">Edit invoice details</CardTitle>
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
              className="px-6 rounded-full"
            >
              Cancel
            </Button>
            <Button 
              onClick={onSaveChanges}
              className="px-6 rounded-full"
            >
              Save Changes
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentInfoSection;
