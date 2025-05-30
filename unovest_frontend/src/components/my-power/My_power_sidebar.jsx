import Money_Matters from './sidebar-icons/Money_Matters'
import Rewards_icon from './sidebar-icons/Rewards_icon'
import Insights_icon from './sidebar-icons/Insights_icon'
import Advisor_icon from './sidebar-icons/Advisor_icon'
import { filter, left_arrow, right_icon } from '../../assets/Icons'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoLockClosed } from "react-icons/io5";
import { resetMy_powersidebar, updateMy_powersidebar } from '../../redux/slices/My_powersidebar'
import Tooltip from '../tooltip/Tooltip';
import { useNavigate } from "react-router-dom";
import WhatifBlack_icon from './sidebar-icons/WhatifBlack_icon'
import { getUserExpenseDetails, userActivePower } from '../../pages/destop_L1/server'
import { myPowerExpiry } from '../../redux/slices/Page_Data'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateCradInputs } from '../../redux/slices/Card_Inputs'

const My_power_sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = window.location.pathname;
  const sidebar_bottom_list = useSelector(state => state?.My_powersidebar.sidebar_bottom_list);
  const sidebar_top_list = useSelector(state => state?.My_powersidebar?.sidebar_top_list);
  const whatif_bottom_list = useSelector(state => state?.My_powersidebar.whatif_bottom_list);
  // const userdetails = JSON.parse(localStorage.getItem("userdetails"));
  const page_data = useSelector((state) => state.Page_Data);
  const currentSection = useSelector(state => state?.My_powersidebar.currentSection);
  // const [topSidebarList, setTopSidebarList] = useState(sidebar_top_list);
  const [expanded, setExpanded] = useState(true)
  let topbarUpdatedList = [...sidebar_top_list];

  let SidebarItemBottom = ({ id, Icon, text, active, my, onClick, disable }) => {
    return (
      <div className={`flex gap-1 items-center w-fit  ${active ? " " : ""}`}>
        <button className={`p-2.5 rounded-[15px] cursor-pointer ${active ? "bg-accent-green grey-shadow leftborder relative" : ""} ${disable && 'opacity-45'}`}
          onClick={() => onClick(id)}
        >
          <Icon stroke={active ? "#0F3A4D" : "white"} />
        </button>
        <button
          onClick={() => onClick(id)}
          className={`${expanded ? 'w-[184px] p-2.5' : "w-0"} ${active ? "bg-grey-0 bg-opacity-10 " : ""} ${disable && 'opacity-45'} mySidebartop-button`}>
          <p className='tracking-[-0.36px] text-grey-1 flex justify-between items-center gap-1'>
            <span>
              {my && <span className="mySidebartop-Mytext">my</span>}
              <span className="mySidebartop-text">{text}</span>
            </span>
            {disable && <span className='items-center'><IoLockClosed color='#B5B5B5' fontSize={15} data-tooltip-id={`lockMypower`} /></span>}
          </p>
        </button>
      </div>
    )
  }

  let SidebarItemTop = ({ id, Icon, text, active, my, onClick, disable }) => {
    return (
      <div className={`flex gap-1 items-center w-fit  ${active ? " " : ""}`}>
        <button className={`p-2.5 rounded-[15px] cursor-pointer ${active ? "bg-grey-0-opacity   relative" : ""} ${disable && 'opacity-45'}`}
          onClick={() => onClick(id)}
        >
          <Icon stroke='white' />
        </button>
        <button
          onClick={() => onClick(id)}
          className={`${expanded ? 'w-[184px] p-2.5' : "w-0"}  ${active ? "bg-grey-0 bg-opacity-10 " : ""} ${disable && 'opacity-45'} mySidebartop-button`}>
          <p className='tracking-[-0.36px] text-grey-1 flex justify-between items-center gap-1'>
            <span>
              {my && <span className="mySidebartop-Mytext">my</span>}
              <span className="mySidebartop-text">{text}</span>
            </span>
            {disable && <span className='items-center'><IoLockClosed color='#B5B5B5' fontSize={15} data-tooltip-id='lockMypower' /></span>}
          </p>
        </button>
      </div>
    )
  }

  let WhatifSidebarItem = ({ id, Icon, text, active, onClick, disable, background, fill }) => {
    return (
      <div className={`flex gap-1 items-center w-fit  ${active ? "" : ""}`}>
        <button className={`p-3 rounded-[20px] cursor-pointer ${active ? `bg-${background} grey-shadow  relative` : ` border-[0.4px] border-${background}`} ${disable && 'opacity-100'}`}
          onClick={() => onClick(id)}
        >
          <Icon fill={active ? `black` : `${fill}`} />
        </button>
        <button
          onClick={() => onClick(id)}
          className={`${expanded ? 'w-[184px] p-2.5' : "w-0"} text-left h-[42px] ${active ? "bg-grey-0 bg-opacity-10 " : ""} ${disable && 'opacity-45'} rounded-[15px] cursor-pointer hover:bg-grey-0 hover:bg-opacity-10 overflow-hidden transition-all duration-500`}>
          <p className='tracking-[-0.36px] text-grey-1 flex justify-between items-center gap-1'>
            {disable && <span className='items-center'><IoLockClosed color='#B5B5B5' fontSize={15} data-tooltip-id='lockMypower' /></span>}
          </p>
        </button>
      </div>
    )
  }
  const handleSidebarChange = (selected_menu) => {
    if (location == '/my-account') {
      navigate('/level-1/quiz/result/insides/my-power/');
    }
    const updatedlist = sidebar_bottom_list.map((menu) => {
      return menu.id === selected_menu.id ? { ...menu, active: true } : { ...menu, active: false };
    });

    topbarUpdatedList = sidebar_top_list?.map((list) => {
      return { ...list, active: false }
    })
    // setTopSidebarList(topbarUpdatedList);
    dispatch(updateMy_powersidebar({ sidebar_bottom_list: updatedlist, sidebar_top_list: topbarUpdatedList, currentSection: 2,currentSidebarSection: 0 }));
  }

  const handleWhatifSidebarChange = (selected_menu) => {
    if (location == '/my-account') {
      navigate('/level-1/quiz/result/insides/my-power/');
    }
    const updatedlist = whatif_bottom_list.map((menu) => {
      return menu.id === selected_menu.id ? { ...menu, active: true } : { ...menu, active: false };
    });
    topbarUpdatedList = sidebar_top_list?.map((list) => {
      return { ...list, active: false }
    })
    // setTopSidebarList(topbarUpdatedList);
    dispatch(updateMy_powersidebar({ whatif_bottom_list: updatedlist, sidebar_top_list: topbarUpdatedList, currentSection: 5, isCaseSelected: true,currentSidebarSection: 0 }));
  }

  const topSidebarClickHandler = (id) => {
    topbarUpdatedList = sidebar_top_list?.map((list, index) => {
      return index === id ? { ...list, active: true } : { ...list, active: false }
    })

    dispatch(updateMy_powersidebar({ sidebar_top_list: topbarUpdatedList, isCaseSelected: false ,currentSidebarSection: 0}));
   
    if (location == '/my-account') {
      navigate('/level-1/quiz/result/insides/my-power/');
    }
    // setTopSidebarList(topbarUpdatedList);
    // dispatch(resetMy_powersidebar());

    //to find out the section from selected array list
    switch (id) {
      case 0:
        // for selecting money matters section
        dispatch(updateMy_powersidebar({ currentSection: 1 }));
        break;
      case 1:
        // for selecting insight section
        dispatch(updateMy_powersidebar({ currentSection: 3 }));
        break;
      case 2:
        // for selecting myRewards section
        dispatch(updateMy_powersidebar({ currentSection: 4 }));
        break;
      case 3:
        // for selecting myAdvisor/whatif section
        dispatch(updateMy_powersidebar({ currentSection: 5 }));
        break;
      default:
        break;
    }
  }

  const LockMessage = () => {
    return (
      <div className='w-36'>
        please activate myPower to avail the feature
      </div>
    )
  }

  const handleAlertClick=(message,type)=>{
    if(type === 'success'){
        toast.success(message);
    }else if(type === 'warn'){
        toast.warn(message);
    }else if(type === 'error'){
        toast.error(message);
    }else{
        toast(message);
    }
}

  const ActivateMypower=()=>{

    let currentDate = new Date().toJSON();
    let currentTime = new Date();

    // for generating the current date and time format
    const getDateTime = currentDate.slice(0,10)+"T"+currentTime.toLocaleTimeString(undefined,{hour12:false});
    
    const activePowerPayload = {
        current_datetime : getDateTime
    }  

      userActivePower('user_active_power',activePowerPayload,(success) =>{
        if(success.data.code === 200){
            // setMypower(success.data.message)
            if(location !== '/level-1/quiz/result/insides/my-power/' ){
                navigate("/level-1/quiz/result/insides/my-power/")  
            }
            let userDetails = JSON.parse(localStorage.getItem('userdetails'));
            let updatedDetails = {
                ...userDetails,
                user_data: {
                    ...userDetails.user_data,
                    is_activated_my_power: true,
                    activate_my_power_expiry: success.data.message.activate_my_power_expiry,
                    is_expired:success.data.message.is_expired
                }
            };
            let updatedDetailJSON = JSON.stringify(updatedDetails)
            localStorage.setItem('userdetails',updatedDetailJSON)

            dispatch(myPowerExpiry({
                is_expired: success.data.message.is_expired, 
                activate_my_power_expiry: success.data.message.activate_my_power_expiry,
                is_activated_my_power: true,
            }))

              getUserExpenseDetails("mynamecodecoin", success => {
                // debugger;
                if (success.data.code === 200) {
                    dispatch(updateCradInputs({ refferal_user: success.data.message }))
                }
                }, error => {
                    console.log(error)
                    // handleAlertClick('please Enter income','error')
                })

            setTimeout(() => {
                handleAlertClick(success.data.status_message, 'success');
            }, 2000);
        }else{
            handleAlertClick(success.data.status_message);
        }
    },(error)=>{
        console.log(error)
    })
  }

  return (

    <aside className={`myPowerSidebar-Container`}
      style={{ background: 'radial-gradient(203.82% 246.31% at 149.17% -96%, #9891AD 0%, #538096 43.14%, #2D4054 71.99%, #131529 91.11%)' }}
    >
      <div className={`flex flex-col 2xl:gap-4 max-2xl:gap-0 pl-2.5 ${expanded ? 'pr-2.5' : ""}`}>

        <div className={`flex gap-2.5 items-center`} onClick={() => setExpanded(pre => !pre)}>
          <div className={`p-2.5 rounded-[15px] `}>
            <img src={expanded ? left_arrow : right_icon} className='w-4' alt="" srcset="" />
          </div>
          <div className={`${expanded ? ' w-[184px] p-2.5' : "w-0"} collapse-container`}>
            <p className='collapse-text'>Collapse</p>
          </div>
        </div>

        {sidebar_top_list?.map((item) =>
          <SidebarItemTop key={item.text}
            id={item.id}
            Icon={item.icon}
            text={item.text}
            active={item.active}
            my={item.my}
            onClick={topSidebarClickHandler}
          />
        )}

        <div className={`flex 2xl:gap-2  max-2xl:gap-1 items-center  `} >
          <button className="2xl:h-10  max-2xl:h-8 aspect-square flex items-center justify-center  rounded-2xl border border-dark-blue " style={{ background: 'linear-gradient(180deg, #FF5151 0%, #FFD84C 100%)' }}>
            <img src={filter} className="w-6" alt="" srcSet="" />
          </button>
          <div onClick={() =>ActivateMypower()} className={`${expanded ? ' w-[184px] p-2.5' : "w-0 "} text-grey-1 hover:text-slate-700 h-[42px] rounded-[15px] justify-start items-center gap-2.5 inline-flex cursor-pointer ${page_data?.is_expired ? 'bg-transparent flex gap-1' : 'bg-grey-0'}  bg-opacity-10 hover:bg-gradient-to-l from-red-500 to-amber-300  hover:bg-opacity-10  overflow-hidden transition-all duration-500`}>
          <p className='tracking-[-0.36px] text-grey-1'>
              <span className="mySidebartop-Mytext">my</span>
              <span className="mySidebartop-text">Powers</span></p>
            {page_data?.is_expired && <IoLockClosed color='#B5B5B5' data-tooltip-id='lockMypower' />}
          </div>

        </div>
      </div>  
      <Tooltip
        id={'lockMypower'}
        backgroundColor={'#232E41'}
        message={<LockMessage />}
        position='right'
        opacity={1}
      />

      <div className="flex flex-col gap-3 ">
        {currentSection !== 5 && (
          <>
            {expanded && (
              <div className="">
                <p className="Freedom_GraphText">Use these to readjust your Financial <br /> Freedom Graph </p>

                <div className="MyPower-container bg-gradient-to-l from-red-500 to-amber-300 ">
                  <div className="grow shrink basis-0 text-center text-dark-blue">
                    <span className="mypower-mytext">my</span>
                    <span className="mypower-myPower">Powers</span>
                  </div>
                  <div className="relative">
                    <img src={filter} className="w-6" alt="" srcSet="" />
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {currentSection === 5 && (
          <div className='pt-[8.5rem]'>
            <button className='ml-3 p-2.5 rounded-[15px] bg-light-blue-1 grey-shadow whatifleftborder relative' >
              <WhatifBlack_icon />
            </button>
          </div>
        )}

        {currentSection === 5 && (
          <div className={`flex flex-col gap-8 pl-2.5 ${expanded ? 'pr-2.5' : ''}`} >
            {whatif_bottom_list?.map((item) =>
              <WhatifSidebarItem key={item.id}
                onClick={() => { handleWhatifSidebarChange(item) }}
                Icon={item.icon}
                border={item.border}
                background={item.backgroundColor}
                fill={item.fill}
                text={item.text} active={item.active} my={item.my}
                disable={page_data.is_expired}
              />
            )}
          </div>
        )}

        {currentSection !== 5 && (
          <div className={`flex flex-col gap-1.5 pl-2.5 ${expanded ? 'pr-2.5' : 'pt-20 '}`} >
            {sidebar_bottom_list?.map((item) =>
              <SidebarItemBottom key={item.text}
                onClick={() => { handleSidebarChange(item) }}
                Icon={item.icon}
                text={item.text} active={item.active} my={item.my}
                disable={page_data.is_expired}
              />
            )}
          </div>
        )}

      </div>
      <ToastContainer containerId={'containerB'} hideProgressBar autoClose={1000} toastStyle={{ width: 'fit-content', background: "#BCFBE4", color: "#0F3A4D", fontFamily: "Montserrat" }} />
    </aside>
  )
}

export default My_power_sidebar
