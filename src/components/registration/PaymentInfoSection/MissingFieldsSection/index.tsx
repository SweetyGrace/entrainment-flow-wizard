
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/Card';
import { Label } from '@/common/components/Label';
import { Checkbox } from '@/common/components/Checkbox';
import FieldInput from '../FieldInput';
import { PaymentInfo } from '../types';
import styles from './index.module.css';

interface MissingFieldsSectionProps {
  missingFields: string[];
  gstWasInitiallyRegistered: boolean;
  paymentInfo?: PaymentInfo;
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

          {missingFields.map((field) => (
            <FieldInput
              key={field}
              id={field}
              field={field}
              label={field}
              type="text"
              paymentInfo={paymentInfo}
              onPaymentInfoChange={onPaymentInfoChange}
            />
          ))}

          {!gstWasInitiallyRegistered && paymentInfo?.gstRegistered && (
            <>
              <FieldInput
                id="gstin"
                field="gstin"
                label="GSTIN"
                type="text"
                paymentInfo={paymentInfo}
                onPaymentInfoChange={onPaymentInfoChange}
              />
              <FieldInput
                id="tdsPercent"
                field="tdsPercent"
                label="TDS Percent"
                type="text"
                paymentInfo={paymentInfo}
                onPaymentInfoChange={onPaymentInfoChange}
              />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MissingFieldsSection;
