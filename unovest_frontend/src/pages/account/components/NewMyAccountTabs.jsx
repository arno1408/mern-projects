import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import Subscription from './Subscription';
import Security from './Security';
import Notifications from './Notifications';

const NewMyAccountTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobileActive, setIsMobileActive] = useState(false);
  const tabs = [
    { label: 'User Profile' },
    { label: 'Subscription' },
    { label: 'Security' },
    { label: 'Notifications' }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobileActive(window.innerWidth <= 767);
    };
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-0 md:gap-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 md:py-4 w-[120px] md:w-[289px] px-2 md:px-4 mb-2 font-bold text-base md:text-2xl md:rounded-[15px] rounded-t-[10px] ${
              activeTab === index ? 'bg-light-blue-1 text-dark-blue' : 'text-light-blue-1'
            }`}
            style={{
              boxShadow:activeTab === index ? '0px 0px 20px 0px rgba(139, 192, 217, 0.5)' : '',
              backgroundImage:isMobileActive ? 'linear-gradient(100deg, rgb(148 156 173 / 20%) 78.7%, rgb(176 180 188 / 20%) 58.07%)':'linear-gradient(184deg, rgba(24, 33, 50, 0.20) 2.7%, rgba(24, 34, 51, 0.20) 96.07%)',
              maxWidth: isMobileActive ? (activeTab === index ? '120px' : '80px') : 'none',
              ...(isMobileActive && {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }),
            }}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === 0 && <UserProfile />}
      {activeTab === 1 && <Subscription />}
      {activeTab === 2 && <Security />}
      {activeTab === 3 && <Notifications />}
    </div>
  );
};

export default NewMyAccountTabs;
