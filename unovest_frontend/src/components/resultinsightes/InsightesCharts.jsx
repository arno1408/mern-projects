import React, { useEffect, useState } from 'react'
import CircularProgress from '../circularProgressBar/CircularProgress'
import './resultinsightstyle.css'
import VerticleProgress from '../verticleprogressbar/VerticleProgress'
import { useSelector } from 'react-redux'
import ProgressBarCirculer from '../circularProgressBar/ProgressBarCirculer'
const InsightesCharts = ({ styles, data }) => {
    const [allcashflowData, setallcashflowData] = useState({});
    const alldata = useSelector((state) => state.financialFreedomData)
    let financialDetails = useSelector((state) => state?.financialFreedomData)
    const financialFreedom = financialDetails;
    const mediaQueryStyle = {
        // '@media (min-width: 768px)': {
        background: "linear-gradient(180deg, rgba(154, 154, 154, 0.20) 0.49%, rgba(154, 154, 154, 0.10) 99.66%)",
        // },
    };

    useEffect(() => {
        setallcashflowData(alldata)
    }, [data]);

    return (
        <div className={`${styles ? styles : ''} inshightes-container`}>
            <div className='lg:flex-[2]'>
                <p className="inshightes-heading">PIECES OF THE PIE</p>
                <div className='inshightes-Circuler'>
                    <div className='flex-1 '>
                        <div className='flex flex-col items-center justify-between isolate'>
                            <div className='relative min-w-max mx-auto  ' >
                                <ProgressBarCirculer
                                    percentage1={financialFreedom?.networth?.equityToAssets} percentage2={financialFreedom?.networth?.cashToAssets}
                                    circle1={"#67EAB3"} circle2={"#4196BA"}
                                    label1='Equity in Portfolio' label2='Cash/Bank to Assets'
                                    title={'ASSETS'}
                                />
                                {/* <CircularProgress text={"ASSETS"} value={{ value1: 50, value2: 15 }} circle1={"#67EAB3"} circle2={"#4196BA"} /> */}
                                {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-56 w-56 rounded-full" style={{ boxShadow: "rgb(47, 47, 47) 0px 0px 60px 30px", zIndex: "-1" }}></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full " style={{ boxShadow: "inset 0px 0px 39px 6px #2f2f2f" }}></div> */}
                            </div>
                            {/* <div className='flex flex-col gap-2 mt-[30px]'>
                                <div className="flex justify-start items-center gap-12">
                                    <p className="text-emerald-300 text-lg font-semibold font-Montserrat">Equity in Portfolio</p>
                                    <p className="text-emerald-300 text-4xl font-semibold font-Work_Sans">35%</p>
                                </div>
                                <div className="flex justify-start items-center gap-6">
                                    <p className="grow shrink basis-0 text-cyan-600 text-lg font-semibold font-Montserrat">Cash/Bank to Assets</p>
                                    <p className="text-cyan-600 text-4xl font-semibold font-Work_Sans">21%</p>
                                </div>
                            </div> */}
                        </div>

                    </div>
                    <div className='flex-1 mt-4 md:mt-0'>
                        <div className='flex flex-col items-center isolate'>
                            <div className='relative min-w-max mx-auto'>
                                <ProgressBarCirculer
                                    percentage1={financialFreedom?.financialfreedom?.savingsToIncome} percentage2={financialFreedom?.financialfreedom?.emiTOIncome}
                                    circle1={"#A1FBF6"} circle2={"#9DAFF0"}
                                    label1='Savings Ratio' label2='EMI’s to Income'
                                    title={'INCOME'}
                                />
                                {/* <CircularProgress text={"INCOME"} value={{ value1: 25, value2: 18 }} circle1={"#A1FBF6"} circle2={"#9DAFF0"} /> */}
                                {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-56 w-56 rounded-full" style={{ boxShadow: "rgb(47, 47, 47) 0px 0px 60px 30px", zIndex: "-1" }}></div>
                                <div className="drop-shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full" style={{ boxShadow: "inset 0px 0px 39px 6px #2f2f2f" }}></div> */}
                            </div>
                            {/* <div className='flex flex-col gap-2 mt-[30px]'>
                                <div className="flex justify-start items-center gap-12">
                                    <p className="text-cyan-200 text-lg font-semibold font-Montserrat">Savings Ratio</p>
                                    <p className="text-cyan-200 text-4xl font-semibold font-Work_Sans">25%</p>
                                </div>
                                <div className="flex justify-start items-center gap-6">
                                    <p className="grow shrink basis-0 text-indigo-300 text-lg font-semibold font-Montserrat">EMI’s to Income</p>
                                    <p className="text-indigo-300 text-4xl font-semibold font-Work_Sans">18%</p>
                                </div>
                            </div> */}
                        </div>

                    </div>
                </div>
            </div>

            {/* verical bars */}
            <div className='inshightes-vertical' style={{ ...mediaQueryStyle }}>

                <div className="inshightesVerticleProgress ">
                    <VerticleProgress bg={"bg-indigo-300"} border={"border-2 border-[#FF5151]"} value={Number(allcashflowData?.cashflowdetail?.inflation * 100).toFixed(2)} color={"text-indigo-300"} />
                    <VerticleProgress bg={"bg-emerald-300"} value={Number(allcashflowData?.cashflowdetail?.portfolioReturn * 100).toFixed(2)} color={"text-emerald-300"} />
                </div>

                <div className='lg:w-80 max-md:w-[225px] mx-auto'><div className='w-full bg-[#4196BA] h-[1px]'></div></div>
                <div className="flex justify-around md:gap-14 max-md:gap-13 w-[85%] md:w-auto mt-2 md:mt-0">
                    <p className='text-indigo-300 text-sm font-semibold md:text-lg'>Inflation*</p>
                    <p className='text-emerald-300 text-sm font-semibold md:text-lg max-w-[80px] md:max-w-[100px] break-words text-end'>Portfolio Returns*</p>
                </div>
                <p className='inshightes-average'>
                    *Expected Yearly Average
                </p>
            </div>
        </div>
    )
}

export default InsightesCharts
