
import React from 'react';
import { Button } from '@/components/ui/button';
import styles from './index.module.css';

export interface ProgramCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  dates: string;
  checkIn: string;
  checkOut: string;
  investment: string;
  venue: string;
  note: string;
  onRegister: () => void;
  onCardClick: () => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  title,
  description,
  image,
  dates,
  checkIn,
  checkOut,
  investment,
  venue,
  note,
  onRegister,
  onCardClick
}) => {
  return (
    <div className={styles.card} onClick={onCardClick}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Dates:</span>
            <span className={styles.detailValue}>{dates}</span>
          </div>
          
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Check-in:</span>
            <span className={styles.detailValue}>{checkIn}</span>
          </div>
          
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Check-out:</span>
            <span className={styles.detailValue}>{checkOut}</span>
          </div>
          
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Investment:</span>
            <span className={styles.detailValue}>{investment}</span>
          </div>
          
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Venue:</span>
            <span className={styles.detailValue}>{venue}</span>
          </div>
          
          {note && (
            <div className={styles.note}>
              {note}
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              onRegister();
            }}
            className={styles.registerButton}
          >
            Register Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
