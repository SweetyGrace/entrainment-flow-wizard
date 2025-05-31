
import React from 'react';
import { DayPicker } from 'react-day-picker';
import { cn } from '@/lib/utils';
import styles from './index.module.css';

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(styles.calendar, className)}
      {...props}
    />
  )
}

export { Calendar }
