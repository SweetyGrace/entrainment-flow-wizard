
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ColumnLayoutToggle from '../ColumnLayoutToggle';
import FieldDisplay from '../FieldDisplay';
import { PaymentInfo } from '../types';
import styles from './index.module.css';

interface PreFilledSectionProps {
  staticPreFilledFields: string[];
  gstWasInitiallyRegistered: boolean;
  paymentInfo?: PaymentInfo;
  onPaymentInfoChange: (field: string, value: any) => void;
  setEditingSection: (section: string | null) => void;
  columnLayout: 2 | 3;
  setColumnLayout: (layout: 2 | 3) => void;
}

const PreFilledSection: React.FC<PreFilledSectionProps> = ({
  staticPreFilledFields,
  gstWasInitiallyRegistered,
  paymentInfo,
  onPaymentInfoChange,
  setEditingSection,
  columnLayout,
  setColumnLayout
}) => {
  const gridClass = columnLayout === 2 ? styles.grid2 : styles.grid3;

  return (
    <Card className={styles.card}>
      <CardHeader className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <CardTitle className={styles.title}>
              Review the details and update anything that needs realignment — <button 
                onClick={() => setEditingSection('payment')}
                className={styles.editLink}
              >
                click here to edit
              </button>
            </CardTitle>
            
            <ColumnLayoutToggle 
              columnLayout={columnLayout}
              setColumnLayout={setColumnLayout}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className={styles.content}>
        <div className={gridClass}>
          {gstWasInitiallyRegistered && (
            <FieldDisplay
              field="gstRegistered"
              paymentInfo={paymentInfo}
              onPaymentInfoChange={onPaymentInfoChange}
            />
          )}

          {staticPreFilledFields.map((field) => (
            <FieldDisplay
              key={field}
              field={field}
              paymentInfo={paymentInfo}
              onPaymentInfoChange={onPaymentInfoChange}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PreFilledSection;
