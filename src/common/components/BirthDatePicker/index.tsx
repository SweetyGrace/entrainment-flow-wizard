
import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../Button';
import { Calendar } from '../Calendar';
import { Popover } from '../Popover';
import { Label } from '../Label';
import styles from './index.module.css';

interface BirthDatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  label?: string;
}

export function BirthDatePicker({ 
  value, 
  onChange, 
  placeholder = "Pick a date",
  label = "Date of birth"
}: BirthDatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={styles.container}>
      <Label className={styles.label}>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <Button
          variant="outline"
          className={cn(styles.trigger, !value && styles.placeholder)}
        >
          {value ? (
            format(value, "PPP")
          ) : (
            <span>{placeholder}</span>
          )}
          <CalendarIcon className={styles.icon} />
        </Button>
        <div className={styles.content}>
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </div>
      </Popover>
    </div>
  );
}
