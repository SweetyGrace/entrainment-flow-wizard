
import React from 'react';
import { Bell } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const TopNavigation: React.FC = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-lg" style={{ borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
      <div className="max-w-full px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Infinitheism Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/2d124680-071b-43cb-a357-afbe36c1c3fd.png" 
              alt="infinitheism" 
              className="h-8"
            />
          </div>

          {/* Center: Three Red Dots - Absolutely positioned to center of screen */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-1">
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
              <AvatarImage src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=100&h=100&fit=crop&crop=face" alt="User" />
              <AvatarFallback className="bg-gray-200 text-gray-600 text-sm">U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
