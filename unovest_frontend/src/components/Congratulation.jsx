import React, { useEffect, useState } from 'react'
import congratulationBg from './../assets/images/congratulationbg.png'
import flag from './../assets/images/Flag.png'
import { congratulationsflag, copy_link, fb_icon, linkedin_icon, medium, share, whats_app, diamond,Whatsapp,Linkedin,X,Telegram,Facebook } from '../assets/Icons'
import RoundedBtn from './RoundedBtn'
import Menubar from './Menubar'
import { useNavigate } from 'react-router'
import { getUserExpenseDetails } from '../pages/destop_L1/server'
import { useDispatch } from 'react-redux'
import { updateCradInputs } from '../redux/slices/Card_Inputs'
import Notifier from './notifierModal/Notifier'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BACKENDURL, REFERRALENDPOINT } from '../Variable'
import Confettis from './congratulationConfetti/Confetti'
import {  copy_green, share_green } from '../assets/images'


const Congratulation = () => {
    const naviagte = useNavigate();
    const dispatch =  useDispatch();
    const [notify,setNotify] = useState({
        refferal: false,
        shareLink: false
    });
    let referralCopy=null;
    let SocialIcons = [fb_icon, linkedin_icon, whats_app, medium,]
    const [userRefferal, setUserRefferal] = useState();
      const [congratulate, setCongratulate] = useState(false);
    const [isDelay, setIsDelay] =  useState({
        delay2s: false,
        delay3s: false,
        delay4s: false,
        delay5s: false,
    });
    const iconArray=[
    {
       id:1,
       icons: Whatsapp,
       link: "https://web.whatsapp.com/"
    },
    {
        id:2,
        icons: Facebook,
        link: "https://www.facebook.com/"
    },
    {
        id:3,
        icons: Linkedin,
        link: "https://www.linkedin.com/"
    },
    {
        id:4,
        icons: X,
        link: "https://twitter.com/i/flow/login"
    }, {
        id:5,
        icons: Telegram,
        link: "https://web.telegram.org/k/"
    },
]

    useEffect(()=>{
        fetchUserRefferal();
        delayFunction(2000, 'delay2s');
        delayFunction(3000, 'delay3s');
        delayFunction(4000, 'delay4s');
        delayFunction(5000, 'delay5s');
        setCongratulate(true);
    },[]);

    const fetchUserRefferal=()=>{
            getUserExpenseDetails("mynamecodecoin", success => {
                if(success.data.code === 200){
                    setUserRefferal(success.data.message)
                    dispatch(updateCradInputs({refferal_user:success.data.message}))
                }
            }, error => {
                console.log(error)
                handleAlertClick('Please enter income','error')
            })
         
    }

    const handlerCopyLink=async()=>{
        setNotify({
            ...notify,
            refferal: true
        })
        toast.success("Refferal code copied")
         referralCopy = `${REFERRALENDPOINT}SignUp/?refree=${userRefferal?.code}` 
        // let referralCopy = `localhost:5173/SignUp/?refree=${userRefferal?.code}` 
        await navigator.clipboard.writeText(referralCopy);
    }

    const handlerShareOthers =() =>{
        console.log('share others');
        setNotify({
            ...notify,
            shareLink: true
        })
    }

    const toggleModal=(status)=>{
        setNotify({
            refferal: false,
            shareLink: false
        })
    }

    // delay any function
    const delayFunction=(delay, name)=>{
        setTimeout(() => {
            setIsDelay((prevIsDelay) => ({
                ...prevIsDelay,
                [name]: true
              }));
        }, delay);
    }
    console.log(isDelay,'isDelay');

    return (
        <div className='w-full bg-get-start-gradient min-h-screen'>
            <Menubar redirected={"congratulations"} refferalDetails={userRefferal} />
            <div className="flex flex-col justify-center items-center 2xl:pt-16  xl:pt-8 lg:pt-4 pt-16">

                <img src={congratulationsflag} alt="" className='2xl:w-[30%] xl:w-[34%] lg:w-[45%] sm:w-[55%] w-[70%]  animate-fade-in' />

                <div className='flex  flex-col gap-3 congratulation_Card bg-transparent mt-0'>
                    {isDelay?.delay2s && (
                        <div className="md:bg-accent-bright-green bg-transparent w-full rounded-2xl md:shadow-[0px_20px_80px_2px_#000] py-3 md:py-6 px-6 md:px-12 flex flex-col justify-center items-center gap-2 animate-fade-in">
                        <p className='font-black text-xl text-center md-text-2xl lg:text-4xl text-accent-bright-green md:text-dark-blue'>{`Congratulations, ${userRefferal?.name.charAt(0).toUpperCase()+ userRefferal?.name.substr(1).toLowerCase()}!`}</p>
                        <p className='card_text md:text-dark-blue max-md:text-grey-3 '>You just unlocked Financial Freedom</p>

                        </div>
                    )}
                    <div className="flex flex-wrap gap-3 px-4 md:px-0">
                        {isDelay?.delay3s && (
                        <div className='md:flex-1 congratulation_subCard bg-mob-home-card-gradient'>
                        <div className='flex items-center bg-slate-300 rounded-[26px] shadow w-max mx-auto px-2'>
                            <img src={diamond} alt="" />
                            <p className='text-cyan-950 text-xl lg:text-2xl  font-extrabold font-["Work Sans"]'>{`+${userRefferal?.coins}`}</p>
                        </div>
                        <h3 className="card_heading mt-2">Congrats! You got more coins</h3>
                        <p className="card_subHeading leading-tight italic md:not-italic text-slate-400 md:text-zinc-100">You can use them to Activate myPowers to play out various scenarios later..</p>
                        </div>
                        )}
                       
                        {isDelay?.delay4s && (
                        <div className="md:flex-1 congratulation_subCard bg-mob-home-card-gradient ">
                        <h3 className="card_heading mt-2">Invite Your Friends</h3>
                        <p className="card_subHeading leading-tight italic md:not-italic text-slate-400 md:text-zinc-100">Get your friends to join this journey, earn more coins and access the next level</p>
                        <div className='flex justify-center gap-4 mt-4'>
                            <button onClick={handlerCopyLink} className="flex items-center justify-center text-accent-bright-green leading-snug bg-mob-primary-gradient card_button">
                            <img src={copy_green} className='me-[11px] w-6  md:hidden block' alt="copy link image" srcSet="" />
                            <img src={copy_link} className='me-[11px] w-6 max-lg:w-5 hidden md:block' alt="copy link image" srcSet="" />
                                Copy Link
                            </button>
                            <button onClick={handlerShareOthers} className="flex items-center justify-center text-accent-bright-green leading-snug bg-mob-primary-gradient card_button">
                            <img src={share_green} className='me-[11px] w-6 md:hidden block' alt="copy link image" srcSet="" />
                            <img src={share} className='me-[11px] w-6 max-lg:w-5 hidden md:block' alt="copy link image" srcSet="" />
                                <span className='md:block hidden'>Share with others</span>
                                <span className='md:hidden block'>Share</span>
                                
                            </button>
                        </div>

                        </div>
                        )}
                      
                    </div>
                    {isDelay?.delay5s && (
                    <div className='rounded-[30px] self-center animate-grow-out min-2xl:mb-12' style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
                    <RoundedBtn label={"Show my Results"}
                        onClick={() => naviagte('/level-1/quiz/result')}
                    />
                    </div>
                    )}
                  
                    {notify.shareLink && <Notifier text={"Share & Earn Rewards"} iconsArray={iconArray} handlerCopyLink={handlerCopyLink} toggleModal={toggleModal} open={notify.shareLink} img_icon={share} userRefferal={userRefferal}/>}
                    <ToastContainer hideProgressBar toastStyle={{background:"#BCFBE4", color:"#0F3A4D", fontFamily:"Montserrat"}}/>
                    <Confettis start={congratulate}/>   
                </div>
            </div>
        </div>
    )
}

export default Congratulation
