
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
  // Helper function to format text with line breaks - with safety check
  const formatText = (text: string | undefined) => {
    if (!text) return <div>-</div>;
    return text.split('\n').map((line, index) => (
      <div key={index}>{line}</div>
    ));
  };

  return (
    <div 
      className="program-card-wrapper cursor-pointer group border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      onClick={() => onClick(id)}
    >
      {/* Background Image */}
      <div className="program-card-background relative h-64 overflow-hidden">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover opacity-90 transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/60"></div>
      </div>

      {/* Main Card Content - Overlapping */}
      <div className="program-card-main-content relative -mt-20 mx-6">
        <div className="bg-white rounded-t-xl shadow-lg border border-gray-100 p-8">
          {/* Program Title */}
          <div className="program-title-section text-center mb-8">
            <h2 className="program-title text-2xl font-bold text-slate-800">
              {title}
            </h2>
          </div>

          {/* Four Column Grid with Dividers */}
          <div className="program-info-grid relative grid grid-cols-4 gap-0">
            {/* Program Dates */}
            <div className="program-info-column flex flex-col items-center text-center px-4">
              <div className="program-icon mb-3">
                <Calendar className="w-6 h-6 text-slate-600 stroke-1" />
              </div>
              <h3 className="program-info-title font-bold text-slate-800 text-sm mb-2">Program Dates</h3>
              <div className="program-info-text text-slate-600 text-xs leading-relaxed">
                {formatText(dates)}
              </div>
            </div>

            {/* Vertical Divider 1 */}
            <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gray-200"></div>

            {/* Check-in Time */}
            <div className="program-info-column flex flex-col items-center text-center px-4">
              <div className="program-icon mb-3">
                <Clock className="w-6 h-6 text-slate-600 stroke-1" />
              </div>
              <h3 className="program-info-title font-bold text-slate-800 text-sm mb-2">Check-in-Time</h3>
              <div className="program-info-text text-slate-600 text-xs leading-relaxed">
                {formatText(checkIn)}
              </div>
            </div>

            {/* Vertical Divider 2 */}
            <div className="absolute left-2/4 top-0 bottom-0 w-px bg-gray-200"></div>

            {/* Check-out Time */}
            <div className="program-info-column flex flex-col items-center text-center px-4">
              <div className="program-icon mb-3">
                <RotateCcw className="w-6 h-6 text-slate-600 stroke-1" />
              </div>
              <h3 className="program-info-title font-bold text-slate-800 text-sm mb-2">Check-out-Time</h3>
              <div className="program-info-text text-slate-600 text-xs leading-relaxed">
                {formatText(checkOut)}
              </div>
            </div>

            {/* Vertical Divider 3 */}
            <div className="absolute left-3/4 top-0 bottom-0 w-px bg-gray-200"></div>

            {/* Investment */}
            <div className="program-info-column flex flex-col items-center text-center px-4">
              <div className="program-icon mb-3">
                {investment === 'No Waiting List' || investment === 'Free Program' ? (
                  <div className="w-6 h-6 flex items-center justify-center">
                    <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
                  </div>
                ) : (
                  <div className="w-6 h-6 border-2 border-slate-600 rounded flex items-center justify-center">
                    <IndianRupee className="w-3 h-3 text-slate-600 stroke-1" />
                  </div>
                )}
              </div>
              <h3 className="program-info-title font-bold text-slate-800 text-sm mb-2">Investment</h3>
              <div className="program-info-text text-slate-600 text-xs leading-relaxed">
                {investment === 'No Waiting List' || investment === 'Free Program' ? (
                  <div>{investment}</div>
                ) : (
                  formatText(investment)
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Light Blue-Gray Bar */}
        <div className="program-venue-bar bg-slate-100 rounded-b-xl px-6 py-4 flex justify-between items-center text-xs -mt-px">
          <div className="venue-text text-slate-600">
            <span className="font-medium">Venue:</span> {venue}
          </div>
          <div className="note-text text-slate-500 italic">
            {note}
          </div>
        </div>

        {/* Register Button */}
        <div className="program-register-container flex justify-center mt-6 mb-4">
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              onRegister(id);
            }}
            className="register-button relative overflow-hidden px-12 py-3 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 text-sm tracking-wide hover:scale-105"
            style={{
              backgroundImage: `url('/lovable-uploads/203da045-4558-4833-92ac-07479a336dfb.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <span className="relative z-10">register</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
