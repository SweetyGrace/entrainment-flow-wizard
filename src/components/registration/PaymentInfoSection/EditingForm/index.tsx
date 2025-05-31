
import React from 'react';
import { Button } from '@/common/components/Button';
import FieldInput from '../FieldInput';
import { PaymentInfo } from '../types';
import styles from './index.module.css';

interface EditingFormProps {
  paymentInfo: PaymentInfo;
  onPaymentInfoChange: (field: string, value: any) => void;
  isEditing: boolean;
  setEditingSection: (section: string | null) => void;
  onSaveChanges: () => void;
}

const EditingForm: React.FC<EditingFormProps> = ({ 
  paymentInfo, 
  onPaymentInfoChange,
  isEditing,
  setEditingSection,
  onSaveChanges 
}) => {
  const handleSave = () => {
    onSaveChanges();
    setEditingSection(null);
  };

  const handleCancel = () => {
    setEditingSection(null);
  };

  return (
    <div className={styles.editingForm}>
      <FieldInput
        id="invoiceName"
        label="Invoice Name"
        type="text"
        value={paymentInfo.invoiceName || ''}
        onChange={(id, value) => onPaymentInfoChange(id, value)}
      />
      <FieldInput
        id="invoiceEmail"
        label="Invoice Email"
        type="email"
        value={paymentInfo.invoiceEmail || ''}
        onChange={(id, value) => onPaymentInfoChange(id, value)}
      />
      <FieldInput
        id="address"
        label="Address"
        type="text"
        value={paymentInfo.address || ''}
        onChange={(id, value) => onPaymentInfoChange(id, value)}
      />
      <FieldInput
        id="amount"
        label="Amount"
        type="number"
        value={paymentInfo.amount || 0}
        onChange={(id, value) => onPaymentInfoChange(id, value)}
      />
      <div className={styles.buttons}>
        <Button onClick={handleSave}>Save</Button>
        <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
      </div>
    </div>
  );
};

export default EditingForm;
