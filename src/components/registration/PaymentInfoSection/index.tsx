
import React from 'react';
import PreFilledSection from './PreFilledSection';
import MissingFieldsSection from './MissingFieldsSection';
import EditingForm from './EditingForm';
import { PaymentInfoSectionProps } from './types';
import { getInitialFieldCategories } from './utils';
import styles from './index.module.css';

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

  const [initialFieldCategories] = React.useState(() => 
    getInitialFieldCategories(paymentInfo)
  );

  const staticPreFilledFields = initialFieldCategories.preFilledFields;
  const staticMissingFields = initialFieldCategories.missingFields;
  const gstWasInitiallyRegistered = initialFieldCategories.gstWasInitiallyRegistered;

  // If has data and not editing, show segregated sections
  if (hasData && !isEditing) {
    return (
      <div className={styles.container}>
        {/* Pre-filled Fields Section */}
        {staticPreFilledFields.length > 0 && (
          <PreFilledSection
            staticPreFilledFields={staticPreFilledFields}
            gstWasInitiallyRegistered={gstWasInitiallyRegistered}
            paymentInfo={paymentInfo}
            onPaymentInfoChange={onPaymentInfoChange}
            setEditingSection={setEditingSection}
            columnLayout={columnLayout}
            setColumnLayout={setColumnLayout}
          />
        )}

        {/* Missing Fields Section */}
        {staticMissingFields.length > 0 && (
          <MissingFieldsSection
            staticMissingFields={staticMissingFields}
            gstWasInitiallyRegistered={gstWasInitiallyRegistered}
            paymentInfo={paymentInfo}
            onPaymentInfoChange={onPaymentInfoChange}
            columnLayout={columnLayout}
          />
        )}
      </div>
    );
  }

  return (
    <EditingForm
      paymentInfo={paymentInfo}
      onPaymentInfoChange={onPaymentInfoChange}
      isEditing={isEditing}
      setEditingSection={setEditingSection}
      onSaveChanges={onSaveChanges}
    />
  );
};

export default PaymentInfoSection;
