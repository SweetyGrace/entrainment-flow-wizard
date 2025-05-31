import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/Card';
import { Label } from '@/common/components/Label';
import { Checkbox } from '@/common/components/Checkbox';
import FieldInput from '../FieldInput';
import { PaymentInfo } from '../types';
import { getFieldConfig } from '../utils';
import styles from './index.module.css';

export interface MissingFieldsSectionProps {
  missingFields: string[];
  gstWasInitiallyRegistered: boolean;
  paymentInfo: PaymentInfo;
  onPaymentInfoChange: (field: string, value: any) => void;
  columnLayout: 2 | 3;
}

const MissingFieldsSection: React.FC<MissingFieldsSectionProps> = ({
  missingFields,
  gstWasInitiallyRegistered,
  paymentInfo,
  onPaymentInfoChange,
  columnLayout
}) => {
  if (!missingFields || missingFields.length === 0) {
    return null;
  }

  if (missingFields.length === 1 && missingFields[0] === 'gstNumber' && !gstWasInitiallyRegistered) {
    return null;
  }

  const displayFields = missingFields.filter(field => {
    if (field === 'gstNumber' && !paymentInfo.gstRegistered) {
      return false;
    }
    return true;
  });

  const gridCols = columnLayout === 3 ? styles.threeColumns : styles.twoColumns;

  return (
    <Card className={styles.card}>
      <CardHeader className={styles.header}>
        <CardTitle className={styles.title}>Missing Information</CardTitle>
      </CardHeader>
      <CardContent className={styles.content}>
        <div className={`${styles.grid} ${gridCols}`}>
          {displayFields.map((field) => {
            const config = getFieldConfig(field);
            
            return (
              <FieldInput
                key={field}
                id={field}
                field={field}
                label={config.label}
                type={config.type}
                value={paymentInfo[field as keyof PaymentInfo]}
                onChange={(value: string) => onPaymentInfoChange(field, value)}
              />
            );
          })}

          {missingFields.includes('gstRegistered') && (
            <div className={styles.checkboxContainer}>
              <div className={styles.checkboxWrapper}>
                <Checkbox
                  id="gstRegistered"
                  checked={paymentInfo.gstRegistered}
                  onCheckedChange={(checked) => onPaymentInfoChange('gstRegistered', checked)}
                />
                <Label htmlFor="gstRegistered" className={styles.checkboxLabel}>
                  GST Registered
                </Label>
              </div>
            </div>
          )}

          {missingFields.includes('gstNumber') && paymentInfo.gstRegistered && (
            <FieldInput
              id="gstNumber"
              field="gstNumber"
              label="GST Number"
              type="text"
              value={paymentInfo.gstNumber}
              onChange={(value: string) => onPaymentInfoChange('gstNumber', value)}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MissingFieldsSection;
