
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const RegistrationHeader: React.FC = () => {
  return (
    <>
      {/* Banner */}
      <div className="relative h-64 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 overflow-hidden">
        <img 
          src="/lovable-uploads/24448433-14b3-4796-8f41-8ba4e87474b3.png" 
          alt="Entrainment'25 Banner" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-light mb-3">Entrainment'25</h1>
            <p className="text-xl opacity-90 font-light">Your journey of awakening begins here</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              back
            </Button>
            <span className="text-gray-900 font-medium">Registration</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationHeader;
