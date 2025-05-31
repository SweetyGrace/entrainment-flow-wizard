
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BirthDateInputsProps {
  birthDay?: string;
  birthMonth?: string;
  birthYear?: string;
  onDayChange: (day: string) => void;
  onMonthChange: (month: string) => void;
  onYearChange: (year: string) => void;
}

const BirthDateInputs: React.FC<BirthDateInputsProps> = ({
  birthDay,
  birthMonth,
  birthYear,
  onDayChange,
  onMonthChange,
  onYearChange
}) => {
  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  const days = Array.from({ length: 31 }, (_, i) => {
    const day = (i + 1).toString().padStart(2, '0');
    return { value: day, label: day };
  });

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="space-y-2">
        <Label className="text-xs text-gray-500">Day</Label>
        <Select value={birthDay || ''} onValueChange={onDayChange}>
          <SelectTrigger className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
            <SelectValue placeholder="Day" />
          </SelectTrigger>
          <SelectContent>
            {days.map((day) => (
              <SelectItem key={day.value} value={day.value}>
                {day.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-xs text-gray-500">Month</Label>
        <Select value={birthMonth || ''} onValueChange={onMonthChange}>
          <SelectTrigger className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month.value} value={month.value}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-xs text-gray-500">Year</Label>
        <Input
          type="number"
          value={birthYear || ''}
          onChange={(e) => onYearChange(e.target.value)}
          className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Year"
          min="1900"
          max={new Date().getFullYear()}
        />
      </div>
    </div>
  );
};

export default BirthDateInputs;
