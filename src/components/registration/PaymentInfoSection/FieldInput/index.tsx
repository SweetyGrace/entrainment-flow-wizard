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
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange(id, (e.target as HTMLInputElement).value);
  };

  return (
    <div className={styles.fieldInput}>
      <Label htmlFor={id}>{label}</Label>
      {type === 'select' && options ? (
        <Select value={String(value)} onValueChange={(val) => onChange(id, val)}>
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
          id={id}
          placeholder={placeholder}
          value={String(value)}
          onChange={handleChange}
        />
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default FieldInput;
