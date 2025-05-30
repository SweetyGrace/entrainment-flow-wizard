
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Clock, RotateCcw, IndianRupee, Circle } from "lucide-react";

interface ProgramCardProps {
  id: string;
  title: string;
  description: string;
  backgroundImage: string;
  dates: string;
  checkIn: string;
  checkOut: string;
  investment: string;
  venue: string;
  note: string;
  onRegister: (eventId: string) => void;
  onClick: (eventId: string) => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  id,
  title,
  description,
  backgroundImage,
  dates,
  checkIn,
  checkOut,
  investment,
  venue,
  note,
  onRegister,
  onClick
}) => {
  // Helper function to format text with line breaks
  const formatText = (text: string | undefined | null) => {
    if (!text || typeof text !== 'string' || text.trim() === '') {
      return <div>-</div>;
    }
    
    return text.split('\n').map((line, index) => (
      <div key={index}>{line.trim() || '-'}</div>
    ));
  };

  // Safe fallback values
  const safeTitle = title || 'Program';
  const safeBackgroundImage = backgroundImage || '/placeholder.svg';
  const safeDates = dates || 'TBD';
  const safeCheckIn = checkIn || 'TBD';
  const safeCheckOut = checkOut || 'TBD';
  const safeInvestment = investment || 'TBD';
  const safeVenue = venue || 'TBD';
  const safeNote = note || '';

  return (
    <div 
      className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
      onClick={() => onClick(id)}
    >
      {/* Header with red gradient and circle icon */}
      <div className="h-16 bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white relative">
        <div className="absolute left-4">
          <Circle className="w-8 h-8 text-white fill-white" />
        </div>
        <h3 className="text-lg font-bold text-center">{safeTitle}</h3>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Four column info grid */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {/* Program Dates */}
          <div className="text-center">
            <Calendar className="w-4 h-4 text-gray-500 mx-auto mb-1" />
            <h4 className="text-xs font-medium text-gray-800 mb-1">Program Dates</h4>
            <div className="text-xs text-gray-600">
              {formatText(safeDates)}
            </div>
          </div>

          {/* Check-in */}
          <div className="text-center">
            <Clock className="w-4 h-4 text-gray-500 mx-auto mb-1" />
            <h4 className="text-xs font-medium text-gray-800 mb-1">Check-in</h4>
            <div className="text-xs text-gray-600">
              {formatText(safeCheckIn)}
            </div>
          </div>

          {/* Check-out */}
          <div className="text-center">
            <RotateCcw className="w-4 h-4 text-gray-500 mx-auto mb-1" />
            <h4 className="text-xs font-medium text-gray-800 mb-1">Check-out</h4>
            <div className="text-xs text-gray-600">
              {formatText(safeCheckOut)}
            </div>
          </div>

          {/* Investment */}
          <div className="text-center">
            <IndianRupee className="w-4 h-4 text-gray-500 mx-auto mb-1" />
            <h4 className="text-xs font-medium text-gray-800 mb-1">Investment</h4>
            <div className="text-xs text-gray-600">
              {safeInvestment}
            </div>
          </div>
        </div>

        {/* Venue bar */}
        <div className="bg-gray-50 rounded px-3 py-2 mb-3 flex justify-between items-center">
          <span className="text-sm text-gray-700">
            <span className="font-medium">Venue:</span> {safeVenue}
          </span>
          <span className="text-xs text-gray-500 italic">{safeNote}</span>
        </div>

        {/* Register button */}
        <div className="text-center">
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              onRegister(id);
            }}
            className="w-full py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors duration-300"
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
