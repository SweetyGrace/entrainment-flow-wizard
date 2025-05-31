
import React from 'react';
import { Bell } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import styles from './index.module.css';

const TopNavigation: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Left: Infinitheism Logo */}
          <div className={styles.leftSection}>
            <img 
              src="/lovable-uploads/2d124680-071b-43cb-a357-afbe36c1c3fd.png" 
              alt="infinitheism" 
              className={styles.logo}
            />
          </div>

          {/* Center: Three Red Dots - Absolutely positioned to center of screen with increased size */}
          <div className={styles.centerDots}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>

          {/* Right: Notification Bell and User Avatar */}
          <div className={styles.rightSection}>
            <button className={styles.notificationButton}>
              <Bell className={styles.notificationIcon} />
            </button>
            <Avatar className={styles.avatar}>
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
