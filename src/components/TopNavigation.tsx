
import React from 'react';
import { Bell } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const TopNavigation: React.FC = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-full px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Infinitheism Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-light text-blue-600 tracking-wide">
              infinitheism
            </span>
          </div>

          {/* Center: Three Red Dots */}
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>

          {/* Right: Notification Bell and User Avatar */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/lovable-uploads/db80701b-0446-4aba-a856-cf8b1fcb70d7.png" alt="User" />
              <AvatarFallback className="bg-gray-200 text-gray-600 text-sm">U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
