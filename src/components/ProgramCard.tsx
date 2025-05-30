
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Clock, RotateCcw, IndianRupee } from "lucide-react";

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
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300"
      onClick={() => onClick(id)}
    >
      {/* Header with background image */}
      <div 
        className="h-20 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white relative"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(147, 51, 234, 0.9)), url(${safeBackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <h3 className="text-xl font-bold text-center px-4">{safeTitle}</h3>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Four column info grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {/* Program Dates */}
          <div className="text-center">
            <Calendar className="w-5 h-5 text-gray-500 mx-auto mb-2" />
            <h4 className="text-xs font-semibold text-gray-800 mb-1">Program Dates</h4>
            <div className="text-xs text-gray-600">
              {formatText(safeDates)}
            </div>
          </div>

          {/* Check-in */}
          <div className="text-center">
            <Clock className="w-5 h-5 text-gray-500 mx-auto mb-2" />
            <h4 className="text-xs font-semibold text-gray-800 mb-1">Check-in</h4>
            <div className="text-xs text-gray-600">
              {formatText(safeCheckIn)}
            </div>
          </div>

          {/* Check-out */}
          <div className="text-center">
            <RotateCcw className="w-5 h-5 text-gray-500 mx-auto mb-2" />
            <h4 className="text-xs font-semibold text-gray-800 mb-1">Check-out</h4>
            <div className="text-xs text-gray-600">
              {formatText(safeCheckOut)}
            </div>
          </div>

          {/* Investment */}
          <div className="text-center">
            <IndianRupee className="w-5 h-5 text-gray-500 mx-auto mb-2" />
            <h4 className="text-xs font-semibold text-gray-800 mb-1">Investment</h4>
            <div className="text-xs text-gray-600">
              {safeInvestment}
            </div>
          </div>
        </div>

        {/* Venue bar */}
        <div className="bg-gray-50 rounded-lg px-4 py-3 mb-4 flex justify-between items-center">
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
            className="w-full py-2 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300"
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
