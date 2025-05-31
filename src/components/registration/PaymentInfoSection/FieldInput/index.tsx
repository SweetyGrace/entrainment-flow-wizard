
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { formatFieldLabel } from '../utils';
import { PaymentInfo } from '../types';
import styles from './index.module.css';

interface FieldInputProps {
  field: string;
  paymentInfo?: PaymentInfo;
  onPaymentInfoChange: (field: string, value: any) => void;
}

const FieldInput: React.FC<FieldInputProps> = ({
  field,
  paymentInfo,
  onPaymentInfoChange
}) => {
  const fieldValue = paymentInfo?.[field as keyof PaymentInfo];
  const stringValue = typeof fieldValue === 'string' ? fieldValue : '';

  const containerClass = field === 'address' ? styles.fieldContainerFull : styles.fieldContainer;

  if (field === 'address') {
    return (
      <div className={containerClass}>
        <Label className={styles.label}>
          {formatFieldLabel(field)}
        </Label>
        <Textarea
          value={stringValue}
          onChange={(e) => onPaymentInfoChange(field, e.target.value)}
          className={styles.textarea}
          rows={3}
          placeholder="Enter your complete address..."
        />
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <Label className={styles.label}>
        {formatFieldLabel(field)}
      </Label>
      <Input
        type={field === 'invoiceEmail' ? 'email' : 'text'}
        value={stringValue}
        onChange={(e) => onPaymentInfoChange(field, e.target.value)}
        className={styles.input}
        placeholder={`Enter ${formatFieldLabel(field).toLowerCase()}`}
      />
    </div>
  );
};

export default FieldInput;
