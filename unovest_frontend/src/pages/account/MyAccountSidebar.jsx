import React, { useState } from 'react'
import profile_img from '../../assets/images/dummy-profile.png'
import { Link } from 'react-router-dom'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Myaccount, Upgrade, HelpCenter, About, Logout, social_share } from "../../assets/Icons"

function MyAccountSidebar() {

// const [mode, setMode] = useState(false);

// const modeChange = () => {
//   setMode(true);
// }


  return (
    <div className='w-[278px] p-6 bg-slate-600'>
      <div className='flex flex-col justify-between' style={{ minHeight: "calc(100vh - 48px)" }}>
        <div>
          <div className='flex flex-col items-center border-b border-slate-300'>
            <img src={profile_img} alt="" />
            <h3 className='text-zinc-100 text-2xl font-bold font-["Montserrat"] leading-[28.80px] pb-3'>
              Jane Smith
            </h3>
          </div>
          <ul className='flex flex-col gap-9 mt-9'>
            <li>
              <Link to="m" className='my-account-menu my-active-account-menu flex justify-between'>Account Settings <img src={Myaccount} alt="" className='w-6' /></Link>
            </li>
            <li>
              <Link to="m"  className='my-account-menu flex justify-between'>Upgrade <img src={Upgrade} alt="" className='w-6' /></Link>
            </li>
            <li>
              <Link to="m"  className='my-account-menu flex justify-between'>Rewards <img src={Upgrade} alt="" className='w-6' /></Link>
            </li>
            <li>
              <Link to="m"  className='my-account-menu flex justify-between'>About Us <img src={About} alt="" className='w-6' /></Link>
            </li>
            <li>
              <Link to="m"  className='my-account-menu flex justify-between'>Support <img src={HelpCenter} alt="" className='w-6' /></Link>
            </li>
          </ul>
        </div>
        <div className='mt-auto flex flex-col gap-6'>
          <li className='list-none'>
            <button className='my-account-menu flex justify-between w-full'>
              Logout <img src={Logout} alt="" className='w-6' />
            </button>
          </li>

          <ToggleButtonGroup
            orientation="horizontal"
            // value={view}
            exclusive
            // onChange={modeChange}
            className='bg-gray-200 bg-opacity-20 border border-zinc-400 overflow-hidden'
            
            style={{borderRadius:"30px"}}
          >
            <ToggleButton value="dark-mode" aria-label="dark-mode" className='active-mode' style={{paddingBlock:"5px", color: "#B7C3D8",  borderRadius: "30px", border: "1px solid #8792A6", backgroundColor: "#384151", boxShadow: "2px 2px 8px 0px rgba(0, 0, 0, 0.50)"  }}>
              Dark Mode
            </ToggleButton>
            <ToggleButton value="light-mode" aria-label="light-mode" className='other-mode' style={{paddingBlock:"5px", color: "#B7C3D8", borderRadius: "30px" }}>
              Light Mode
            </ToggleButton>
          </ToggleButtonGroup>

          <button className='text-cyan-950 text-xl font-bold font-["Montserrat"] leading-normal px-3 py-[6.2px] bg-emerald-300 rounded-2xl shadow border border-emerald-300 flex items-center justify-between w-full'>Invite Friends <img src={social_share} alt="" /></button>
        </div>
      </div>
    </div>
  )
}

export default MyAccountSidebar
