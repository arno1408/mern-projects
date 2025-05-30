import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Myaccount, Upgrade, InviteFriend, HelpCenter, About, Logout } from "../assets/Icons"
import { TbMoonFilled, TbSunFilled } from "react-icons/tb";

// import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { getData, updateDetailsWithoutId } from '../pages/destop_L1/server';
import { useDispatch, useSelector } from 'react-redux';
import { updateCradInputs } from '../redux/slices/Card_Inputs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateStatisticalData } from '../redux/slices/Statistical_Data';

const MyAccount = ({ className }) => {
  const dispatch = useDispatch();
  const [themeMod, setThemeMod] = useState(false);
  const pathName = window.location.pathname;
  const userDetails = JSON.parse(localStorage.getItem('userdetails'))
  // const numerical_format = userDetails?.user_data?.numerical_format || 'lakhs'; 
  const numerictype = useSelector(state => state?.statistical_Data?.numerical_format)
  // for mobile when menu is closed numeric format toggle should not be change
  // const numerical_format = useSelector((state) => state?.Card_inputs?.numerical_format);

  const getDateRemainder = () => {
    dispatch(updateCradInputs({ isReminderOpen: true }))
  }

  useEffect(() => {
    if (userDetails) {
      const userDetailswithNumericvalue = { ...userDetails, user_data: { ...userDetails.user_data, numerical_format: 'lakhs', isMillionChanged: false } }
      localStorage.setItem('userdetails', JSON.stringify(userDetailswithNumericvalue));
    }
  }, []);

  const handlerShareOthers = () => {
    dispatch(updateCradInputs({ isInviteOpen: true }))
  }

  const handleChange = (event, nextView) => {
    const payload = {
      numerical_format: nextView == 'millions' ? 'international' : 'domestic'
    }

    if (userDetails) {
      const userDetailswithNumericvalue = { ...userDetails, user_data: { ...userDetails.user_data, numerical_format: nextView, isMillionChanged: true } }
      localStorage.setItem('userdetails', JSON.stringify(userDetailswithNumericvalue));
    }

    updateDetailsWithoutId('user_numeric_format', payload, true,
      (success) => {
        const message = success.data.status_message.charAt(0).toUpperCase() + success.data.status_message.slice(1).toLowerCase();
        toast.success(message);
        // handleAlertClick(success.data.status_message,'success')
        dispatch(updateCradInputs({ numerical_format: nextView }))
        dispatch(updateStatisticalData({numerical_format: nextView}))
      },
      (error) => {
        // handleAlertClick(error.status_message,'error')
        toast.error(error.status_message)
      })
    // setView(nextView);
  };

  const logout = () => {
    getDateRemainder();
    //Note: logout functionality is handled in Menubar.jsx
  }

  const rejectedPaths = [
    '/level-1',
    '/level-1/quiz/congratulation',
    '/level-1/',
    '/level-1/quiz/congratulation/',
  ];

  function isPathAvailable(path, rejectedPaths) {
    return rejectedPaths.includes(path);
  }

  const myAccountlinkTo = isPathAvailable(pathName, rejectedPaths) ? '' : '/my-account'

  return (
    <>
      <div className={`${className ? className : ""} p-9 max-md:p-3 border border-emerald-300 bg-zinc-400 rounded-[30px] flex flex-col gap-7 max-md:gap-4 absolute lg:bottom-[-47px] max-md:bottom-[-14px] right-[-40px] translate-y-full md:translate-y-[4%] lg:translate-y-full lg:min-w-[286px] max-md:w-[230px] z-20`} style={{ background: "radial-gradient(203.82% 246.31% at 149.17% -96%, #9891AD 0%, #538096 37.25%, #131529 71.53%)" }}>
        <Link to={myAccountlinkTo} className={`header_menu_item ${isPathAvailable(pathName, rejectedPaths) ? 'opacity-45' : ''}`}><img src={Myaccount} />My Account</Link>
        {/* <Link  className='header_menu_item opacity-45'><img src={Myaccount} />My Account</Link> */}
        <div className='border border-zinc-400 w-full'></div>
        <Link to="" className={`header_menu_item ${isPathAvailable(pathName, rejectedPaths) ? 'opacity-45' : 'opacity-45'}`}><img src={Upgrade} />Upgrade</Link>
        <button onClick={handlerShareOthers} className='header_menu_item' ><img src={InviteFriend} />Invite a Friend</button>
        <Link to="" className={`header_menu_item ${isPathAvailable(pathName, rejectedPaths) ? 'opacity-45' : 'opacity-45'}`}><img src={HelpCenter} />Help Center</Link>
        <div className='border border-zinc-400 w-full'></div>

        <ToggleButton
          value="check"
          selected={themeMod}
          disabled={true}
          onChange={() => {
            setThemeMod(!themeMod);
          }}
          className='w-[69px] h-7 bg-gray-200 bg-opacity-20 rounded-[30px] border border-emerald-300 disabled:opacity-50'
          style={{ padding: "0", backgroundColor: "rgba(236, 236, 236, 0.20)", borderRadius: "30px", border: "1px solid #67EAB3" }}
        >
          <span className={`bg-emerald-300 w-10 h-7 rounded-[30px] shadow flex items-center justify-center absolute transition-all duration-500  ${themeMod ? "end-0" : "start-0"}`}>
            {themeMod ? <TbSunFilled style={{ color: "#0F3A4D", fontSize: "20px" }} /> : <TbMoonFilled style={{ color: "#0F3A4D", fontSize: "20px" }} />}
          </span>

        </ToggleButton>
        <div className={`max-md:hidden ${isPathAvailable(pathName, rejectedPaths) ? 'opacity-45' : ''}`}>
          <ToggleButtonGroup
            value={numerictype}
            exclusive
            onChange={handleChange}
            disabled={isPathAvailable(pathName, rejectedPaths)}
            className='border h-9 moneytype'
            style={{ borderRadius: "30px", borderColor: "#B5B5B5" }}
          >
            <ToggleButton value="millions" aria-label="millions" >
              Millions
            </ToggleButton>
            <ToggleButton value="lakhs" aria-label="lakhs" >
              Lakhs
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
          
        <div className={`md:hidden ${isPathAvailable(pathName, rejectedPaths) ? 'opacity-45' : ''}`}>
          <ToggleButtonGroup
            value={numerictype}
            exclusive
            onChange={handleChange}
            disabled={isPathAvailable(pathName, rejectedPaths)}
            className='h-8  moneytype  border text-xs  '
            style={{ padding: "0", backgroundColor: "rgba(236, 236, 236, 0.20)", borderRadius: "30px", border: "1px solid #67EAB3" }}
          >
            <ToggleButton value="millions" aria-label="millions" >
              <span className='text-xs font-semibold'>$Millions</span>
            </ToggleButton>
            <ToggleButton value="lakhs" aria-label="lakhs">
              <span className='text-xs font-semibold'>₹Lakhs</span>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className='border border-zinc-400 w-full'></div>
        <Link to="" className={`header_menu_item ${isPathAvailable(pathName, rejectedPaths) ? 'opacity-45' : 'opacity-45'}`}><img src={About} />About RapidFIRE</Link>
        <Link className='header_menu_item' onClick={logout}><img src={Logout} />Logout</Link>
      </div>
      <ToastContainer containerId={'containerB'} hideProgressBar toastStyle={{ width: 'fit-content', background: "#BCFBE4", color: "#0F3A4D", fontFamily: "Montserrat" }} />
    </>
  )
}

export default MyAccount
