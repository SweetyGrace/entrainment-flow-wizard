
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Edit, CheckCircle } from 'lucide-react';
import RegistrationHeader from '../RegistrationHeader';
import styles from './index.module.css';

interface PersonalInfo {
  fullName?: string;
  email?: string;
  mobile?: string;
}

interface PaymentInfo {
  invoiceName?: string;
  amount?: number;
}

interface Event {
  name: string;
  amount?: number;
}

interface AwaitingApprovalScreenProps {
  event: Event;
  personalInfo?: PersonalInfo;
  paymentInfo?: PaymentInfo;
  onEditInfo: () => void;
}

const AwaitingApprovalScreen: React.FC<AwaitingApprovalScreenProps> = ({
  event,
  personalInfo,
  paymentInfo,
  onEditInfo
}) => {
  return (
    <div className={styles.container}>
      <RegistrationHeader />

      <div className={styles.content}>
        <Card className={styles.card}>
          <CardContent className={styles.cardContent}>
            <div className={styles.iconContainer}>
              <Clock className={styles.icon} />
            </div>
            <h2 className={styles.title}>Awaiting seat approval</h2>
            <p className={styles.description}>
              Your registration for {event.name} has been submitted and is pending Mahatria's approval. 
              We'll notify you once your seat is confirmed, and then you can proceed with payment.
            </p>
            
            {/* Show submitted information */}
            <div className={styles.infoSection}>
              {personalInfo && (
                <div className={styles.infoCard}>
                  <h3 className={styles.infoTitle}>
                    <CheckCircle className={styles.infoTitleIcon} />
                    Personal Information
                  </h3>
                  <div className={styles.infoDetails}>
                    <p className={styles.infoRow}><span className={styles.infoLabel}>Name:</span> {personalInfo.fullName}</p>
                    <p className={styles.infoRow}><span className={styles.infoLabel}>Email:</span> {personalInfo.email}</p>
                    <p className={styles.infoRow}><span className={styles.infoLabel}>Mobile:</span> {personalInfo.mobile}</p>
                    <p className={styles.infoRow}><span className={styles.infoLabel}>Programme:</span> {event.name}</p>
                  </div>
                </div>
              )}

              {paymentInfo && (
                <div className={styles.infoCardGreen}>
                  <h3 className={styles.infoTitle}>
                    <CheckCircle className={styles.infoTitleIcon} />
                    Invoice Details
                  </h3>
                  <div className={styles.infoDetails}>
                    <p className={styles.infoRow}><span className={styles.infoLabel}>Invoice Name:</span> {paymentInfo.invoiceName}</p>
                    <p className={styles.infoRow}><span className={styles.infoLabel}>Amount:</span> ₹{paymentInfo.amount}</p>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.nextStepsCard}>
              <div className={styles.nextStepsContent}>
                <Clock className={styles.nextStepsIcon} />
                <div className={styles.nextStepsText}>
                  <h4 className={styles.nextStepsTitle}>What happens next?</h4>
                  <ul className={styles.nextStepsList}>
                    <li>• We'll review your registration within 24-48 hours</li>
                    <li>• You'll receive an email notification about the approval status</li>
                    <li>• Once approved, you can complete your payment to secure your spot</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <Button 
                variant="outline"
                onClick={onEditInfo}
                className={styles.editButton}
              >
                <Edit className={styles.editIcon} />
                Edit registration
              </Button>
              <Button 
                variant="ghost"
                onClick={() => window.location.href = '/'}
                className={styles.homeButton}
              >
                Go to homepage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AwaitingApprovalScreen;
