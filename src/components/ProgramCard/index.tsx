
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Clock, RotateCcw, IndianRupee } from "lucide-react";
import styles from './index.module.css';

interface ProgramCardProps {
  id: string;
  title: string;
  description: string;
  backgroundImage: string;
  dates: string;
  checkIn: string;
  checkOut: string;
  investment: string;
  venue: string;
  note: string;
  onRegister: (eventId: string) => void;
  onClick: (eventId: string) => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  id,
  title,
  description,
  backgroundImage,
  dates,
  checkIn,
  checkOut,
  investment,
  venue,
  note,
  onRegister,
  onClick
}) => {
  // Helper function to format text with line breaks
  const formatText = (text: string) => {
    return text.split('\n').map((line, index) => (
      <div key={index}>{line}</div>
    ));
  };

  return (
    <div 
      className={styles.cardWrapper}
      onClick={() => onClick(id)}
    >
      {/* Background Image */}
      <div className={styles.backgroundImage}>
        <img
          src={backgroundImage}
          alt={title}
          className={styles.image}
        />
        <div className={styles.imageOverlay}></div>
      </div>

      {/* Main Card Content - Overlapping */}
      <div className={styles.mainContent}>
        <div className={styles.contentCard}>
          {/* Program Title */}
          <div className={styles.titleSection}>
            <h2 className={styles.title}>
              {title}
            </h2>
          </div>

          {/* Four Column Grid with Dividers */}
          <div className={styles.infoGrid}>
            {/* Program Dates */}
            <div className={styles.infoColumn}>
              <div className={styles.icon}>
                <Calendar className={styles.iconDefault} />
              </div>
              <h3 className={styles.infoTitle}>Program Dates</h3>
              <div className={styles.infoText}>
                {formatText(dates)}
              </div>
            </div>

            {/* Vertical Divider 1 */}
            <div className={`${styles.divider} ${styles.divider1}`}></div>

            {/* Check-in Time */}
            <div className={styles.infoColumn}>
              <div className={styles.icon}>
                <Clock className={styles.iconDefault} />
              </div>
              <h3 className={styles.infoTitle}>Check-in-Time</h3>
              <div className={styles.infoText}>
                {formatText(checkIn)}
              </div>
            </div>

            {/* Vertical Divider 2 */}
            <div className={`${styles.divider} ${styles.divider2}`}></div>

            {/* Check-out Time */}
            <div className={styles.infoColumn}>
              <div className={styles.icon}>
                <RotateCcw className={styles.iconDefault} />
              </div>
              <h3 className={styles.infoTitle}>Check-out-Time</h3>
              <div className={styles.infoText}>
                {formatText(checkOut)}
              </div>
            </div>

            {/* Vertical Divider 3 */}
            <div className={`${styles.divider} ${styles.divider3}`}></div>

            {/* Investment */}
            <div className={styles.infoColumn}>
              <div className={styles.icon}>
                {investment === 'No Waiting List' || investment === 'Free Program' ? (
                  <div className={styles.iconCustom}>
                    <div className={styles.iconDot}></div>
                  </div>
                ) : (
                  <div className={styles.iconRupee}>
                    <IndianRupee className={styles.iconRupeeSymbol} />
                  </div>
                )}
              </div>
              <h3 className={styles.infoTitle}>Investment</h3>
              <div className={styles.infoText}>
                {investment === 'No Waiting List' || investment === 'Free Program' ? (
                  <div>{investment}</div>
                ) : (
                  formatText(investment)
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Light Blue-Gray Bar */}
        <div className={styles.venueBar}>
          <div className={styles.venueText}>
            <span className={styles.venueLabel}>Venue:</span> {venue}
          </div>
          <div className={styles.noteText}>
            {note}
          </div>
        </div>

        {/* Register Button */}
        <div className={styles.registerContainer}>
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              onRegister(id);
            }}
            className={styles.registerButton}
          >
            <span className={styles.registerButtonText}>register</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
