import React from 'react';
import { Button } from '@/common/components/Button';
import FieldInput from '../FieldInput';
import { PaymentInfo } from '../types';
import styles from './index.module.css';

interface EditingFormProps {
  paymentInfo: PaymentInfo;
  onSave: (updatedInfo: PaymentInfo) => void;
  onCancel: () => void;
}

const EditingForm: React.FC<EditingFormProps> = ({ paymentInfo, onSave, onCancel }) => {
  const [editedInfo, setEditedInfo] = React.useState<PaymentInfo>(paymentInfo);

  const handleChange = (field: keyof PaymentInfo, value: string) => {
    setEditedInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(editedInfo);
  };

  return (
    <div className={styles.editingForm}>
      <FieldInput
        label="Card Number"
        value={editedInfo.cardNumber}
        onChange={value => handleChange('cardNumber', value)}
      />
      <FieldInput
        label="Expiry Date"
        value={editedInfo.expiryDate}
        onChange={value => handleChange('expiryDate', value)}
      />
      <FieldInput
        label="CVV"
        value={editedInfo.cvv}
        onChange={value => handleChange('cvv', value)}
      />
      <FieldInput
        label="Cardholder Name"
        value={editedInfo.cardholderName}
        onChange={value => handleChange('cardholderName', value)}
      />
      <div className={styles.buttons}>
        <Button onClick={handleSave}>Save</Button>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
};

export default EditingForm;
