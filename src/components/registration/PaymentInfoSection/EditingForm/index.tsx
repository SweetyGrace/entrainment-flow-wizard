
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
        id="cardNumber"
        label="Card Number"
        type="text"
        value={editedInfo.cardNumber}
        onChange={(id, value) => handleChange('cardNumber', value as string)}
      />
      <FieldInput
        id="expiryDate"
        label="Expiry Date"
        type="text"
        value={editedInfo.expiryDate}
        onChange={(id, value) => handleChange('expiryDate', value as string)}
      />
      <FieldInput
        id="cvv"
        label="CVV"
        type="text"
        value={editedInfo.cvv}
        onChange={(id, value) => handleChange('cvv', value as string)}
      />
      <FieldInput
        id="cardholderName"
        label="Cardholder Name"
        type="text"
        value={editedInfo.cardholderName}
        onChange={(id, value) => handleChange('cardholderName', value as string)}
      />
      <div className={styles.buttons}>
        <Button onClick={handleSave}>Save</Button>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
};

export default EditingForm;
