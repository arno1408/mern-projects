import React, { useEffect, useState } from 'react'
import { filter } from '../assets/Icons'
import { useNavigate } from 'react-router-dom'
import { getUserExpenseDetails, userActivePower } from '../pages/destop_L1/server';
import { useDispatch } from 'react-redux';
import { myPowerExpiry } from '../redux/slices/Page_Data';
import { updateCradInputs } from '../redux/slices/Card_Inputs';
const MyPowerButton = ({ className, handleAlertClick }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = window.location.pathname;    

    const [myPower, setMypower] =  useState({});
    const [isMobile, setIsMobile] = useState(false);
    const onClickHandler=()=>{
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
    useEffect(() => {
        const checkIfMobile = () => {
          if (window.innerWidth <768) {
            setIsMobile(true);
          } else {
            setIsMobile(false);
          }
        };
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => {
          window.removeEventListener('resize', checkIfMobile);
        };
      }, []);
    return (
        <div className={`${className ? className : ''} ${isMobile ? 'mt-0': 'mt-7' } md:mt-0`}>
            <button onClick={onClickHandler} className="Mypower-btn" style={{ boxShadow: "0px 20px 80px 2px #000" }}>
                <div className="grow shrink basis-0 text-center">
                    <span className="text-cyan-950 text-lg md:text-[28px] font-extrabold font-Montserrat">Activate </span>
                    <span className="text-cyan-950 text-lg font-semibold font-Montserrat">my</span>
                    <span className="text-cyan-950 text-lg md:text-[28px] font-extrabold font-Montserrat">Powers</span>
                </div>
                <div className="">
                    <img src={filter} alt="" />
                </div>
            </button>
        </div>
    )
}

export default MyPowerButton
