import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import CustomizedDotFlag from './CustomizedDotFlag'
import { orange_flag, rewarddiamond, financial_star, financial_lock } from '../assets/Icons'
import { useSelector } from 'react-redux'
import Tooltiper from './tooltip/Tooltip';
import { BrowserView, MobileView, isBrowser} from 'react-device-detect';
import { changeNumbertoComma } from '../Variable';
import { useEffect, useState } from 'react';


let tick_style = { fontSize: 20, fontWeight: 500, fill: "#B5B5B5" }

// new code added
const Result_chart = ({ className='',data, y_axis_dataKey, x_axis_dataKey, Freedom_age, moneyPathIndex }) => {
  let result_chart_data = useSelector((state) => state?.level_1_data?.result_chart_data)
  let goalCalculation = useSelector((state) => state?.financialFreedomData)
  let goalDetails = useSelector(state => state?.financialFreedomData?.calculated_goals)
  const refferalDetails = useSelector((state) => state?.Card_inputs?.refferal_user)
  const numerictype = useSelector(state => state?.statistical_Data?.numerical_format)
  // const userdetails = JSON.parse(localStorage.getItem('userdetails'));
  // const numerical_format = userdetails?.user_data?.numerical_format || 'lakhs'
  const [isMobile, setIsMobile] = useState(false);
    
  useEffect(() => {
        if (window.innerWidth < 768) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
    }, [window.innerWidth]); 

  //fetched data based on financial Data
  const financialResult = goalCalculation?.cashflowdetail?.cashFlowDetails.map((data) => {
    return { ...data, clossingAssets: Math.round(data.closingAssets) }
  })

  let result;
  if (isMobile) {
    result = result_chart_data?.cashflowFetched?.cashFlowDetails?.map((list) => {
      return { ...list, closingAssets: Math.round(list.closingAssets) }
    });
    if (result === undefined || result === null) {
      result = data?.map((list) => {
        return { ...list, closingAssets: Math.round(list.closingAssets) }
      });
    }

  } else {
    if (data) {
      result = data?.map((list) => {
        return { ...list, closingAssets: Math.round(list.closingAssets) }
      });
    } else {
      result = result_chart_data?.cashflowFetched?.cashFlowDetails.map((data) => {
        return { ...data, closingAssets: Math.round(data.closingAssets) }
      })
    }
  }

  // for adding interval to x-axis of recharts
  const xAxisinterval = result?.length > 10 ? Math.max(1, Math.round(result?.length / 16)) : 0;
  const yAxisinterval = changeNumbertoComma(result / 100);

  const FreedomLock = () => {
    return (
      <div className='p-5 bg-emerald-100 text-slate-800 m-auto rounded-xl  w-[26rem] max-md:w-[20rem]'>
        <h3 className='text-xs font-Montserrat font-extrabold'>Use FIRECoins or pay to unlock longer access</h3>
        <p className='text-xs font-Montserrat font-normal pb-4'>With your current plan, you will not be able to unlock Financial Freedom. </p>
        <p className='text-xs font-Montserrat font-normal pb-4'>Upgrade to Summit to change your MoneyPath, test different scenarios & achieve the big goal of early retirement!</p>
        <div className='flex gap-4 max-md:gap-6 justify-between pb-4'>
          <div onClick={() => alert('hi')}>

            <button className='flex items-center justify-center w-44 max-md:w-32 bg-blue-100 rounded-[1.625rem] '><img src={rewarddiamond} alt="" className="w-9 h-9" /><span className='font-Montserrat font-extrabold text-base text-sky-950'>{refferalDetails?.coins || 0}</span></button>

            <p className='font-normal font-Montserrat text-xs text-center italic pt-1 text-gray-700'>Current Balance</p>
          </div>
          <div onClick={() => alert('hi')}>
            <button className='flex items-center justify-center w-44 max-md:w-32 bg-gray-700 rounded-[1.625rem]'><img src={rewarddiamond} alt="" className="w-9 h-9" /><span className='font-Montserrat font-extrabold text-base text-amber-600'>-500</span></button>
            <p className='font-normal font-Montserrat text-xs text-center italic pt-1 text-gray-700'>Per Session of access to the Summit</p>
          </div>
        </div>
        <button onClick={() => navigate('')} className='bg-slate-900 rounded-[1.875rem]  font-Montserrat font-extrabold text-xl max-md:text-sm px-9 max-md:px-7  py-4 max-md:py-3 text-emerald-100 flex gap-2 items-center'>Explore Summit Benefits <img src={financial_star} /></button>
      </div>
    )
  }


  let FreedomInfo = () => {
    return (
      <>
        <div className="absolute top-[18px] left-7 ">
          <p className="text-indigo-300 font-extrabold font-['Montserrat']  text-xl leading-[-0.4px]"><span className="text-indigo-300 text-xl font-normal font-['Montserrat'] italic">my</span>MoneyPath</p>
          {/* <p className="text-zinc-400 text-base font-medium font-['Montserrat'] leading-[21.12px] flex gap-1 items-center">Financial Freedom @ Age <img data-tooltip-id='financial_lock' src={financial_lock} alt="financial_lock" /></p> */}
          <p className="text-zinc-400 text-base font-medium font-['Montserrat'] leading-[21.12px] flex gap-1 items-center">Financial Freedom @ Age <img src={financial_lock} alt="financial_lock" /></p>
          <div className=" text-white text-6xl font-extrabold font-Work_Sans mt-4">{result_chart_data?.financialFreedomFetched?.financial_freedom_age || Freedom_age}</div>
        </div>
        <Tooltiper
          id={'financial_lock'}
          backgroundColor={'transparent '}
          message={<FreedomLock />}
          clickable={true}
          positionStrategy='absolute'
          zIndex={"990"}
          opacity={1}
        />
      </>

    )
  }

  const CustomToolTip = ({ active, payload, label }) => {
    const Freedom_age_select = result_chart_data?.financialFreedomFetched?.financial_freedom_age || Freedom_age
    let goalSelected = goalDetails?.filter(list => list.start_year === payload[0]?.payload.year)
    return (
      <div className={`${payload[0]?.payload?.isGoalAvaiableInThisYear === true && payload[0]?.payload?.isGoalAchived === true ? 'bg-accent-green' : payload[0]?.payload?.age == Freedom_age_select ? 'bg-white ring-4 ring-accent-green' : payload[0]?.payload?.isGoalAchived === false ? 'bg-orange-1' : ''} rounded-xl p-4 text-md `}>
        <div className={`text-md text-grey-5 font-bold font-['Montserrat'] ${payload[0]?.payload?.age == Freedom_age_select && 'text-lg'}`}>{payload[0]?.payload?.isGoalAvaiableInThisYear === true && payload[0]?.payload?.isGoalAchived === true ? 'Goal Achieved' : payload[0]?.payload?.age == Freedom_age_select ? 'FINANCIAL FREEEDOM!' : payload[0]?.payload?.isGoalAchived === false ? 'Goal Not Achieved' : ''} </div>
        <div className={`text-md text-grey-5 ['Montserrat'] ${payload[0]?.payload?.age == Freedom_age_select && 'text-lg'}`}>{goalSelected && goalSelected[0]?.goalName}</div>
        <div className="text-sm text-grey-5 ['Montserrat']">{(payload[0]?.payload?.isGoalAvaiableInThisYear === true || payload[0]?.payload?.age == Freedom_age_select )  && `@ ${payload.length > 0 && payload[0]?.payload?.age} years of age`}</div>
      </div>
    )
  }

  const YAxisResponsiveContainer = () => {
    return (
      <ResponsiveContainer width={'267%'} height={360}>
        <AreaChart width={"100%"} height={'100%'} data={result}
        // margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <YAxis
            tickLine={false}
            interval={'preserveStartEnd'}
            axisLine={false}
            tick={tick_style}
            dataKey={y_axis_dataKey}
            style={isMobile ? { fontSize: '12px' } : { fontSize: '20px' }}
            tickFormatter={(num) => `${numerictype == 'lakhs' ? changeNumbertoComma(num / 10000000) : changeNumbertoComma(num / 100000000)}`}
          // width={20}
          // tickLine={{ stroke: "transparent" }}
          // tickFormatter={(num) => (num / 1000)}
          // domain={[500, 2500]}
          />
          <Area type="monotone" stroke="transparent"
            // dataKey={y_axis_dataKey}
            fillOpacity={0} fill="transparent"
          />
        </AreaChart>
      </ResponsiveContainer>
    )
  }

  const XAxisResponsiveContainer = () => {
    return (
      <ResponsiveContainer width={'100%'} height={30}>
        <AreaChart width={"100%"} height={'100%'} data={result}
        // margin={{ top: 10, right: 13, left: 13, bottom: 0 }}
        // margin={{ top: 30 }}
        >
          <XAxis
            tick={tick_style}
            interval={xAxisinterval}
            // tickFormatter={(value) => `${value}`}
            dataKey={x_axis_dataKey}
            tickLine={false}
            axisLine={false}
            style={isMobile ? { fontSize: '12px' } : { fontSize: '20px' }}
          />
          <Area
            type="monotone"
            stroke="transparent"
            // dataKey={x_axis_dataKey}
            fillOpacity={0} fill="transparent"
          />
          {/* <YAxis /> */}
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    )
  }

  const ResultGraphGradientDef = () => {
    return (
      <ResponsiveContainer width={'100%'} height={"80%"}>
        {moneyPathIndex == 3 ? (
          <AreaChart width={"100%"} height={'100%'} data={result}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="area_gradient" x1="627.813" y1="-65.8018" x2="627.813" y2="370.198" gradientUnits="userSpaceOnUse">
                <stop offset="0.15625" stopColor="#67EAB3" />
                <stop offset="0.505208" stopColor="#79CBDD" stopOpacity="0.666667" />
                <stop offset="1" stopColor="#7E81DB" stopOpacity="0" />
              </linearGradient>
            </defs>
            <Tooltip content={<CustomToolTip />} contentStyle={{ color: "white", backgroundColor: "grey" }} />
            <Area type="monotone"
              // dataKey="netWorth"
              dataKey={y_axis_dataKey}
              stroke="#EFEFEF" strokeWidth={4}
              fillOpacity={1} fill="url(#area_gradient)"
              dot={
                <CustomizedDotFlag
                  maxvalue={5}
                  freedomAge={result_chart_data?.financialFreedomFetched?.financial_freedom_age || Freedom_age} />}
            // dot={<FlagLoader/>}
            />
          </AreaChart>
        ) : (
          <div className='h-full flex justify-center items-center bg-myMoneyPath-gradient'>
            <h1 className='text-slate-300 flex gap-1 items-center text-4xl'><span className='italic text-3xl'>my</span><span className='font-extrabold'>MoneyPath</span></h1>
          </div>
        )}

      </ResponsiveContainer>
    )
  }


  return (
    <>
      <div className={`${className} resultChartMain-container `} >
        <div className={`flex items-end ${isMobile ? 'relative' : ''}`}>
          <div className={`pb-2 flex flex-col justify-between items-end ${isMobile ? 'absolute right-0 top-5' : 'relative -top-10'}`} style={{ width: isMobile ? '9%' : '2%', height: 443 }}  >
            <div className={`-rotate-90 ${isBrowser && 'relative'} text-grey-3  md:text-xl text-base leading- font-medium `}>{numerictype == 'lakhs' ? 'Cr.' : 'Millions'}</div>
            <YAxisResponsiveContainer />
          </div>

          {/* <MobileView> */}
          {isMobile ? (
            <div className='overflow-x-auto scrollbar-hide w-[100%] rounded-[30px]'
              style={{ boxShadow: "0px 0px 20px 0px rgba(139, 192, 217, 0.50)", width: "100vw" }}
            >
              <div className={`flex items-end flex-1 mb-2 relative isolate overflow-hidden ${isMobile && 'min-w-[200%]'}`}
                // <div className={`flex items-end flex-1 mb-2 relative isolate overflow-hidden ${isMobile && 'min-w-[175%]'}`}
                style={{ height: 443 }}
              >
                {moneyPathIndex == 3 && <FreedomInfo />}
                <ResultGraphGradientDef />
              </div>
              {/* x-axis for mobile */}
              <div className={` ${isMobile && 'min-w-[200%]'}`}>
                <XAxisResponsiveContainer />
                <div className={`text-grey-3 text-sm leading- font-medium absolute bottom-0 left-96 w-fit max-md:left-[18rem] max-sm:left-[15rem] max-md:bottom-5'}`}>Age</div>
              </div>
            </div>
          ) : null}
         
          {/* </MobileView> */}
          <BrowserView>
            
              <div className={`resultChart-container`}
                style={{  boxShadow: "0px 0px 20px 0px rgba(139, 192, 217, 0.50)" }}
              >
                {moneyPathIndex == 3 && <FreedomInfo />}
                <ResultGraphGradientDef />
              </div>
              {/* x-axis */}
              <div>
                <XAxisResponsiveContainer />
                <div className=" text-grey-3 text-xl leading- font-medium relative -top-8 -right-[101%] w-fit ">Age</div>
              </div>
            
            
          </BrowserView>
        </div>
      </div>
    </>
  )
}

export default Result_chart

{/* <div className='absolute left-24 bottom-[-10px] z-10'>
  <img src={orange_flag} alt="" />
</div> */}
{/* <div className='absolute left-[490px] bottom-[-10px] z-10'>
  <img src={orange_flag} alt="" />
</div> */}