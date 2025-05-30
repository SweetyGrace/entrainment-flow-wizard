
import React from 'react';
import PreFilledFieldsCard from './payment/PreFilledFieldsCard';
import MissingFieldsCard from './payment/MissingFieldsCard';
import PaymentEditForm from './payment/PaymentEditForm';
import { getStaticFieldSegregation } from './payment/PaymentFieldUtils';
import { Card, CardContent } from '@/components/ui/card';

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

  // Static field definitions - computed once based on initial data, never changes
  const { preFilledFields: staticPreFilledFields, missingFields: staticMissingFields } = 
    React.useMemo(() => getStaticFieldSegregation(paymentInfo), []);

  // STATE 1: EDITING MODE - Show unified edit form
  if (isEditing) {
    return (
      <PaymentEditForm
        paymentInfo={paymentInfo}
        onPaymentInfoChange={onPaymentInfoChange}
        setEditingSection={setEditingSection}
        onSaveChanges={onSaveChanges}
      />
    );
  }

  // STATE 2: VIEW + COMPLETION MODE - Show segregated sections
  if (hasData) {
    return (
      <div className="space-y-6">
        {/* Pre-filled fields section */}
        {staticPreFilledFields.length > 0 && (
          <PreFilledFieldsCard
            paymentInfo={paymentInfo}
            staticPreFilledFields={staticPreFilledFields}
            columnLayout={columnLayout}
            setColumnLayout={setColumnLayout}
            setEditingSection={setEditingSection}
            onPaymentInfoChange={onPaymentInfoChange}
          />
        )}

        {/* Missing fields section */}
        {staticMissingFields.length > 0 && (
          <MissingFieldsCard
            paymentInfo={paymentInfo}
            staticMissingFields={staticMissingFields}
            staticPreFilledFields={staticPreFilledFields}
            columnLayout={columnLayout}
            onPaymentInfoChange={onPaymentInfoChange}
          />
        )}
      </div>
    );
  }

  // STATE 3: FIRST TIME/EMPTY STATE - Show initial form
  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardContent className="p-6">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Invoice Details Required</h3>
          <p className="text-gray-600 mb-6">Please provide your invoice information to continue with registration.</p>
          <PaymentEditForm
            paymentInfo={paymentInfo}
            onPaymentInfoChange={onPaymentInfoChange}
            setEditingSection={setEditingSection}
            onSaveChanges={onSaveChanges}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentInfoSection;
