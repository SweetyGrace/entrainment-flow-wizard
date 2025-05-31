
import React from 'react';
import { Edit2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/Card';

interface PreFilledSectionProps {
  title: string;
  children: React.ReactNode;
  onEdit: () => void;
}

const PreFilledSection: React.FC<PreFilledSectionProps> = ({
  title,
  children,
  onEdit
}) => {
  return (
    <Card className="relative">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <button
            onClick={onEdit}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={`Edit ${title}`}
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default PreFilledSection;
