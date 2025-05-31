
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import styles from './index.module.css';

const RegistrationHeader: React.FC = () => {
  return (
    <>
      {/* Banner */}
      <div className={styles.banner}>
        <img 
          src="/lovable-uploads/24448433-14b3-4796-8f41-8ba4e87474b3.png" 
          alt="Entrainment'25 Banner" 
          className={styles.bannerImage}
        />
        <div className={styles.bannerContent}>
          <div className={styles.bannerText}>
            <h1 className={styles.bannerTitle}>Entrainment'25</h1>
            <p className={styles.bannerSubtitle}>Your journey of awakening begins here</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className={styles.navigation}>
        <div className={styles.navContent}>
          <div className={styles.navItems}>
            <Button 
              variant="ghost" 
              size="sm" 
              className={styles.backButton}
              onClick={() => window.history.back()}
            >
              <ArrowLeft className={styles.backIcon} />
              <span className={styles.backText}>back</span>
            </Button>
            <span className={styles.pageTitle}>Registration</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationHeader;
