import React from 'react';
import { Button } from '@/common/components/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/common/components/Card';
import styles from './index.module.css';

interface ProgramCardProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  onClick: () => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ title, description, imageUrl, buttonText, onClick }) => {
  return (
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={imageUrl} alt={title} className={styles.programImage} />
      </CardContent>
      <CardFooter>
        <Button onClick={onClick}>{buttonText}</Button>
      </CardFooter>
    </Card>
  );
};

export default ProgramCard;
