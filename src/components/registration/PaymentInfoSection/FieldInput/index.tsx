
import React from 'react';
import { Input } from '@/common/components/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/common/components/Select';
import { Label } from '@/common/components/Label';
import styles from './index.module.css';

interface FieldInputProps {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  value?: string | number;
  onChange: (id: string, value: string | number) => void;
  options?: { value: string; label: string }[];
  error?: string;
  field?: string;
  paymentInfo?: any;
  onPaymentInfoChange?: (field: string, value: any) => void;
}

const FieldInput: React.FC<FieldInputProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  options,
  error,
  field,
  paymentInfo,
  onPaymentInfoChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (onChange) {
      onChange(id, (e.target as HTMLInputElement).value);
    } else if (onPaymentInfoChange && field) {
      onPaymentInfoChange(field, (e.target as HTMLInputElement).value);
    }
  };

  // If using field prop, get value from paymentInfo
  const fieldValue = field && paymentInfo ? paymentInfo[field] : value;

  return (
    <div className={styles.fieldInput}>
      <Label htmlFor={id || field}>{label}</Label>
      {type === 'select' && options ? (
        <Select 
          value={String(fieldValue)} 
          onValueChange={(val) => {
            if (onChange) {
              onChange(id, val);
            } else if (onPaymentInfoChange && field) {
              onPaymentInfoChange(field, val);
            }
          }}
        >
          <SelectTrigger className={styles.selectTrigger}>
            <SelectValue placeholder={placeholder || "Select"} />
          </SelectTrigger>
          <SelectContent className={styles.selectContent}>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          type={type}
          id={id || field}
          placeholder={placeholder}
          value={String(fieldValue || '')}
          onChange={handleChange}
        />
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default FieldInput;
