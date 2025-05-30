
import React from 'react';
import { User, Users, BarChart, Flag } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const SideNavigation: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 h-screen z-40 flex items-center">
      <div className="bg-white rounded-r-3xl shadow-lg p-4 flex flex-col items-center space-y-6 h-full justify-center">
        {/* Meditation/Yoga icon */}
        <div className="p-3 hover:bg-gray-50 rounded-full transition-colors cursor-pointer">
          <User className="w-6 h-6 text-blue-900" strokeWidth={1.5} />
        </div>

        {/* Community/People icon */}
        <div className="p-3 hover:bg-gray-50 rounded-full transition-colors cursor-pointer">
          <Users className="w-6 h-6 text-blue-900" strokeWidth={1.5} />
        </div>

        {/* Analytics/Bar chart icon */}
        <div className="p-3 hover:bg-gray-50 rounded-full transition-colors cursor-pointer">
          <BarChart className="w-6 h-6 text-blue-900" strokeWidth={1.5} />
        </div>

        {/* Flag or event icon */}
        <div className="p-3 hover:bg-gray-50 rounded-full transition-colors cursor-pointer">
          <Flag className="w-6 h-6 text-blue-900" strokeWidth={1.5} />
        </div>

        {/* Rounded user avatar */}
        <div className="mt-4">
          <Avatar className="w-12 h-12 border-2 border-gray-100">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="User" />
            <AvatarFallback className="bg-blue-900 text-white text-sm">U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default SideNavigation;
