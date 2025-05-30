import React, { useEffect, useState } from 'react'
import Result_chart from '../../components/Result_chart';
import InsightesCharts from '../../components/resultinsightes/InsightesCharts';
import CircularProgress from '../../components/circularProgressBar/CircularProgress';
import EyeIconButton from '../../components/EyeIconButton';
import { FiEye } from 'react-icons/fi'
import { BsEyeSlash } from 'react-icons/bs'
import LineGraph from '../../components/linegraph/ResultLineGraph';
import ResultLineGraph from '../../components/linegraph/ResultLineGraph';
import FinancialFreedomCard from '../../components/FinancialFreedomCard';
import MyPowerButton from '../../components/MyPowerButton';
import { filter, lock, rewarddiamond } from '../../assets/Icons';
import { MdKeyboardArrowUp } from 'react-icons/md'
import Menubar from '../../components/Menubar';
import Insides_cards from '../../components/Insides_cards';
import InsideLineChart from '../../components/linegraph/InsideLineChart';
import { getData, getUserExpenseDetails, saveDetails } from './server';
import { useDispatch, useSelector } from 'react-redux';
import { all_financial_freedom_data } from '../../redux/slices/FinancialFreedomData';
import { updateCradInputs } from '../../redux/slices/Card_Inputs';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const L1_all_insides = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const financialfreedomData = useSelector((state) => state.financialFreedomData);
    const userReferral = useSelector((state) => state?.Card_inputs?.refferal_user)
    let financialDetails = useSelector((state) => state?.financialFreedomData)
    const financialCashflowGraph = financialDetails?.cashflowdetail?.cashFlowDetails.filter((details) =>{
        return details.age
    });
    const financialFreedomAge = financialDetails?.financialfreedom?.financialFreedomAge;
    const financialFreedom = financialDetails;
    const userDetails = JSON.parse(localStorage.getItem('userdetails'));
    const [showComponent, setShowComponent] = useState(true);

    const closedActivatedMessage = () => {
        console.log("hello");
        setShowComponent(false);
    };
    let getRandomNetWorth = () => {
        return Math.floor(Math.random() * 10) + 1;
        // Generates random net worth between 1 and 10 crores as a number
    }

    const peopleData = [];
    let age = 35;
    while (age <= 80) {
        const netWorth = getRandomNetWorth();
        peopleData.push({ age, netWorth });
        age += 5;
    };

    let dummydata = [
        {
            "age": 30,
            "goaloutflow": 40,
            "income": 24,
            "outflows": 24,
            "networth": 26
        },
        {
            "age": 35,
            "goaloutflow": 30,
            "income": 13,
            "outflows": 22,
            "networth": 27
        },
        {
            "age": 40,
            "goaloutflow": 20,
            "income": 98,
            "outflows": 22,
            "networth": 28
        },
        {
            "age": 45,
            "goaloutflow": 27,
            "income": 39,
            "outflows": 20,
            "networth": 29
        },
        {
            "age": 50,
            "goaloutflow": 27,
            "income": 39,
            "outflows": 20,
            "networth": 29
        },
        {
            "age": 55,
            "goaloutflow": 18,
            "income": 48,
            "outflows": 21,
            "networth": 34
        },
        {
            "age": 60,
            "goaloutflow": 23,
            "income": 38,
            "outflows": 25,
            "networth": 24
        },
        {
            "age": 65,
            "goaloutflow": 34,
            "income": 43,
            "outflows": 21,
            "networth": 21
        },
        {
            "age": 70,
            "goaloutflow": 34,
            "income": 43,
            "outflows": 21,
            "networth": 21
        }
    ]

    useEffect(() => {
        fetchUserRefferal();
        getGoalCalculations();
    }, []);

    const getGoalCalculations=()=>{
        saveDetails("goalcalculation", {}, (success) => {
            dispatch(all_financial_freedom_data(success.data.message))
        }, (error) => {
            console.log(error)
            // dispatch(all_financial_freedom_data({}))
        })
    }

    const fetchUserRefferal=()=>{
        getUserExpenseDetails("mynamecodecoin", success => {
            if(success.data.code === 200){
                dispatch(updateCradInputs({refferal_user:success.data.message}))
            }
        }, error => {
            console.log(error)
            // handleAlertClick('please Enter income','error')
        })
     
    }

    const MyPowerActivatedMessage = () => {
        return (
            <>
            {showComponent && (
            <div className='py-9 px-6  max-md:px-6 max-md:py-9 bg-emerald-100 m-auto max-md:w-64 rounded-xl mt-3'>
                <p className='font-Montserrat font-medium text-base max-md:text-sm pb-3'>You have successfully unlocked <span className='font-Montserrat font-extrabold text-lg max-md:text-base'>myPowers</span>  for 7 days! </p>
                <p className='font-Montserrat font-medium text-base max-md:text-sm'>Use these to make as many live changes as you want to your MoneyPath. Keep in mind that your changes cannot be undone.</p>
                <div className='flex gap-3 lg:gap-4  justify-between pt-6 max-md:pt-4'>
                    <button className='flex items-center justify-center w-[8.688rem] max-md:w-[6.66rem]  h-[2.25] bg-gray-700 rounded-[1.625rem]'><img src={rewarddiamond} alt="" className="w-9 h-9" /><span className='font-Montserrat font-extrabold text-base max-md:text-sm text-amber-600'>{userDetails.coinmaster[8]?.coins}</span></button>
                    <button className=' w-[8.688rem] max-md:w-[6.66rem]  h-[2.25] bg-gray-700 rounded-[1.625rem] text-emerald-100 font-semibold text-base max-md:text-sm' onClick={closedActivatedMessage}>NEXT</button>
                </div>
            </div>
            )}
            </>
        )
    } 

    const handleAlertClick=(message,type)=>{
        if(type == 'success'){
            toast(<MyPowerActivatedMessage  onClose={closedActivatedMessage}/>,{ position: 'top-left', onCloseButtonClick: closedActivatedMessage})
        }else{
            toast(message)
        }
    }

    const showLessHandler=()=>{
       navigate('/level-1/quiz/result')
    }

    return (
        <div className='pb-5 md:pb-32 ' style={{ background: 'radial-gradient(ellipse at 210.67% 129.74%, #9891AD 0%, #538096 22.18%, #3C566E 2.79%, #131529 61.23%)' }}>
            <Menubar redirected={"show_insight"} refferalDetails={userReferral}/>
            <div className=" 2xl:max-w-[1288px] w-[calc(100vw-70px)] mx-auto max-lg:m-auto max-xl:mx-5">
                <div className="flex gap-8 lg:gap-16 flex-col">
                    <div className=" mt-14">
                        <Result_chart moneyPathIndex={3} data={financialCashflowGraph} x_axis_dataKey='age' y_axis_dataKey='closingAssets' Freedom_age={financialFreedomAge} className='mx-auto '
                        />
                    </div>

                    <Insides_cards data={financialFreedom} />
                    <div className='flex justify-center'> <MyPowerButton handleAlertClick={handleAlertClick} /> </div>
                    <InsightesCharts data={financialFreedom} />
                    <InsideLineChart data={financialfreedomData} />

                    <div className='flex flex-wrap justify-center md:flex-nowrap md:flex-col lg:flex-row items-center  gap-5 md:gap-7'>
                        <button onClick={showLessHandler} className=" flex items-center justify-around level1-btn shadow  lg:order-1 order-2">
                            Show Less <MdKeyboardArrowUp />
                        </button>
                        <MyPowerButton className={'lg:order-2 order-1'}  handleAlertClick={handleAlertClick} />
                        <button className="level1-btn  lg:order-3 order-3">Upgrade to Level 2</button>
                    </div>
                </div>
                <ToastContainer hideProgressBar toastStyle={{width:'fit-content',borderRadius:'12px' ,background:"#BCFBE4", color:"#0F3A4D", fontFamily:"Montserrat"}}/>
            </div>
        </div>
    )
}

export default L1_all_insides
