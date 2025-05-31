
import React from 'react';
import { Button } from '@/components/ui/button';
import styles from './index.module.css';

interface ColumnLayoutToggleProps {
  columnLayout: 2 | 3;
  setColumnLayout: (layout: 2 | 3) => void;
}

const ColumnLayoutToggle: React.FC<ColumnLayoutToggleProps> = ({
  columnLayout,
  setColumnLayout
}) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>View:</span>
      <Button
        variant={columnLayout === 2 ? "default" : "outline"}
        size="sm"
        onClick={() => setColumnLayout(2)}
        className={styles.button}
      >
        2 Columns
      </Button>
      <Button
        variant={columnLayout === 3 ? "default" : "outline"}
        size="sm"
        onClick={() => setColumnLayout(3)}
        className={styles.button}
      >
        3 Columns
      </Button>
    </div>
  );
};

export default ColumnLayoutToggle;
