import React, { useEffect, useState } from 'react';
import Money_Matters from './my-power/sidebar-icons/Money_Matters'
import Rewards_icon from './my-power/sidebar-icons/Rewards_icon'
import Insights_icon from './my-power/sidebar-icons/Insights_icon'
import Advisor_icon from './my-power/sidebar-icons/Advisor_icon'
import Settings from './my-power/sidebar-icons/Settings'
import { useSelector } from 'react-redux';

const sidebar_top_list = [
    { id: 0, icon: Money_Matters, active: false, my: false },
    { id: 1, icon: Insights_icon, active: false, my: false },
    { id: 2, icon: Settings, active: true, my: true },
    { id: 3, icon: Rewards_icon, active: false, my: true },
    { id: 4, icon: Advisor_icon, active: false, my: true },

]

let active_btn_style = {
    background: "linear-gradient(180deg, #FF5151 0%, #FFD84C 100%)",
    boxShadow: "2px 2px 4px 0px rgba(0, 0, 0, 0.50) inset",
    borderRadius: "15px"
}


const MobileNavigation = ({ChangeSection}) => {
    const [activeIcon, setActiveIcon] = useState(0);
    //   const userDetails = JSON.parse(localStorage.getItem('userdetails'))
      const page_data = useSelector((state) => state.Page_Data);
    //----------to set Insight section value when my power expires----------//
    useEffect(() =>{
        const expiryCalculations = () => {
            // const userdetails = JSON.parse(localStorage.getItem("userdetails"));
            // const page_data = useSelector((state) => state.Page_Data);
            let expiryDate = new Date(page_data?.activate_my_power_expiry);
            let currentDate = new Date();
    
            const navigateToInside = () => {
               setActiveIcon(1);
            }

            const navigateToMoneymatters =()=>{
                setActiveIcon(0);
            }
            
            switch (expiryDate) {
                case expiryDate > currentDate:
                    navigateToMoneymatters();
                    break;
                case expiryDate < currentDate:
                    if (page_data.is_expired) {
                        navigateToMoneymatters();
                    }
                    break;
                default:
                    // current date equals expiry date 
                    if (page_data?.is_expired) {
                        navigateToInside();
                    }
                    break;
            }
            
        }
        expiryCalculations();
    },[])


    const handleSetIcon=(index)=>{
        setActiveIcon(index);
        switch (index) {
            case 0:
                ChangeSection(1)
            break;
            case 1:
                ChangeSection(3)
            break;
            case 2:
                ChangeSection(2)
            break;
            case 3:
                ChangeSection(4)
            break;
            default:
                ChangeSection(5)
            break;
        }
    }

    return (
        <>
           {(page_data?.is_activated_my_power===true && page_data?.is_expired===false)?
             <>
            <div className="w-full block lg:hidden h-[80px] bg-gradient-to-l from-red-500 to-amber-300 justify-start items-center gap-2  fixed bottom-0">
                <div className="grow shrink basis-0 text-center text-dark-blue">
                    <span className="text-sm font-semibold leading-snug">my</span>
                    <span className="text-lg font-extrabold capitalize">Powers</span></div>


                <div className='block md:hidden rounded-t-[20px]  bg-opacity-90  w-full' style={{ background: "radial-gradient(203.82% 246.31% at 149.17% -96%, rgba(152, 145, 173, 0.90) 0%, rgba(83, 128, 150, 0.90) 37.25%, rgba(19, 21, 41, 0.90) 71.53%)", filter: "drop-shadow(-2px -2px 8px rgba(0, 0, 0, 0.50))" }}>
                    <div className='flex justify-between py-2 px-9'>

                        {sidebar_top_list.map((Item, Index) => {
                            return (
                                <button
                                    className='h-10 w-10 flex justify-center items-center'
                                    onClick={() => handleSetIcon(Index)}
                                    style={activeIcon === Index ? active_btn_style : {}} >
                                    {
                                        <Item.icon stroke={activeIcon === Index ? "#0F3A4D" : "white"} />
                                    }
                                </button>
                            )
                        }
                        )}

                    </div>
                </div>
            </div>
            </>:
            <div className='block md:hidden rounded-t-[20px]  bg-opacity-90 fixed bottom-0 w-full' style={{ background: "radial-gradient(203.82% 246.31% at 149.17% -96%, rgba(152, 145, 173, 0.90) 0%, rgba(83, 128, 150, 0.90) 37.25%, rgba(19, 21, 41, 0.90) 71.53%)", filter: "drop-shadow(-2px -2px 8px rgba(0, 0, 0, 0.50))" }}>
            <div className='flex justify-between py-2 px-9'>

                {sidebar_top_list.map((Item, Index) => {
                    return (
                        <button
                            className='h-10 w-10 flex justify-center items-center'
                            onClick={() => handleSetIcon(Index)}
                            style={activeIcon === Index ? active_btn_style : {}} >
                            {
                                <Item.icon stroke={activeIcon === Index ? "#0F3A4D" : "white"} />
                            }
                        </button>
                    )
                }
                )}

            </div>
        </div>
            }
        </>
    )
}

export default MobileNavigation

