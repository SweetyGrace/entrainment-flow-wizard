
import React from 'react';
import { Input } from '@/common/components/Input';
import { Label } from '@/common/components/Label';
import { Textarea } from '@/common/components/Textarea';
import { PaymentInfo } from '../types';
import styles from './index.module.css';

export interface FieldInputProps {
  id: string;
  type: string;
  label: string;
  value: any;
  onChange: (value: string) => void;
}

interface Props extends FieldInputProps {
  field?: string;
  paymentInfo?: PaymentInfo;
  onPaymentInfoChange?: (field: string, value: any) => void;
}

const FieldInput: React.FC<Props> = ({ 
  id, 
  type, 
  label, 
  value, 
  onChange 
}) => {
  const renderField = () => {
    if (type === 'textarea') {
      return (
        <Textarea
          id={id}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={styles.textarea}
        />
      );
    }
    
    return (
      <Input
        id={id}
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
      />
    );
  };

  return (
    <div className={styles.fieldContainer}>
      <Label htmlFor={id} className={styles.label}>
        {label}
      </Label>
      {renderField()}
    </div>
  );
};

export default FieldInput;
