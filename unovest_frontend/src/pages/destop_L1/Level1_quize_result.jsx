import { useEffect, useState } from 'react';
import Progress_meter from '../../components/Progress-meter/Progress_meter';
import ResultCards from '../../components/ResultCards'
import Result_chart from '../../components/Result_chart'
import Result_menubar from '../../components/Result_menubar'
import RoundedBtn from '../../components/RoundedBtn';
import Filter_btn from '../../components/Filter_btn';
import Menubar from '../../components/Menubar';
import { useNavigate } from 'react-router-dom';
import { insight_green, insight_white, money, money_mater_green, money_mater_white, rewarddiamond, triangle_arrow } from '../../assets/Icons'
import MobileNavigation from '../../components/MobileNavigation';
import Insides_cards from '../../components/Insides_cards';
import InsightesCharts from '../../components/resultinsightes/InsightesCharts';
import MyPowerButton from '../../components/MyPowerButton';
import { MdKeyboardArrowUp } from 'react-icons/md';
import Gray_btn from '../../components/quize-card/Gray_btn';
import { getData, getUserExpenseDetails, getWithoutAuth, saveDetails, userActivePower, userRevealStatus } from './server';
import { convertToIndianNumberingSystem } from '../../calculations/Index';
import { useDispatch, useSelector } from 'react-redux';
import { updateCradInputs } from '../../redux/slices/Card_Inputs';
import { all_financial_freedom_data } from '../../redux/slices/FinancialFreedomData';
import { formatNumberInCrores, formatNumberWithCommas, revealArray } from '../../Variable';
import MyPowerActivateInfo from '../../popup/MyPowerActivateInfo';
import MoneyPathIntroductor from '../../popup/MoneyPathIntroductor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { introductors, myPowerExpiry } from '../../redux/slices/Page_Data';
import { NumericFormatConversion, NumericSummaryConversion } from '../../numericalFormatConversion/NumericFormatConversion';
import MoneyMatterSection from '../account/components/myPower/MoneyMatterSection';
import ResultMoneyMatterCards from '../ResultCards/ResultMoneyMatterCards';
import ResultMoneyMatterCardsMobile from '../ResultCards/ResultMoneyMatterCardsMobile';

let getRandomNetWorth = () => {
    return Math.floor(Math.random() * 10) + 1; // Generates random net worth between 1 and 10 crores as a number
}

const peopleData = [];
let age = 30;
while (age <= 70) {
    const amount = getRandomNetWorth();
    peopleData.push({ age, amount });
    age += 5;
};

function generateRandomNumber() {
    return Math.floor(Math.random() * 10); // Generates a random number from 0 to 100
}
const randomNumber = generateRandomNumber();


