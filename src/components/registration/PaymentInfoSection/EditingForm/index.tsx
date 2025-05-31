
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { PaymentInfo } from '../types';
import styles from './index.module.css';

interface EditingFormProps {
  paymentInfo?: PaymentInfo;
  onPaymentInfoChange: (field: string, value: any) => void;
  isEditing: boolean;
  setEditingSection: (section: string | null) => void;
  onSaveChanges: () => void;
}

const EditingForm: React.FC<EditingFormProps> = ({
  paymentInfo,
  onPaymentInfoChange,
  isEditing,
  setEditingSection,
  onSaveChanges
}) => {
  const cardClass = `${styles.card} ${isEditing ? styles.cardEditing : styles.cardNormal}`;

  return (
    <Card className={cardClass}>
      <CardHeader className={styles.header}>
        {isEditing && (
          <div>
            <CardTitle className={styles.title}>Edit invoice details</CardTitle>
          </div>
        )}
      </CardHeader>

      <CardContent className={styles.content}>
        <div className={styles.row}>
          <div className={styles.fieldContainer}>
            <Label htmlFor="invoiceName" className={styles.label}>Name for invoice</Label>
            <Input
              id="invoiceName"
              value={paymentInfo?.invoiceName || ''}
              onChange={(e) => onPaymentInfoChange('invoiceName', e.target.value)}
              className={styles.input}
              placeholder="Enter name for invoice"
            />
          </div>
          <div className={styles.fieldContainer}>
            <Label htmlFor="invoiceEmail" className={styles.label}>Email for invoice</Label>
            <Input
              id="invoiceEmail"
              type="email"
              value={paymentInfo?.invoiceEmail || ''}
              onChange={(e) => onPaymentInfoChange('invoiceEmail', e.target.value)}
              className={styles.input}
              placeholder="Enter email for invoice"
            />
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.checkboxContainer}>
            <Checkbox
              id="gstRegistered"
              checked={paymentInfo?.gstRegistered || false}
              onCheckedChange={(checked) => onPaymentInfoChange('gstRegistered', checked)}
            />
            <Label htmlFor="gstRegistered" className={styles.label}>GST registered?</Label>
          </div>

          {paymentInfo?.gstRegistered && (
            <div className={styles.gstFields}>
              <div className={styles.fieldContainer}>
                <Label htmlFor="gstin" className={styles.label}>GSTIN</Label>
                <Input
                  id="gstin"
                  value={paymentInfo?.gstin || ''}
                  onChange={(e) => onPaymentInfoChange('gstin', e.target.value)}
                  className={styles.input}
                  placeholder="Enter GSTIN"
                />
              </div>
              <div className={styles.fieldContainer}>
                <Label htmlFor="tdsPercent" className={styles.label}>TDS %</Label>
                <Input
                  id="tdsPercent"
                  value={paymentInfo?.tdsPercent || ''}
                  onChange={(e) => onPaymentInfoChange('tdsPercent', e.target.value)}
                  className={styles.input}
                  placeholder="Enter TDS percentage"
                />
              </div>
            </div>
          )}
        </div>

        <div className={styles.fieldContainer}>
          <Label htmlFor="address" className={styles.label}>Address</Label>
          <Textarea
            id="address"
            value={paymentInfo?.address || ''}
            onChange={(e) => onPaymentInfoChange('address', e.target.value)}
            className={styles.textarea}
            rows={3}
            placeholder="Enter your complete address..."
          />
        </div>

        {isEditing && (
          <div className={styles.actions}>
            <Button 
              variant="outline"
              onClick={() => setEditingSection(null)}
              className={styles.button}
            >
              Cancel
            </Button>
            <Button 
              onClick={onSaveChanges}
              className={styles.button}
            >
              Save Changes
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EditingForm;
