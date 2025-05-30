
import React from 'react';
import { Home, Users, BarChart, Calendar } from 'lucide-react';

const SideNavigation: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 h-screen z-40 w-20">
      <div className="bg-white rounded-r-3xl shadow-lg p-4 flex flex-col items-center space-y-6 pt-20 h-full">
        {/* My Space (Homepage) icon */}
        <div className="p-3 hover:bg-gray-50 rounded-full transition-colors cursor-pointer">
          <Home className="w-6 h-6 text-blue-900" strokeWidth={1.5} />
        </div>

        {/* My Group (Friends/Family) icon */}
        <div className="p-3 hover:bg-gray-50 rounded-full transition-colors cursor-pointer">
          <Users className="w-6 h-6 text-blue-900" strokeWidth={1.5} />
        </div>

        {/* Analytics icon */}
        <div className="p-3 hover:bg-gray-50 rounded-full transition-colors cursor-pointer">
          <BarChart className="w-6 h-6 text-blue-900" strokeWidth={1.5} />
        </div>

        {/* Programs icon */}
        <div className="p-3 hover:bg-gray-50 rounded-full transition-colors cursor-pointer">
          <Calendar className="w-6 h-6 text-blue-900" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
};

export default SideNavigation;
