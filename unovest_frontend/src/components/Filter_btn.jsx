import { filter } from "../assets/Icons"
import Tooltip from "./tooltip/Tooltip"
import {} from "../assets/Icons/index"
import Assumptions_icon from "./my-power/sidebar-icons/Assumptions_icon"
import Cashflow_icon from "./my-power/sidebar-icons/Cashflow_icon"
import Networth_icon from "./my-power/sidebar-icons/Networth_icon"
import Premium_icon from "./my-power/sidebar-icons/Premium_icon"
import Goals_icon from "./my-power/sidebar-icons/Goals_icon"
import { useEffect, useState } from "react"

const Filter_btn = ({ onClick,onHoverClick, path }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (window.innerWidth <768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, [window.innerWidth]);

    const ActivateFilterMenu=()=>{
        const MenuList = isMobile ? [
            {
                id: 1,
                icon: <Assumptions_icon stroke={'#ffff'} />,
                mytitle: "my",
                title: 'Assumptions'
            },
            {
                id: 2,
                icon: <Assumptions_icon stroke={'#ffff'} />,
                mytitle: "my",
                title: 'Rates'
            },
             {
                id: 3,
                icon: <Cashflow_icon stroke={'#ffff'} />,
                mytitle: "my",
                title: 'Money In'
            },
            {
                id: 4,
                icon: <Cashflow_icon stroke={'#ffff'} />,
                mytitle: "my",
                title: 'Money Out'
            }, 
            {
                id: 5,
                icon: <Networth_icon stroke={'#ffff'} />,
                mytitle: "my",
                title: 'What you OWN'
            },
            {
                id: 6,
                icon: <Networth_icon stroke={'#ffff'} />,
                mytitle: "my",
                title: 'What you OWE'
            }, {
                id: 7,
                icon: <Goals_icon stroke={'#ffff'} />,
                mytitle: "my",
                title: 'Goal'
            }, {
                id: 8,
                icon: <Premium_icon stroke={'#ffff'} />,
                mytitle: "my",
                title: 'Premium'
            }
        ] : [
            {
                id: 1,
                icon: <Assumptions_icon stroke={'#ffff'} />,
                mytitle: "my",
                title: 'Assumptions'
            }, {
                id: 2,
                icon: <Cashflow_icon stroke={'#ffff'} />,
                mytitle: "my",
                title: 'Cashflow'
            }, {
                id: 3,
                icon: <Networth_icon stroke={'#ffff'} />,
                mytitle: "my",
                title: 'Networth'
            }, {
                id: 4,
                icon: <Goals_icon stroke={'#ffff'} />,
                mytitle: "my",
                title: 'Goal'
            }, {
                id: 5,
                icon: <Premium_icon stroke={'#ffff'} />,
                mytitle: "my",
                title: 'Premium'
            }
        ];
        return(
            <div className="container">
                <ul className="opacity-100 ">
                    {MenuList.map((list) => (
                        <li onClick={() => onHoverClick(list)} key={list.id} className="flex gap-2 max-md:gap-5 py-4 max-md:py-2 px-2  cursor-pointer hover:bg-grey-4 hover:rounded-xl">
                            <span  className="lg:h-7  lg:w-7 max-md:h-3 max-md:w-3">{list.icon}</span>
                            <div className="text-base max-md:text-base">          
                                 <span>{list.mytitle}</span><span className="text-md font-semibold">{list.title}</span>
                            </div>
                        </li>
                      )
                    )}
                </ul>
            </div>
        )
    }
    return (
        <>
            <button data-tooltip-id="activate_my_power_filter" onClick={onClick} className=" border-dark-blue filter-btn " style={{ background: 'linear-gradient(180deg, #FF5151 0%, #FFD84C 100%)' }}>
                <div className="block md:hidden">
                    <span className="text-cyan-950 text-lg font-extrabold font-['Montserrat']">Activate </span>
                    <span className="text-cyan-950 text-2xl font-black font-['Montserrat'] leading-[28.80px]"> </span>
                    <span className="text-cyan-950 text-sm font-normal font-['Montserrat'] leading-[18.48px]">my</span>
                    <span className="text-cyan-950 text-lg font-extrabold font-['Montserrat']">Powers</span>
                </div>
                <img src={filter} className="w-8" alt="" srcSet="" />
            </button>
            {path == 'myPower' && (
                 <Tooltip
                 id={`activate_my_power_filter`}
                 backgroundColor={'#384151 '}
                 message={<ActivateFilterMenu/>}
                 noArrow={true}
                 border={"1px solid rgba(255, 81, 81, 1)"}
                 clickable
                //  customBorder={'linear-gradient(to top, rgba(255, 81, 81, 1), rgba(255, 216, 76, 1)) 1 / 2px'}
                 borderRadius="12px"
                />
            )}
           
        </>
    )
}

export default Filter_btn