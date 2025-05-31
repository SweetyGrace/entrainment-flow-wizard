
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/common/components/Select';
import { Label } from '@/common/components/Label';
import { cn } from '@/lib/utils';
import styles from './index.module.css';

interface BirthDatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  className?: string;
  label?: string;
  error?: string;
}

const BirthDatePicker: React.FC<BirthDatePickerProps> = ({
  value,
  onChange,
  className,
  label = "Date of birth",
  error
}) => {
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');

  // Initialize from value
  useEffect(() => {
    if (value instanceof Date && !isNaN(value.getTime())) {
      setDay(value.getDate().toString());
      setMonth((value.getMonth() + 1).toString());
      setYear(value.getFullYear().toString());
    }
  }, [value]);

  // Generate years (12+ years ago from current year, going backward)
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 12;
  const maxYear = currentYear - 100; // Reasonable upper limit
  const years = Array.from({ length: minYear - maxYear + 1 }, (_, i) => minYear - i);

  // Generate months
  const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  // Generate days based on selected month and year
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const days = month && year 
    ? Array.from({ length: getDaysInMonth(parseInt(month), parseInt(year)) }, (_, i) => i + 1)
    : Array.from({ length: 31 }, (_, i) => i + 1);

  // Validate age and update parent
  const updateDate = (newDay: string, newMonth: string, newYear: string) => {
    if (newDay && newMonth && newYear) {
      const date = new Date(parseInt(newYear), parseInt(newMonth) - 1, parseInt(newDay));
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        onChange(undefined);
        return;
      }

      // Calculate age
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      const monthDiff = today.getMonth() - date.getMonth();
      const dayDiff = today.getDate() - date.getDate();
      
      const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
      
      if (actualAge >= 12) {
        onChange(date);
      } else {
        onChange(undefined);
      }
    } else {
      onChange(undefined);
    }
  };

  const handleDayChange = (newDay: string) => {
    setDay(newDay);
    updateDate(newDay, month, year);
  };

  const handleMonthChange = (newMonth: string) => {
    setMonth(newMonth);
    // Reset day if it's invalid for the new month
    const maxDays = getDaysInMonth(parseInt(newMonth), parseInt(year) || currentYear);
    const currentDay = parseInt(day);
    if (currentDay > maxDays) {
      setDay('');
      updateDate('', newMonth, year);
    } else {
      updateDate(day, newMonth, year);
    }
  };

  const handleYearChange = (newYear: string) => {
    setYear(newYear);
    // Reset day if it's invalid for the new year (leap year consideration)
    if (month) {
      const maxDays = getDaysInMonth(parseInt(month), parseInt(newYear));
      const currentDay = parseInt(day);
      if (currentDay > maxDays) {
        setDay('');
        updateDate('', month, newYear);
      } else {
        updateDate(day, month, newYear);
      }
    } else {
      updateDate(day, month, newYear);
    }
  };

  // Check if current selection would result in underage
  const isUnderage = () => {
    if (!day || !month || !year) return false;
    
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    if (isNaN(date.getTime())) return false;

    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    const dayDiff = today.getDate() - date.getDate();
    
    const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
    return actualAge < 12;
  };

  return (
    <div className={cn(styles.container, className)}>
      <Label className={styles.label}>{label}</Label>
      
      <div className={styles.selectContainer}>
        <Select value={day} onValueChange={handleDayChange}>
          <SelectTrigger className={styles.select}>
            <SelectValue placeholder="Day" />
          </SelectTrigger>
          <SelectContent className={styles.content}>
            {days.map((d) => (
              <SelectItem key={d} value={d.toString()}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={month} onValueChange={handleMonthChange}>
          <SelectTrigger className={styles.select}>
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent className={styles.content}>
            {months.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={year} onValueChange={handleYearChange}>
          <SelectTrigger className={styles.select}>
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent className={styles.content}>
            {years.map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isUnderage() && (
        <div className={styles.error}>
          You must be at least 12 years old to register.
        </div>
      )}
      
      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}
    </div>
  );
};

export { BirthDatePicker };
