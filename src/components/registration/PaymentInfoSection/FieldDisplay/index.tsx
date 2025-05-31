
import React from 'react';
import { Label } from '@/common/components/Label';
import { Checkbox } from '@/common/components/Checkbox';
import { formatFieldLabel, renderFieldValue } from '../utils';
import { PaymentInfo } from '../types';
import styles from './index.module.css';

interface FieldDisplayProps {
  field: string;
  paymentInfo?: PaymentInfo;
  onPaymentInfoChange: (field: string, value: any) => void;
}

const FieldDisplay: React.FC<FieldDisplayProps> = ({
  field,
  paymentInfo,
  onPaymentInfoChange
}) => {
  const containerClass = field === 'address' ? styles.fieldContainerFull : styles.fieldContainer;

  if (field === 'gstRegistered') {
    return (
      <div className={styles.fieldContainer}>
        <Label className={styles.label}>
          {formatFieldLabel(field)}
        </Label>
        <div className={styles.checkboxContainer}>
          <Checkbox
            checked={paymentInfo?.gstRegistered || false}
            onCheckedChange={(checked) => onPaymentInfoChange('gstRegistered', checked)}
          />
          <span className={styles.checkboxLabel}>
            {paymentInfo?.gstRegistered ? 'Yes' : 'No'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <Label className={styles.label}>
        {formatFieldLabel(field)}
      </Label>
      <div className={styles.value}>
        {renderFieldValue(field, paymentInfo?.[field as keyof PaymentInfo])}
      </div>
    </div>
  );
};

export default FieldDisplay;
