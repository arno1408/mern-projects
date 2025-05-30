import React, { useState } from 'react'
import Menubar from '../Menubar'
import Result_chart from '../Result_chart'
import { useDispatch, useSelector } from 'react-redux'
import { black_delete, copy_gray_icon, lock } from '../../assets/Icons'
import { FaPlus } from "react-icons/fa6";
import PersonalAssumption from '../../pages/dashboardL1Cards/PersonalAssumption'
import Rates from '../../pages/dashboardL1Cards/Rates'
import MoneyIn from '../../pages/dashboardL1Cards/MoneyIn'
import MoneyOut from '../../pages/dashboardL1Cards/MoneyOut'
import WhatYouOwn from '../../pages/dashboardL1Cards/WhatYouOwn'
import WhatYouOwe from '../../pages/dashboardL1Cards/WhatYouOwe'
import MoneyToDoForYou from '../../pages/dashboardL1Cards/MoneyToDoForYou'
import My_power_sidebar from './My_power_sidebar'

const Summit = () => {
    const dispatch = useDispatch();
    const isCaseSelected = useSelector(state => state.My_powersidebar.isCaseSelected);
    console.log(isCaseSelected,'isCaseSelected')
    const userReferral = useSelector((state) => state?.Card_inputs?.refferal_user)
    const currentSection = useSelector(state => state?.My_powersidebar.currentSection);
    const whatif_bottom_list = useSelector(state => state?.My_powersidebar.whatif_bottom_list);
    const [section, setSection] = useState(1);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [cases, setCases] = useState(
        [
            {
                id: 1,
                case: 'A',
                Enough_Money_to_meet_all_Goals: 'No',
                Financial_Freedom_achieved_or_Money_runs_out_age: 73,
                FIRE_required_today: '₹ 4,79,00,000',
                FIRE_Status_Completed: '78%',
                Current_Networth: '₹ 4,79,00,000',
                Work_Till_Age: '₹ 4,79,00,000',
                Networth_at_Retirement: '₹ 4,79,00,000',
                Todays_Value: 90,
                Likely_Inheritance: '₹ 4,79,00,000',
                Networth_at_age_90: null,
                Life_Insurance_Required: '₹ 4,79,00,000',
                To_fulfill_all_goals_expenses: null
            },
            {
                id: 2,
                case: 'B',
                Enough_Money_to_meet_all_Goals: 'Yes',
                Financial_Freedom_achieved_or_Money_runs_out_age: 73,
                FIRE_required_today: '₹ 4,79,00,000',
                FIRE_Status_Completed: '78%',
                Current_Networth: '₹ 4,79,00,000',
                Work_Till_Age: '₹ 4,79,00,000',
                Networth_at_Retirement: '₹ 4,79,00,000',
                Todays_Value: 90,
                Likely_Inheritance: '₹ 4,79,00,000',
                Networth_at_age_90: null,
                Life_Insurance_Required: '₹ 4,79,00,000',
                To_fulfill_all_goals_expenses: null
            },
            {
                id: 3, case: 'C',
                Enough_Money_to_meet_all_Goals: 'No',
                Financial_Freedom_achieved_or_Money_runs_out_age: 73,
                FIRE_required_today: '₹ 4,79,00,000',
                FIRE_Status_Completed: '78%',
                Current_Networth: '₹ 4,79,00,000',
                Work_Till_Age: '₹ 4,79,00,000',
                Networth_at_Retirement: '₹ 4,79,00,000',
                Todays_Value: 90,
                Likely_Inheritance: '₹ 4,79,00,000',
                Networth_at_age_90: null,
                Life_Insurance_Required: '₹ 4,79,00,000',
                To_fulfill_all_goals_expenses: null
            },
        ]
    )
    const whatifQuestions = [
        { id: 1, question: 'Enough Money for all goals?', detail: 'Money runs out @age' },
        { id: 2, question: 'FIRE Amount Required today', detail: 'FIRE status Completion' },
        { id: 3, question: 'Current Networth', detail: 'Work Till Age' },
        { id: 4, question: 'Networth at Retirement', detail: 'Today’s Value' },
        { id: 5, question: 'Likely Inheritance', detail: 'Networth @ age 90' },
        { id: 6, question: 'Life Insurance Required', detail: 'To fulfill all goals & expenses' },
        { id: 7, question: 'Goals Fulfilled', detail: '' },
    ]
    const filteredCases = isButtonClicked ? cases.filter(item => item.id !== 3) : cases;
    // const deleteCase = (id) => {
    //     setCases(prevCases => prevCases.filter(item => item.id !== id));
    // };
    const Whatif_Cases = ({ onclick, clickdelete, background, icon }) => {
        return (
            <div className={` border-${background} Whatif-cases-container `} style={{ backgroundColor: 'rgba(204, 204, 204, 0.1)' }}>
                <span
                    className={`Whatif-delete-icon bg-${background}`}
                    style={{ filter: "drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.5))", }}
                    onClick={clickdelete}>
                    <img src={black_delete}></img>
                </span>
                <button className={`bg-${background} text-dark-blue Whatif-Edit-btn`} onClick={onclick}>Edit</button>
                <h2 className={`Whatif-case-heading text-${background} `}> Whatif </h2>
                <span className={`Whatif-case-heading text-${background} `}>{icon}</span>
            </div>
        )
    }

    let Whatif = () => {
        return (
            <div className={`Whatif-Container-main`}
                style={{ boxShadow: "-4px -4px 10px 0px rgba(8, 10, 48, 0.8)" }} >
                <div className='Whatif-Container'>
                    <div className='flex gap-4 items-start'>
                        <div>
                            <div className='Whatif-Heading-container' style={{ backgroundColor: 'rgba(204, 204, 204, 0.1)' }}>
                                <h2 className='Whatif-Heading'><span className='font-normal  text-xl italic '>my</span>WhatIfs</h2>
                            </div>
                            <div>
                                {whatifQuestions.map((item) => {
                                    return (
                                        <div key={item.id} className='Whatif-questions-container' style={{ backgroundColor: 'rgba(204, 204, 204, 0.1)' }}>
                                            <h2 className='Whatif-questions-Heading'>{item.question}</h2>
                                            <p className='Whatif-questions-details'>{item.detail}</p>
                                        </div>
                                    )
                                })
                                }
                            </div>

                        </div>
                        <div className='xl:w-[45.75rem] lg:w-[40rem] md:w-[35rem]  overflow-x-auto   scrollbar-hide'>
                            <div className='flex gap-2'>
                                {cases.map(item => (
                                    <>
                                        {item.id === 3 && section === 1 && (
                                            <Whatif_Cases
                                                key={item.id}
                                                background={'desk-purple'}
                                                icon={'C'}
                                                clickdelete={() => deleteCase(item.id)}
                                                onclick={() => {
                                                    // setSection(2);
                                                    setIsButtonClicked(!isButtonClicked);
                                                }}
                                            />
                                        )}
                                        {item.id !== 3 && (
                                            <Whatif_Cases
                                                key={item.id}
                                                background={item.id === 1 ? 'accent-green' : item.id === 2 ? 'aqua' : 'desk-purple'}
                                                icon={item.case}
                                                clickdelete={() => deleteCase(item.id)}
                                            />
                                        )}
                                    </>
                                ))}

                                {/* {section === 2 && (
                                    <div className='border-[1px] border-desk-purple rounded-xl relative w-[230px] h-[84px] bg-blue-grey flex items-center p-4 gap-2' style={{ backgroundColor: 'rgba(204, 204, 204, 0.1)' }}>
                                        <button className='bg-desk-purple py-2 px-4 rounded-[26px] font-medium text-base text-dark-blue font-Montserrat'>Add</button>
                                        <h2 className='font-extrabold text-2xl text-desk-purple font-Montserrat'> Whatif </h2>
                                        <span className='font-extrabold text-2xl text-desk-purple font-Montserrat'> C </span>
                                    </div>
                                )} */}
                            </div>
                            <div className='xl:w-[700px] max-xl:w-[38rem]'>
                                <ComingSoonSection />
                            </div>
                        </div>
                    </div>

                    {/* <div className='flex gap-4'>
                        
                        <div className='flex gap-4'>
                            {filteredCases.map((item) => {
                                return (
                                    <div key={item.id} className=''>
                                        <div className={`flex flex-col justify-center items-center w-[230px] h-[84px] py-5 px-8  text-center rounded-xl mb-2 bg-accent-green ${item.id === 1 ? 'bg-accent-green' : item.id === 2 ? 'bg-aqua' : 'bg-desk-purple'}`} >
                                            <h2 className='font-bold text-2xl text-blue-grey font-Work_Sans'>{item.Enough_Money_to_meet_all_Goals}</h2>
                                            <p className='font-light text-blue-grey text-[15px] font-Work_Sans'>{item.Financial_Freedom_achieved_or_Money_runs_out_age}</p>
                                        </div>
                                        <div className={`flex flex-col justify-center items-center w-[230px] h-[84px] py-5 px-8  text-center rounded-xl mb-2 bg-accent-green ${item.id === 1 ? 'bg-accent-green' : item.id === 2 ? 'bg-aqua' : 'bg-desk-purple'}`}  >
                                            <h2 className='font-medium text-xl text-blue-grey font-Work_Sans'>{item.FIRE_required_today}</h2>
                                            <p className='font-light text-blue-grey text-[15px] font-Work_Sans'>{item.FIRE_Status_Completed}</p>
                                        </div>
                                        <div className={`flex flex-col justify-center items-center w-[230px] h-[84px] py-5 px-8  text-center rounded-xl mb-2 bg-accent-green ${item.id === 1 ? 'bg-accent-green' : item.id === 2 ? 'bg-aqua' : 'bg-desk-purple'}`}  >
                                            <h2 className='font-medium text-xl text-blue-grey font-Work_Sans'>{item.Current_Networth}</h2>
                                            <p className='font-light text-blue-grey text-[15px] font-Work_Sans'>{item.Work_Till_Age}</p>
                                        </div>
                                        <div className={`flex flex-col justify-center items-center w-[230px] h-[84px] py-5 px-8  text-center rounded-xl mb-2 bg-accent-green ${item.id === 1 ? 'bg-accent-green' : item.id === 2 ? 'bg-aqua' : 'bg-desk-purple'}`}  >
                                            <h2 className='font-medium text-xl text-blue-grey font-Work_Sans'>{item.Networth_at_Retirement}</h2>
                                            <p className='font-light text-blue-grey text-[15px] font-Work_Sans'>{item.Todays_Value}</p>
                                        </div>
                                        <div className={`flex flex-col justify-center items-center w-[230px] h-[84px] py-5 px-8  text-center rounded-xl mb-2 bg-accent-green ${item.id === 1 ? 'bg-accent-green' : item.id === 2 ? 'bg-aqua' : 'bg-desk-purple'}`}  >
                                            <h2 className='font-medium text-xl text-blue-grey font-Work_Sans'>{item.Likely_Inheritance}</h2>
                                            <p className='font-light text-blue-grey text-[15px] font-Work_Sans'>{item.Networth_at_age_90}</p>
                                        </div>
                                        <div className={`flex flex-col justify-center items-center w-[230px] h-[84px] py-5 px-8  text-center rounded-xl mb-2 bg-accent-green ${item.id === 1 ? 'bg-accent-green' : item.id === 2 ? 'bg-aqua' : 'bg-desk-purple'}`}  >
                                            <h2 className='font-medium text-xl text-blue-grey font-Work_Sans'>{item.Life_Insurance_Required}</h2>
                                            <p className='font-light text-blue-grey text-[15px] font-Work_Sans'>{item.To_fulfill_all_goals_expenses}</p>
                                        </div>

                                    </div>
                                )
                            })
                            }
                          
                        </div>
                        {section === 2 && (
                            <div className='w-[240px] h-[580px] py-5 px-8 text-center rounded-[15px] mb-2 bg-desk-purple-1  flex justify-center items-center flex-col gap-4 '>
                                <button className='w-[210px] p-3 text-center  rounded-xl  bg-accent-green flex gap-4 items-center' style={{ boxShadow: "0px 0px 10px 0px rgba(103, 234, 179, 0.6)" }}>
                                    <h2 className='font-extrabold text-base text-dark-blue font-Montserrat'>Copy & Edit WhatIF A</h2>
                                    <img src={copy_gray_icon} alt="Copy" />
                                </button>
                                <button className='w-[210px] p-3 text-center  rounded-xl  bg-aqua flex gap-4 items-center' style={{ boxShadow: "0px 0px 10px 0px rgba(103, 234, 179, 0.6)" }}>
                                    <h2 className='font-extrabold text-base text-dark-blue font-Montserrat'>Copy & Edit WhatIF B</h2>
                                    <img src={copy_gray_icon} alt="Copy" />
                                </button>
                                <button className='w-[210px] p-3 text-center  rounded-xl  bg-desk-purple flex gap-4 items-center' style={{ boxShadow: "0px 0px 10px 0px rgba(103, 234, 179, 0.6)" }}>
                                    <h2 className='font-extrabold text-base text-dark-blue font-Montserrat'>Add a new WhatIF</h2>
                                    <FaPlus className='text-dark-blue' />
                                </button>
                            </div>
                        )}
                    </div> */}
                </div>
            </div>
        )
    }

    let CaseA = () => {
        return (
            // whatif_bottom_list?.map(menu => {
            //     if (menu.active) {
            //         if (menu.id === 1) {
            //             return (
            //                 <div className='py-10 bg-accent-green-opacity'>
            //                    <div className='w-[1288px] flex flex-col gap-[60px] mx-auto '>
            //                     <div className='flex gap-8 '>
            //                         <PersonalAssumption />
            //                         <Rates />
            //                     </div>
            //                     {/* <div className='flex gap-8'>
            //                         <MoneyIn />
            //                         <MoneyOut />
            //                     </div> */}
            //                     {/* <div className='flex gap-8'>
            //                         <WhatYouOwn />
            //                         <WhatYouOwe />
            //                     </div> */}
            //                     {/* <MoneyToDoForYou /> */}
            //                 </div>
            //                 </div>
            //             );
            //         }
            //         if (menu.id === 2){
            //             return null;
            //         }
            //         if (menu.id === 3){
            //             return null;
            //         }
            //     }
            //     return null;
            // })
            <div className='w-full max-w-[53vw]  mx-auto my-10'>
                <ComingSoonSection/>
            </div>
        );
    }

    let ComingSoonSection = () => {
        return (
            <div className="w-full max-md:max-w-[90%] max-md:mb-16 h-[606px]  mx-auto flex gap-16 flex-col mt-0 ring-2 ring-zinc-600 rounded-3xl">
                <div className="flex flex-col text-xl justify-center items-center h-[900px] rounded-3xl shadow-highlight-card bg-coming-soon-bg">
                    <img src={lock} alt="lock_img" width={30} height={30} />
                    <h2 className="text-slate-200 shadow-orange max-md:text-sm">
                        Coming Soon..
                    </h2>
                </div>
            </div>
        )
    }

    return (
        <>
            {/* <div className=' relative flex flex-col bg-dark-blue-gray'>
                <div style={{ boxShadow: "2px 0px 20px 0px rgba(8, 10, 48, 0.8)" }}><Menubar redirected={"summit"} refferalDetails={userReferral} />
                </div>
                <div className="flex flex-1">
                    <div className="absolute z-10 hidden md:block " style={{ boxShadow: "2px 0px 20px 0px rgba(8, 10, 48, 0.8)" }}>
                         <My_power_sidebar />
                    </div>
                    <div className="w-full flex flex-col flex-1 h-[calc(100vh-65px)] overflow-y-scroll hide-scrollbar">
                        <div className="my-[46px] w-full  max-w-[1288px] mx-auto h-[443px] ">
                            <Result_chart
                            />
                        </div>

                        {currentSection === 1 && <CaseA />}
                        {currentSection === 5 && <Whatif />}
                    </div>

                </div>

            </div> */}

            <div>
            {isCaseSelected ? <CaseA /> : <Whatif />}
                {/* {currentSection === 5 && <Whatif />}
                {currentSection === 5 && <CaseA />} */}
            </div>
        </>


    )
}

export default Summit