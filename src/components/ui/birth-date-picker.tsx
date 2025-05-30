
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

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
    <div className={cn("space-y-3", className)}>
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <Label className="text-xs text-gray-500">Day</Label>
          <Select value={day} onValueChange={handleDayChange}>
            <SelectTrigger className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <SelectValue placeholder="Day" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {days.map((d) => (
                <SelectItem key={d} value={d.toString()}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label className="text-xs text-gray-500">Month</Label>
          <Select value={month} onValueChange={handleMonthChange}>
            <SelectTrigger className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {months.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label className="text-xs text-gray-500">Year</Label>
          <Select value={year} onValueChange={handleYearChange}>
            <SelectTrigger className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {years.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {(isUnderage() || error) && (
        <p className="text-sm text-red-600 mt-1">
          {error || "You must be at least 12 years old to register"}
        </p>
      )}
    </div>
  );
};

export default BirthDatePicker;
