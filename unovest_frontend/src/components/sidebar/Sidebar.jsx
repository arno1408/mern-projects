import React, { useEffect, useState, useRef } from 'react';
import { InviteFriends, Sidebar_logo } from '../../assets/images';
import { Link } from 'react-router-dom';
import { MdPersonOutline } from "react-icons/md";
import { IoIosPower } from "react-icons/io";
import { PiStarFour } from "react-icons/pi";
import { LuInbox } from "react-icons/lu";
import ModeSwitch from './ModeSwitch';
import { AnimalsData } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { updateCradInputs } from '../../redux/slices/Card_Inputs';
import { ImCross } from "react-icons/im";
import { Menu } from "../../assets/Icons";
import { left_arrow, right_icon } from '../../assets/Icons'
import myrewards from './../../pages/account/components/myRewards/Myrewards';
import { updateMy_powersidebar } from '../../redux/slices/My_powersidebar';
import { MdOutlineShare } from "react-icons/md";

const Sidebar = () => {
    const userdetails = JSON.parse(localStorage.getItem("userdetails"));
    const  sidebar_myAccount_list= useSelector(state => state?.My_powersidebar?.sidebar_myAccount_list);
    const currentSidebarSection = useSelector(state => state?.My_powersidebar.currentSidebarSection);
    const [menuOpen, setMenuOpen] = useState(true);
    const dispatch = useDispatch();
    const sidebarRef = useRef(null);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
      };

    useEffect(() => {
        if(window.innerWidth <=768 ){
            setMenuOpen(false)
         }
        const handleClickOutside = (event) => {
            if (window.innerWidth < 768 && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setMenuOpen(false);
            }   
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
   
    const getDateRemainder = () => {
        dispatch(updateCradInputs({ isReminderOpen: true }))
    }
    const logout = () => {
        getDateRemainder();
        // Note: logout functionality is handled in Menubar.jsx
    };
    const myAccountSidebar = (selected_menu) => {
        if(window.innerWidth <=768 ){
            setMenuOpen(false)
         }
        const updatedlist = sidebar_myAccount_list.map((menu) => {
            return menu.id === selected_menu.id ? { ...menu, active: true } : { ...menu, active: false };
        });
        dispatch(updateMy_powersidebar({ sidebar_myAccount_list: updatedlist, currentSidebarSection: selected_menu.id }));
        switch (selected_menu.id) {
            case 0:
                dispatch(updateMy_powersidebar({ currentSidebarSection: 1 }));
                break;
            case 1:
                dispatch(updateMy_powersidebar({ currentSidebarSection: 2 }));
                break;
            case 2:
                dispatch(updateMy_powersidebar({ currentSidebarSection: 3 }));
                break;
            case 3:
                dispatch(updateMy_powersidebar({ currentSidebarSection: 4 }));
                break;
            case 4:
                dispatch(updateMy_powersidebar({ currentSidebarSection: 5 }));
                break;
            default:
                break;
        }
    };
    const handlerShareOthers = () => {
        setMenuOpen(false)
        dispatch(updateCradInputs({ isInviteOpen: true }));
    };
    return (
        // <div ref={sidebarRef} className='max-h-screen '>
        //     <button type='button' className='md:hidden   m-4 mr-8 w-5 h-5 ' onClick={toggleMenu}>
        //         <img src={Menu} className="w-full object-fill" alt="Menu" />
        //     </button>
        //     {menuOpen && (
        //         <div className='MyAccountSidebar-container'>
        //             <button className='md:hidden absolute top-0 right-0 m-4' onClick={toggleMenu}>
        //                 <ImCross />
        //             </button>
        //             <div>
        //                 <button className='w-full '>
        //                     <img className='mx-auto rounded-full border-4 border-accent-green border-solid w-20 h-20'style={{ backgroundColor: userdetails?.user_data?.avatar_color }} src={`https://anonymous-animals.azurewebsites.net/avatar/:${AnimalsData[userdetails?.user_data?.avatar_id]}`} alt="Avatar" />
        //                 </button>
        //                 <h2 className='Myaccount-Username'>{userdetails?.user_data?.full_name}</h2>
        //                 {sidebar_myAccount_list?.map((item) => (
        //                     <button key={item.id} id={item.id} onClick={() => myAccountSidebar(item)} className={`${item.active ? "bg-grey-0 bg-opacity-10 " : ""} ${item.className ? 'opacity-45' : ''} Myaccount-menu`} disabled={item.disabled}>
        //                         {item.text}
        //                         <div className='myaccountsidebar-icon'>
        //                             {React.createElement(item.icon)}
        //                         </div>
        //                     </button>
        //                 ))}
        //             </div>
        //             <div className='2xl:pb-10 '>
        //                 <button onClick={logout} className='Myaccount-menu'>
        //                     <h3>Logout</h3>
        //                     <div className='myaccountsidebar-icon'>
        //                         <IoIosPower />
        //                     </div>
        //                 </button>
        //                 <ModeSwitch />
        //                 <button onClick={handlerShareOthers} className='lg:ms-2'>
        //                     <img src={InviteFriends} alt="Invite Friends" />
        //                 </button>
        //             </div>
        //         </div>
        //     )}
        // </div>


    // <div ref={sidebarRef} className={`max-h-screen ${isCollapsed ? 'w-10' : 'w-64'}`}>
        <div className={`max-h-screen ${isCollapsed ? 'w-24' : 'w-64'} MyAccountSidebar-container`}>
          <button className=' absolute top-0 right-0 m-4' onClick={toggleSidebar}>
          <div className={`p-2.5 rounded-[15px] `}>
            <img src={isCollapsed ? left_arrow : right_icon} className='w-4' alt="" srcset="" />
          </div>
          </button>
          <div>
            <button className='w-full mt-8'>
              <img
                className={`mx-auto rounded-full border-4 border-accent-green border-solid   ${isCollapsed ? 'w-10 h-10' : 'w-20 h-20'}`}
                style={{ backgroundColor: userdetails?.user_data?.avatar_color }}
                src={`https://anonymous-animals.azurewebsites.net/avatar/:${AnimalsData[userdetails?.user_data?.avatar_id]}`}
                alt="Avatar"
              />
            </button>
            <h2 className={`Myaccount-Username ${isCollapsed ? 'hidden' : ''}`}>{userdetails?.user_data?.full_name}</h2>
            {sidebar_myAccount_list?.map((item) => (
              <button
                key={item.id}
                id={item.id}
                onClick={() => myAccountSidebar(item)}
                className={`${item.active ? 'bg-grey-0 bg-opacity-10 ' : ''} ${item.className ? 'opacity-45' : ''} Myaccount-menu`}
                disabled={item.disabled}
              >
                <span className={`${isCollapsed ? 'hidden' : ''}`}> {item.text}</span>
                <div className='myaccountsidebar-icon'>
                  {React.createElement(item.icon)}
                </div>
              </button>
            ))}
          </div>
          <div className=''>
            <button onClick={logout} className='Myaccount-menu'>
              <h3 className={`${isCollapsed ? 'hidden' : ''}`}>Logout</h3>
              <div className='myaccountsidebar-icon'>
                <IoIosPower />
              </div>
            </button>
            <ModeSwitch  isCollapsed={isCollapsed}/>
            <button onClick={handlerShareOthers} className='lg:ms-2'>
            {isCollapsed ? (
               <div className='p-2 mt-1 bg-accent-bright-green rounded-2xl  '>
                 <MdOutlineShare  className='w-7 h-7'/>
               </div>
            ):(
                <>
              <img src={InviteFriends} alt="Invite Friends" />
              </>
            )}
            </button>
          </div>
        </div>
    //   </div>

    );
};

export default Sidebar;

