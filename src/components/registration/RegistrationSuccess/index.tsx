
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
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
  requiresApproval: boolean;
  isPaid: boolean;
  name: string;
}

interface RegistrationSuccessProps {
  event: Event;
  personalInfo?: PersonalInfo;
  paymentInfo?: PaymentInfo;
  setEditingSection: (section: string | null) => void;
}

const RegistrationSuccess: React.FC<RegistrationSuccessProps> = ({
  event,
  personalInfo,
  paymentInfo,
  setEditingSection
}) => {
  return (
    <div className={styles.container}>
      {/* Banner */}
      <div className={styles.banner}>
        <img 
          src="/lovable-uploads/24448433-14b3-4796-8f41-8ba4e87474b3.png" 
          alt="Entrainment'25 Banner" 
          className={styles.bannerImage}
        />
        <div className={styles.bannerContent}>
          <div className={styles.bannerText}>
            <h1 className={styles.bannerTitle}>Registration Complete</h1>
            <p className={styles.bannerSubtitle}>Thank you for joining {event.name}</p>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <Card className={styles.card}>
          <CardContent className={styles.cardContent}>
            <div className={styles.successSection}>
              <div className={styles.iconContainer}>
                {/* Animated success icon */}
                <div className={styles.iconBackground}></div>
                <div className={styles.iconInner}>
                  <Sparkles className={styles.successIcon} />
                </div>
                {/* Floating particles */}
                <div className={styles.particle1}></div>
                <div className={styles.particle2}></div>
              </div>
              <h2 className={styles.successTitle}>
                {event.requiresApproval ? "Awaiting Mahatria's Approval" : "You're All Set!"}
              </h2>
              <p className={styles.successDescription}>
                {event.requiresApproval 
                  ? "Your registration has been submitted and is pending approval. We'll notify you once it's confirmed."
                  : `Your registration for ${event.name} has been confirmed. We look forward to seeing you there!`
                }
              </p>
            </div>

            <div className={styles.buttonGroup}>
              <Button className={styles.calendarButton}>
                <span className={styles.calendarButtonText}>Add to Calendar</span>
              </Button>
              <Button 
                variant="outline" 
                className={styles.invoiceButton}
              >
                Download Invoice
              </Button>
              <Button 
                variant="ghost"
                onClick={() => window.location.href = '/'}
                className={styles.homeButton}
              >
                Go to Homepage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
