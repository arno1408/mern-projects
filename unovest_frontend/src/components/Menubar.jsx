import React, { useEffect, useRef, useState } from 'react';
import { Avatar, BellIcon, Menu, more, topbar_steps, Diamond,share } from "../assets/Icons";
import MyAccount from "./MyAccount";
import { AnimalsData } from '../constants';
import Tooltip from './tooltip/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import ExitReminder from '../popup/ExitReminder';
import { updateCradInputs } from '../redux/slices/Card_Inputs';
import { saveDetails } from '../pages/destop_L1/server';
import { useNavigate } from 'react-router-dom';
import { REFERRALENDPOINT, iconArray } from '../Variable';
import Notifier from './notifierModal/Notifier';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { googleLogout } from '@react-oauth/google';

let Progressstepper = () => {
    return (
        <svg width="64" height="40" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_4944_7828)">
                <path d="M15.2444 29.6756H6C6 21.4311 10.3913 14.1845 17.0222 10.0293L21.8418 17.7109C17.8653 20.2828 15.2444 24.6814 15.2444 29.6756Z" fill="#435066" />
                <path d="M54 29.6756H44.7556C44.7556 24.9969 42.4553 20.8409 38.8952 18.2198L44.1626 10.8215C50.1268 15.0699 54 21.9327 54 29.6756Z" fill="#435066" />
                <path d="M30 6.32422C25.7382 6.32422 21.7358 7.40504 18.2667 9.30033L22.6182 17.2418C24.7894 16.0188 27.3107 15.3188 30 15.3188C33.0164 15.3188 35.8213 16.1994 38.1582 17.7109L42.9778 10.0293C39.2361 7.68461 34.7813 6.32422 30 6.32422Z" fill="#435066" />
                <path d="M15.2444 29.6756H6C6 21.4311 10.3913 14.1845 17.0222 10.0293L21.8418 17.7109C17.8653 20.2828 15.2444 24.6814 15.2444 29.6756Z" fill="#67EAB3" />
                <path d="M30 6.32422C25.7382 6.32422 21.7358 7.40504 18.2667 9.30033L22.6182 17.2418C24.7894 16.0188 27.3107 15.3188 30 15.3188C33.0164 15.3188 35.8213 16.1994 38.1582 17.7109L42.9778 10.0293C39.2361 7.68461 34.7813 6.32422 30 6.32422Z" fill="#67EAB3" />
            </g>
            <defs>
                <filter id="filter0_d_4944_7828" x="0" y="0.324219" width="64" height="39.3516" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="2" dy="2" />
                    <feGaussianBlur stdDeviation="4" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4944_7828" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4944_7828" result="shape" />
                </filter>
            </defs>
        </svg>
    )
}

    const Menubar = ({ redirected, refferalDetails }) => {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isReminderOpen, setIsReminderOpen] = useState(false);
    const [referralCopied, setReferralCopied] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    
    const [invite, setInvite]= useState({
        refferal: false,
        shareLink: false
      });

    const dispatch = useDispatch();
    const menuRef = useRef();
    const menuMobileRef = useRef();
    const navigate = useNavigate();
    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };
    const userDetails = JSON.parse(localStorage.getItem('userdetails'));
    const remainder_date = userDetails?.user_data?.reminder_date;
    const [selectedDate, setSelectedDate] = useState(remainder_date);
    const reminderRef = useRef(null);
    const allmodals = useSelector((state) => state?.Card_inputs);
    const userRefferal = useSelector((state) => state?.Card_inputs?.refferal_user);

    const handleDateChange=(value)=>{
        const dateFormat = new Date(value.$d);
        const setDate = `${dateFormat.getFullYear()}-${dateFormat.getMonth()+1}-${dateFormat.getDate()}`
        setSelectedDate(setDate);
    }

    const toggleReminderModal = () => {
        dispatch(updateCradInputs({isReminderOpen: false}))
        setIsReminderOpen(!isReminderOpen);
    };

    //------------------logout functionality is added here------------------//
    const onRemainderSet=()=>{
        const payload = {
            user_auth: userDetails?.user_data?.id,
            reminder_date:selectedDate 
        }
        saveDetails('user_remind_date',payload,(success) =>{
            if(success.data.code === 200){
                setPopupVisible(false);
                dispatch(updateCradInputs({isReminderOpen: false}));
                googleLogout();
                localStorage.clear();
                navigate('/')
            }
        },(error) =>{
            console.log(error.data);
        })
    }


    const BasecampMessage = () => {
        return (
            <div className=' text-slate-200 font-medium text-md p-3 w-96'>
                <div>
                    What is Basecamp? <br /> <br />
                    You can see the FIRE gap (the distance) now but not fathom it. That knowledge lies at the Basecamp.<br /> <br />
                    While going to the BaseCamp, you get a much better understanding of how the numbers are stacking up for you.<br /> <br />
                    And a better view of the challenge ahead - the Summit. Let’s start?<br /> <br />
                </div>
            </div>
        )
    }

    const toggleModal=()=>{
        setInvite({
          refferal: false,
          shareLink: false
        });
        dispatch(updateCradInputs({isInviteOpen: false}))
      }
    
    const handleAlertClick=(message,type)=>{
        if(message){
            if(type == 'success'){
                toast.success(message)
            }else if(type == 'error'){
                toast.error(message)
            }else{
                toast(message)
            }
        }
    }
    
      const handlerCopyLink=async()=>{
        setInvite({
          ...invite,
          refferal: true
        });
   
        // handleAlertClick("Refferal code copied", 'success')
        // toast.success("Refferal code copied")
        setReferralCopied(true);
        let referralCopy = `${REFERRALENDPOINT}SignUp/?refree=${userRefferal?.code}` 
        // let referralCopy = `localhost:5173/SignUp/?refree=${userRefferal?.code}` 
        await navigator.clipboard.writeText(referralCopy);
    }

    console.log(allmodals?.isInviteOpen,"allmodel");

    useEffect(() => {
        if (window.innerWidth < 768) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
    }, [window.innerWidth]);

    useEffect(() => {
        if(allmodals?.isReminderOpen){
            setPopupVisible(false);
        }
        if(allmodals?.remainderDate){
            setSelectedDate(allmodals?.remainderDate)
        }
        if(allmodals?.isInviteOpen){
            setPopupVisible(false);
                setTimeout(() => {
                    setInvite({
                    ...invite,
                    shareLink: true
                    })
                }, 200);
        }
      }, [allmodals?.isReminderOpen, allmodals?.remainderDate, allmodals?.isInviteOpen]);

     //--------------------------close menu on outside click-------------------------//
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            setPopupVisible(false);
          }
        };

        const handleClickOutsideMobile = (event) => {
            if (menuMobileRef.current && !menuMobileRef.current.contains(event.target)) {
                setPopupVisible(false);
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('mousedown', handleClickOutsideMobile);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
          document.removeEventListener('mousedown', handleClickOutsideMobile);
        };
      }, [menuRef, menuMobileRef]);
   
    const tooltipArray = [
        {
            id: 1,
            tooltipId: 'basecamp',
            message: <BasecampMessage/>
        },{
            id: 2,
            tooltipId: 'myFireCoin',
            message: 'myFIREcoin Balance'
        },{
            id: 3,
            tooltipId: 'notification',
            message: 'Notifications'
        }
    ]

    return (
        <>
            <div className=" flex justify-between items-center pt-4 md:py-2 lg:py-1 2xl:py-2 max-sm:px-8 px-4 gap-0   md:card-shadow md:bg-menu-bar-bg  ">
                <div className="flex-1 flex items-center gap-8">
                    <p className="menubar-rapidfire">RapidFIRE</p>
                    <div className="hidden md:flex gap-2 items-center">
                        <div className="lg:w-[186px] w-[176px] h-[38px] px-3 py-2  rounded-[15px] flex justify-center items-center gap-1 shadow-sm shadow-gray-800 border-opacity-60"
                            style={{ background: 'linear-gradient(180deg, rgba(154, 154, 154, 0.20) 0.49%, rgba(154, 154, 154, 0.10) 99.66%)', }}
                        >
                            <Progressstepper />
                            <div data-tooltip-id='basecamp' className="basecamp-text">
                                Basecamp
                            </div>
                        </div>
                    </div>
                </div>

                {/* ----------------------for mobile header--------------------------*/}      
                {/* ----------------------for desktop header--------------------------*/ }
                {isMobile ? (
                    <>
                        <button type="button" className="block md:hidden">
                            <img src={BellIcon} data-tooltip-id="notification" alt="notification" srcSet="" />
                        </button>
                        <div className='relative' ref={menuRef}>
                            <button type="button" className="block md:hidden pl-2" onClick={togglePopup}>
                                <img src={Menu} className="w-5 h-5 object-fill" alt="Menu" srcSet="" />
                            </button>
                            <div className='absolute top-4 right-8 md:hidden max-md:w-[200px]'>
                                {isPopupVisible && (
                                    <MyAccount setInvite={setInvite} invite={invite} handleAlertClick={handleAlertClick} />
                                )}
                            </div>
                        </div>
                    </>
                ) :
                (
                    <>
                        <div className="hidden md:flex flex-1 justify-end gap-6 items-center mr-9">
                            <div data-tooltip-id='myFireCoin' className="firecoins">
                                <img src={Diamond} alt="" className="w-7 lg:w-5 2xl:w-7" />
                                {refferalDetails?.coins || 0}
                            </div>
                            <button data-tooltip-id='notification' type="button" className=""><img src={BellIcon} alt="notification" srcSet="" /></button>
                            <div className='relative' ref={menuRef}>
                                <button type="button" onClick={togglePopup}>
                                    <img className="w-8 h-8 ml-1 mt-2 border-2 rounded-full" style={{ backgroundColor: userDetails?.user_data?.avatar_color }} src={`https://anonymous-animals.azurewebsites.net/avatar/:${AnimalsData[userDetails?.user_data?.avatar_id]}`} alt="animal_icon" srcSet="" />
                                </button>
                                <div className='absolute top-4 right-5' >
                                    {isPopupVisible && (
                                        <MyAccount setInvite={setInvite} invite={invite} handleAlertClick={handleAlertClick} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )
                }
                
                {invite.shareLink && (
                    <div>
                        <Notifier text={"Share & Earn Rewards"} referralCopied={referralCopied} iconsArray={iconArray} handlerCopyLink={handlerCopyLink} toggleModal={toggleModal} open={invite.shareLink} img_icon={share} userRefferal={userRefferal} />
                    </div>
                )}

                {tooltipArray.map(tip => (
                    <Tooltip
                        id={tip.tooltipId}
                        backgroundColor={'#232E41'}
                        message={tip.message}
                        zIndex={999}
                        opacity={1}
                    />
                ))}
                {allmodals?.isReminderOpen && (
                    <div ref={reminderRef}>
                        <ExitReminder 
                        forwardRef={reminderRef} 
                        onRemainderSet={onRemainderSet} 
                        selectedDate={selectedDate} 
                        handleDateChange={handleDateChange} 
                        onClose={toggleReminderModal}/>
                    </div>
                )}       
            </div>
              <ToastContainer containerId={'containerA'} hideProgressBar toastStyle={{ background: "#BCFBE4", color: "#0F3A4D", fontFamily: "Montserrat" }} />    

            {/* <div className=" flex justify-between items-center bg-dark-blue shadow py-2 px-4 gap-3">
                <div className="flex-1"><h1 className="text-2xl font-extrabold text-grey-3">RapidFIRE</h1></div>

                <div className="flex-1 flex justify-evenly items-center text-dark-blue">
                    <button className="cursor-pointer text-base text-accent-light-blue font-semibold  uppercase leading-tight">Level 0</button>
                    <button className="cursor-pointer text-[28px] font-black text-accent-bright-green uppercase">Level 1</button>
                    <button className="cursor-pointer text-base text-accent-light-blue font-semibold  uppercase leading-tight">Level 2</button>
                </div>

                <div className="flex-1 flex justify-end gap-12 items-center">
                    <div className=" flex items-center gap-1">
                        <img src={Avatar} alt="" srcSet="" />
                        <div className=" flex items-center gap-2">
                            <span className="text-grey-2 text-lg font-medium leading-normal">hi,</span>
                            <span className="text-grey-2 text-xl font-bold leading-normal">Jane</span>
                        </div>
                    </div>
                    <button type="button" className=""><img src={BellIcon} alt="notification" srcSet="" /></button>
                    <button type="button" className=""> <img src={Menu} alt="Menu" srcSet="" /></button>
                </div>
            </div> */}
        </>
    )
}


export default Menubar