const Level1_quize_result = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [percentatge, setPercentatge] = useState(78)
    const [cardsValue, setcardsValue] = useState([]);
    const [revealData, setRevealData] = useState(null);
    const userReferral = useSelector((state) => state?.Card_inputs?.refferal_user)
    let financialDetails = useSelector((state) => state?.financialFreedomData)
    const financialFreedom = financialDetails?.financialfreedom;
    const freedomData = financialDetails?.cashflowdetail?.cashFlowDetails?.filter(details => details.age)
    const [tabs, setTabs] = useState(1)
    const [showFinacialeModal, setShowFinacialeModal] = useState(false);
    const moneyPathIntroductor = useSelector(state => state?.Page_Data?.moneyPathIntroductor)
    const [moneyPathIndex, setMoneyPathIndex] = useState(moneyPathIntroductor?0:3); // this is bridge condition between showing moneypath and hiding moneypath.
    const [showIntroductor, setShowIntroductor] = useState(moneyPathIntroductor);
    const [showComponent, setShowComponent] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const userDetails = JSON.parse(localStorage.getItem('userdetails'));
   
    // const numerictype1 = userDetails?.user_data?.numerical_format || 'lakhs';
    // const numerictype = useSelector(state => state?.Card_inputs?.numerical_format) || 'lakhs';
    const numerictype = useSelector(state => state?.statistical_Data?.numerical_format)

    useEffect(() => {
          if (window.innerWidth < 768) {
            setIsMobile(true);
          } else {
            setIsMobile(false);
          }
      }, [window.innerWidth]); 

    const closedActivatedMessage = () => {
        setShowComponent(false);

    };

  

    const introductorData = [
        {
            title: `Welcome ${userDetails?.user_data?.full_name.split(' ')[0].charAt(0).toUpperCase()+userDetails?.user_data?.full_name.split(' ')[0].substr(1)}!`,
            description: 'Money Matters is your new RapidFIRE Home/Dashboard.',
            buttonText: 'NEXT',
            path:'#resultCard'
        },
        {
            title: '',
            description: 'Check your RapidFIRE results by flipping each Question Card.',
            buttonText: 'NEXT',
            path:'#myPowerbtn'
        },
        {
            title: '',
            description: 'Don’t forget to make adjustments to your financial blueprint by activating myPowers!',
            buttonText: 'FINISH',
            path:'#resultchart'
        }
    ];
    const handleNextClick = () => {
        if (moneyPathIndex < introductorData.length) {
            setMoneyPathIndex(prevIndex => prevIndex + 1);
        } else {
            setShowIntroductor(false);
            dispatch(introductors({dashboardIntroductor: false}))
        }
    };

    const Tab = ({ title, active, onClick, activeImage, inactiveImage }) => {
        const [showActiveImage, setShowActiveImage] = useState(active);
        useEffect(() => {
            setShowActiveImage(active);
        }, [active]);
        return (
            <div onClick={onClick} className={`flex-1 flex l gap-3 items-center justify-center rounded-tr-3xl rounded-tl-3xl ${active ? "" : 'bg-transparent'}`}
            style={active ? null : { boxShadow: '0px -15px 15px rgba(8, 10, 48, 0.80) inset' }}>
            {showActiveImage ? (
                <img src={activeImage} alt="Active Image" />
            ) : (
                <img src={inactiveImage} alt="Inactive Image" />
            )}
            <p className={`text-center ${active ? 'text-accent-bright-green' : 'text-light-blue-1'} text-base font-extrabold`}>{title}</p>
        </div>
        )
    }

    const getResults = () => {
        getWithoutAuth("result", (success) => {
            const data = success.data.message
            const dataInCrore = {
                ...data,
                financial_freedom: data.financial_freedom.map(item => ({
                    ...item, amount: item.amount / 10000000
                    // amountInCrore: item.amount / 10000000 // Divide by 1,00,00,000 to convert to crore
                }))
            };
            // console.log("dataInCrore", dataInCrore)
            setcardsValue(dataInCrore)
            // setcardsValue(success.data.message)
        }, (error) => {
            setcardsValue({})
            console.log(error)
        })
    }

    const fetchUserRefferal=()=>{
        getUserExpenseDetails("mynamecodecoin", success => {
            if(success.data.code === 200){
                dispatch(updateCradInputs({refferal_user:success.data.message, numerictype: numerictype}))
            }
        }, error => {
            console.log(error)
            // handleAlertClick('please Enter income','error')
        })
    }

    const getGoalCalculations=()=>{
        saveDetails("goalcalculation", {}, (success) => {
            dispatch(all_financial_freedom_data(success.data.message))
        }, (error) => {
            console.log(error)
            // dispatch(all_financial_freedom_data({}))
        })
    }

    //------------UseEffect Close modal on outside click---------------//
    useEffect(() => {
        if (revealData?.active_count === 4) {
            setShowFinacialeModal(true);
        }

        // Close modal on outside click
        const handleClickOutside = (event) => {
            if (showFinacialeModal && !event.target.closest('.modal')) {
                handleCloseModal();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [revealData?.active_count]);
 

    //------close modal---------// 
    const handleCloseModal = () => {
        setShowFinacialeModal(false);
    };

    //--------------MyPowerActivatedMessage on activated--------------//
    const MyPowerActivatedMessage = () => {
        return (
            <>
            {showComponent && (
            <div className='py-9 px-6  bg-emerald-100 m-auto rounded-4xl mt-3'>
                <p className='font-Montserrat font-medium text-base pb-3'>You have successfully unlocked <span className='font-Montserrat font-extrabold text-lg'>myPowers</span>  for 7 days! </p>
                <p className='font-Montserrat font-medium text-base'>Use these to make as many live changes as you want to your MoneyPath. Keep in mind that your changes cannot be undone.</p>
                <div className='flex gap-4 justify-between pt-6'>
                    <button className='flex items-center justify-center w-[8.688rem] h-[2.25] bg-gray-700 rounded-[1.625rem]'><img src={rewarddiamond} alt="" className="w-9 h-9" /><span className='font-Montserrat font-extrabold text-base text-amber-600'>{userDetails.coinmaster[8]?.coins}</span></button>
                    <button className=' w-[8.688rem] h-[2.25] bg-gray-700 rounded-[1.625rem] text-emerald-100 font-semibold text-base ' onClick={closedActivatedMessage}>NEXT</button>
                </div>
            </div>
            )}
        </>
        )
    } 

    //----------MyPowerActivateInfo activate click-------------//
    const ActivateMyPowerPopUp=()=>{
        let currentDate = new Date().toJSON();
        let currentTime = new Date();

        // for generating the current date and time format
        const getDateTime = currentDate.slice(0,10)+"T"+currentTime.toLocaleTimeString(undefined,{hour12:false});
 
        const activePowerPayload = {
            current_datetime : getDateTime
        }  
   
        userActivePower('user_active_power',activePowerPayload,success =>{
            console.log(success,'yes');
            if(success?.data?.code === 200){
                  navigate("insides/my-power")   
                  setTimeout(() => {
                    toast(<MyPowerActivatedMessage onClose={closedActivatedMessage}/>, { position: 'top-left', onCloseButtonClick: closedActivatedMessage});
                }, 1000);
                let userDetails = JSON.parse(localStorage.getItem('userdetails'));
                let updatedDetails = {
                    ...userDetails,
                    user_data: {
                        ...userDetails.user_data,
                        is_activated_my_power: true,
                        activate_my_power_expiry: success.data.message.activate_my_power_expiry
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
               
            }else{
              
                toast(success?.data?.status_message, {position:"top-left"});
            }
        },error=>{
            console.log(error)
        })
    }
    const handleAlertClick=(message,type)=>{
        if(type == 'success'){
            toast(<MyPowerActivatedMessage/>,{ position: 'top-left'})
        }else{
            toast(message)
        }
    }

    const showLessHandler=()=>{
        window.scrollTo(545,545);
        setTabs(1);
     }

     const viewInsightHandler=()=>{
        window.scrollTo(545,545);
        setTabs(2)  
    }

    useEffect(() => {
        getResults();
        fetchUserRefferal();
        getGoalCalculations();
    }, []);

    return (
        <div className='min-h-screen bg-result-gradiant md:pb-14 '
            style={{ background: 'radial-gradient(ellipse at 210.67% 129.74%, #9891AD 0%, #538096 22.18%, #3C566E 2.79%, #131529 61.23%)' }}
        > 
        <div id='resultchart' className={`${(moneyPathIndex == 1||moneyPathIndex == 2 || moneyPathIndex == 0) && 'opacity-35'}`}>
            <Menubar redirected={"result"} refferalDetails={userReferral} />
        </div>
            <div className="level1-quize-container">
                <div className={`mt-10 w-full  flex justify-center ${(moneyPathIndex == 2 || moneyPathIndex == 0) && 'opacity-45'}`}>
                    <Result_chart
                        // data={peopleData}
                        moneyPathIndex={moneyPathIndex}
                        data={freedomData}
                        x_axis_dataKey='age'
                        y_axis_dataKey='closingAssets'
                        Freedom_age={financialFreedom?.financialFreedomAge}
                        className='!max-2xl:ms-0 '
                    />
                </div>
                
                    <ResultMoneyMatterCards 
                        moneyPathIndex={moneyPathIndex} 
                        setRevealData={setRevealData} 
                        ActivateMyPowerPopUp={ActivateMyPowerPopUp} 
                        isMobile={isMobile}
                        showFinacialeModal={showFinacialeModal}
                        setShowFinacialeModal={setShowFinacialeModal}
                    />
    
                
                <div id='resultCard' className={`${tabs == 1 ? 'bg-start-quiz-gradient' : 'bg-mob-primary-gradient'} rounded-tr-3xl rounded-tl-3xl lg:bg-tranperent-gradiant w-full max-w-full`}>
                    {/* mobile     */}
                    <div  className={`flex md:hidden text-white h-12  relative mb-[30px] ${(moneyPathIndex == 2 || moneyPathIndex == 0) && 'opacity-45'}`} >
                        <Tab title='Money Matters' active={tabs === 1} onClick={() => { setTabs(1) }}  activeImage={money_mater_green} inactiveImage={money_mater_white} />
                        <span className=" absolute top-0 left-1/2 -translate-x-1/2 w-10 h-5 ">
                            <img src={triangle_arrow} alt="" srcSet="" />
                        </span>
                        <Tab title='Insights' active={tabs === 2} onClick={() => { setTabs(2) }} activeImage={insight_green} inactiveImage={insight_white}/>
                    </div>

                    {
                        tabs == 1 &&
                        (<ResultMoneyMatterCardsMobile
                            isMobile={isMobile}
                            moneyPathIndex={moneyPathIndex}
                            setRevealData={setRevealData}
                            setTabs={setTabs}
                            ActivateMyPowerPopUp={ActivateMyPowerPopUp} 
                            viewInsightHandler={viewInsightHandler}
                        />)
                    }

                    {
                        tabs === 2 &&
                       ( <div className="lg:hidden px-9  w-full" >
                            <Insides_cards data={financialDetails} />
                            <MyPowerButton handleAlertClick={handleAlertClick}  className={'mt-7'}/>
                            <InsightesCharts styles='mt-9' />
                            <div className='flex flex-wrap md:flex-nowrap md:flex-col lg:flex-row items-center justify-center gap-4 mt-5 mb-10'>
                                <button className=" level1-btn flex items-center  justify-around   shadow   order-2 md:order-1">
                                    Show Less <MdKeyboardArrowUp />
                                </button>
                                <MyPowerButton className="w-full"  handleAlertClick={handleAlertClick}/>
 
                                <button className=" level1-btn md:rounded-[20px] order-3 ">Upgrade to Level 2</button>
                            </div>
                        </div>)}
                </div>
                  
               
            </div>
            {showIntroductor && moneyPathIndex < introductorData.length && (
                <MoneyPathIntroductor
                    title={introductorData[moneyPathIndex].title}
                    description={introductorData[moneyPathIndex].description}
                    buttonText={introductorData[moneyPathIndex].buttonText}
                    onButtonClick={handleNextClick}
                    moneyPathIndex={moneyPathIndex}
                    path={introductorData[moneyPathIndex].path}
                />
            )}
              <ToastContainer hideProgressBar toastStyle={{width:'fit-content',background:"#BCFBE4", color:"#0F3A4D", fontFamily:"Montserrat"}}/>
        </div>
    )
}

export default Level1_quize_result