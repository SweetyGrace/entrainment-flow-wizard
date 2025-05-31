
import React from 'react';
import { Home, Users, BarChart, Calendar } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './index.module.css';

const SideNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    navigate('/');
  };

  const isHomePage = location.pathname === '/';

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        {/* My Space (Homepage) icon */}
        <div 
          className={`${styles.iconButton} ${
            isHomePage 
              ? styles.iconButtonHome
              : styles.iconButtonDefault
          }`}
          onClick={handleHomeClick}
        >
          <Home className={styles.icon} />
        </div>

        {/* My Group (Friends/Family) icon */}
        <div className={`${styles.iconButton} ${styles.iconButtonDefault}`}>
          <Users className={styles.icon} />
        </div>

        {/* Analytics icon */}
        <div className={`${styles.iconButton} ${styles.iconButtonDefault}`}>
          <BarChart className={styles.icon} />
        </div>

        {/* Programs icon */}
        <div className={`${styles.iconButton} ${styles.iconButtonDefault}`}>
          <Calendar className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default SideNavigation;
