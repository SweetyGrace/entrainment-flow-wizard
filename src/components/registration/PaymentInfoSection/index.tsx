
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

  const preFilledFields = initialFieldCategories.preFilledFields;
  const missingFields = initialFieldCategories.missingFields;
  const gstWasInitiallyRegistered = initialFieldCategories.gstWasInitiallyRegistered;

  // If has data and not editing, show segregated sections
  if (hasData && !isEditing) {
    return (
      <div className={styles.container}>
        {/* Pre-filled Fields Section */}
        {preFilledFields.length > 0 && (
          <PreFilledSection
            preFilledFields={preFilledFields}
            gstWasInitiallyRegistered={gstWasInitiallyRegistered}
            paymentInfo={paymentInfo}
            onPaymentInfoChange={onPaymentInfoChange}
            setEditingSection={setEditingSection}
            columnLayout={columnLayout}
            setColumnLayout={setColumnLayout}
          />
        )}

        {/* Missing Fields Section */}
        {missingFields.length > 0 && (
          <MissingFieldsSection
            missingFields={missingFields}
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
      paymentInfo={paymentInfo || {}}
      onSave={onSaveChanges}
      onCancel={() => setEditingSection(null)}
    />
  );
};

export default PaymentInfoSection;
