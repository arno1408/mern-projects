// import React, { useState } from 'react'

// const ModeSwitch = () => {
//     const [darkmode, setdarkmode] = useState('modeSwitchlight')
//     const [lightmode, setlightmode] = useState('text-xs max-md:text-[9px] text-[#c2d7fa] font-normal pe-3')
//     const HandleDark = () => {
//         setlightmode('modeSwitchlight')
//         setdarkmode("modeSwitchdark")
//     }
//     const HandleLight = () => {
//         setdarkmode('modeSwitchlight')
//         setlightmode('modeSwitchdark')
//     }
//     return (
//         <div className='Modeswitch'>
//             <button onClick={HandleDark} className={darkmode} disabled>Dark Mode</button>
//             <button onClick={HandleLight} className={lightmode} disabled>Light Mode</button>
//         </div>
//     )
// }

// export default ModeSwitch

import React, { useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md'; 

const ModeSwitch = ({ isCollapsed }) => {
  const [darkmode, setdarkmode] = useState('modeSwitchlight');
  const [lightmode, setlightmode] = useState('text-xs max-md:text-[9px] text-[#c2d7fa] font-normal pe-3');

  const HandleDark = () => {
    setlightmode('modeSwitchlight');
    setdarkmode('modeSwitchdark');
  };

  const HandleLight = () => {
    setdarkmode('modeSwitchlight');
    setlightmode('modeSwitchdark');
  };

  return (
    <div className={`Modeswitch ${isCollapsed?' w-16 max-lg:w-12' :'w-[14rem]'}`}>
      {isCollapsed ? (
        <>
          <button onClick={HandleDark} className={`${darkmode}  w-4 px-4 py-2` } disabled>
            <MdDarkMode />
          </button>
          <button onClick={HandleLight} className={`${lightmode} w-4 px-4 py-2`} disabled>
            <MdLightMode />
          </button>
        </>
      ) : (
        <>
          <button onClick={HandleDark} className={`${darkmode} px-3 py-2`} disabled>
            Dark Mode
          </button>
          <button onClick={HandleLight} className={`${lightmode} px-3 py-2`} disabled>
            Light Mode
          </button>
        </>
      )}
    </div>
  );
};

export default ModeSwitch;
