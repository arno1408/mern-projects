// import React, { useState, useEffect } from 'react';
// import UserProfile from './UserProfile';
// import Subscription from './Subscription';
// import Security from './Security';
// import Notifications from './notifications';
 
// const MyAccountTabs = ({className}) => {
//   const [activeTab, setActiveTab] = useState(0);
//   const [isMobileActive, setIsMobileActive] = useState(false);
//   const tabs = [
//     { label: 'User Profile' },
//     { label: 'Subscription' },
//     { label: 'Security' },
//     { label: 'Notifications' }
//   ];
 
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobileActive(window.innerWidth <= 767);
//     };
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);
 
//   const handleTabClick = (index) => {
//     setActiveTab(index);
//   };
 
//   return (
//     <div className={`max-w-[74.563rem] min-h-screen overflow-y-scroll hide-scrollbar  mt-5 ${className}`}>
//       <div className="flex flex-wrap gap-0 lg:gap-2 mx-auto">
//         {tabs.map((tab, index) => (
//           <button
//             key={index}
//             className={`Myaccount-Tabs ${
//               activeTab === index ? 'bg-light-blue-1 text-dark-blue' : 'text-light-blue-1'
//             }`}
//             style={{
//               boxShadow:activeTab === index ? '0px 0px 20px 0px rgba(139, 192, 217, 0.5)' : '',
//               backgroundImage:isMobileActive ? 'linear-gradient(100deg, rgb(148 156 173 / 20%) 78.7%, rgb(176 180 188 / 20%) 58.07%)':'linear-gradient(184deg, rgba(24, 33, 50, 0.20) 2.7%, rgba(24, 34, 51, 0.20) 96.07%)',
//               maxWidth: isMobileActive ? (activeTab === index ? '120px' : '80px') : 'none',
//               ...(isMobileActive && {
//                 whiteSpace: 'nowrap',
//                 overflow: 'hidden',
//                 textOverflow: 'ellipsis',
//               }),
//             }}
//             onClick={() => handleTabClick(index)}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>
//       {activeTab === 0 && <UserProfile />}
//       {activeTab === 1 && <Subscription />}
//       {activeTab === 2 && <Security />}
//       {activeTab === 3 && <Notifications />}
//     </div>
//   );
// };
 
// export default MyAccountTabs;


import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import Subscription from './Subscription';
import Security from './Security';
import Notifications from './Notifications';
 
const MyAccountTabs = ({className}) => {
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
    <div className={`Myaccount-Container ${className}`}>
      <div className="flex flex-wrap gap-0 lg:gap-2 mx-auto">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`Myaccount-Tabs ${
              activeTab === index ? 'bg-light-blue-1 text-dark-blue' : 'text-light-blue-1'
            }`}
            style={{
              boxShadow:activeTab === index ? '0px 0px 20px 0px rgba(139, 192, 217, 0.5)' : '',
              backgroundImage:isMobileActive ? 'linear-gradient(100deg, rgb(148 156 173 / 20%) 78.7%, rgb(176 180 188 / 20%) 58.07%)':'linear-gradient(184deg, rgba(24, 33, 50, 0.20) 2.7%, rgba(24, 34, 51, 0.20) 96.07%)',
              maxWidth: isMobileActive ? (activeTab === index ? '120px' : '80px') : 'none',
              flex: '1 1 auto', // Ensures tabs take up available space equally
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
 
export default MyAccountTabs;
