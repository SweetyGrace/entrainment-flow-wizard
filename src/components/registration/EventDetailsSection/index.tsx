import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/Card';
import { CalendarIcon, Clock, MapPin, IndianRupee } from 'lucide-react';
import styles from './index.module.css';

interface EventDetailsSectionProps {
  eventName?: string;
  isCompact?: boolean;
}

const EventDetailsSection: React.FC<EventDetailsSectionProps> = ({ 
  eventName = "Entrainment'25", 
  isCompact = false 
}) => {
  if (isCompact) {
    return (
      <Card className={styles.compactCard}>
        <CardHeader className={styles.header}>
          <CardTitle className={styles.title}>{eventName}</CardTitle>
        </CardHeader>
        <CardContent className={styles.compactContent}>
          <div className={styles.infoGrid}>
            <div className={styles.compactInfoItem}>
              <MapPin className={styles.compactIcon} />
              <div>
                <p className={styles.compactInfoValue}>Mysore, Karnataka</p>
              </div>
            </div>
            
            <div className={styles.compactInfoItem}>
              <CalendarIcon className={styles.compactIcon} />
              <div>
                <p className={styles.compactInfoValue}>March 15-17, 2025</p>
              </div>
            </div>
            
            <div className={styles.compactInfoItem}>
              <Clock className={styles.compactIcon} />
              <div>
                <p className={styles.compactInfoValue}>3 days intensive</p>
              </div>
            </div>
          </div>
          
          <div className={styles.priceSection}>
            <div className={styles.priceCard}>
              <div className={styles.priceHeader}>
                <IndianRupee className={styles.priceIcon} />
                <p className={styles.priceAmount}>₹2,500</p>
              </div>
              <p className={styles.priceDescription}>
                Event registration fee
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={styles.card}>
      <CardHeader className={styles.header}>
        <CardTitle className={styles.title}>Event details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={styles.content}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <MapPin className={styles.icon} />
              <div>
                <p className={styles.infoLabel}>Venue</p>
                <p className={styles.infoValue}>Mysore, Karnataka</p>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <CalendarIcon className={styles.icon} />
              <div>
                <p className={styles.infoLabel}>Event dates</p>
                <p className={styles.infoValue}>March 15-17, 2025</p>
              </div>
            </div>
          </div>
          
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <Clock className={styles.icon} />
              <div>
                <p className={styles.infoLabel}>Duration</p>
                <p className={styles.infoValue}>3 days intensive programme</p>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <IndianRupee className={styles.icon} />
              <div>
                <p className={styles.infoLabel}>Event cost</p>
                <p className={styles.infoValue}>₹2,500 per participant</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.noteSection}>
          <p className={styles.noteText}>
            <span className={styles.noteLabel}>Note:</span> All timings are in Indian Standard Time (IST). 
            Detailed schedule will be shared closer to the event date.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventDetailsSection;
