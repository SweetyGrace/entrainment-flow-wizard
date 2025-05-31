
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/Card';
import { Label } from '@/common/components/Label';
import { Checkbox } from '@/common/components/Checkbox';
import FieldInput from '../FieldInput';
import { PaymentInfo } from '../types';
import styles from './index.module.css';

interface MissingFieldsSectionProps {
  staticMissingFields: string[];
  gstWasInitiallyRegistered: boolean;
  paymentInfo?: PaymentInfo;
  onPaymentInfoChange: (field: string, value: any) => void;
  columnLayout: 2 | 3;
}

const MissingFieldsSection: React.FC<MissingFieldsSectionProps> = ({
  staticMissingFields,
  gstWasInitiallyRegistered,
  paymentInfo,
  onPaymentInfoChange,
  columnLayout
}) => {
  const gridClass = columnLayout === 2 ? styles.grid2 : styles.grid3;

  return (
    <Card className={styles.card}>
      <CardHeader className={styles.header}>
        <CardTitle className={styles.title}>
          Please fill the missing fields
        </CardTitle>
      </CardHeader>
      <CardContent className={styles.content}>
        <div className={gridClass}>
          {!gstWasInitiallyRegistered && (
            <div className={styles.gstContainer}>
              <Label className={styles.gstLabel}>GST registered?</Label>
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
          )}

          {staticMissingFields.map((field) => (
            <FieldInput
              key={field}
              id={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              type="text"
              value={paymentInfo?.[field as keyof PaymentInfo] || ''}
              onChange={(id, value) => onPaymentInfoChange(id, value)}
            />
          ))}

          {!gstWasInitiallyRegistered && paymentInfo?.gstRegistered && (
            <>
              <FieldInput
                id="gstin"
                label="GSTIN"
                type="text"
                value={paymentInfo?.gstin || ''}
                onChange={(id, value) => onPaymentInfoChange(id, value)}
              />
              <FieldInput
                id="tdsPercent"
                label="TDS Percent"
                type="text"
                value={paymentInfo?.tdsPercent || ''}
                onChange={(id, value) => onPaymentInfoChange(id, value)}
              />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MissingFieldsSection;
