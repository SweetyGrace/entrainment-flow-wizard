
import React from 'react';
import PreFilledFieldsCard from './payment/PreFilledFieldsCard';
import MissingFieldsCard from './payment/MissingFieldsCard';
import PaymentEditForm from './payment/PaymentEditForm';
import { getStaticFieldSegregation } from './payment/PaymentFieldUtils';

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

  // If editing, show the edit form
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

  // If has data and not editing, show segregated sections
  if (hasData) {
    return (
      <div className="space-y-6">
        <PreFilledFieldsCard
          paymentInfo={paymentInfo}
          staticPreFilledFields={staticPreFilledFields}
          columnLayout={columnLayout}
          setColumnLayout={setColumnLayout}
          setEditingSection={setEditingSection}
          onPaymentInfoChange={onPaymentInfoChange}
        />

        <MissingFieldsCard
          paymentInfo={paymentInfo}
          staticMissingFields={staticMissingFields}
          staticPreFilledFields={staticPreFilledFields}
          columnLayout={columnLayout}
          onPaymentInfoChange={onPaymentInfoChange}
        />
      </div>
    );
  }

  // Default fallback - should not normally be reached
  return (
    <PaymentEditForm
      paymentInfo={paymentInfo}
      onPaymentInfoChange={onPaymentInfoChange}
      setEditingSection={setEditingSection}
      onSaveChanges={onSaveChanges}
    />
  );
};

export default PaymentInfoSection;
