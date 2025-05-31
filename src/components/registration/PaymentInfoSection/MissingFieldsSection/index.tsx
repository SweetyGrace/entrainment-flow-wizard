
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/Card';

interface MissingField {
  field: string;
  label: string;
  value: string | number | boolean | Date;
  required: boolean;
}

interface MissingFieldsSectionProps {
  missingFields: MissingField[];
  onEditField: (field: string) => void;
}

const MissingFieldsSection: React.FC<MissingFieldsSectionProps> = ({
  missingFields,
  onEditField
}) => {
  if (missingFields.length === 0) {
    return null;
  }

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-800">
          <AlertTriangle className="w-5 h-5" />
          Missing Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-orange-700 mb-4">
          Please complete the following required fields:
        </p>
        <div className="space-y-2">
          {missingFields.map((field) => (
            <button
              key={field.field}
              onClick={() => onEditField(field.field)}
              className="w-full text-left p-3 bg-white border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">{field.label}</span>
                <span className="text-orange-600 text-sm">Complete →</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {field.value ? String(field.value) : 'Not provided'}
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MissingFieldsSection;
