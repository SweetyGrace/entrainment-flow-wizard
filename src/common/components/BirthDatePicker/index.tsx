
import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../Button';
import { Calendar } from '../Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Label } from '../Label';
import styles from './index.module.css';

interface BirthDatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
}

const BirthDatePicker: React.FC<BirthDatePickerProps> = ({ value, onChange }) => {
  return (
    <div className={styles.container}>
      <Label className={styles.label}>Date of birth</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              styles.trigger,
              !value && styles.placeholder
            )}
          >
            {value ? format(value, "PPP") : <span>Pick a date</span>}
            <CalendarIcon className={styles.icon} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={styles.content} align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default BirthDatePicker;
