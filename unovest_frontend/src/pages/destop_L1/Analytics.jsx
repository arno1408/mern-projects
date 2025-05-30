import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Menubar from "../../components/Menubar"
import Result_chart from "../../components/Result_chart"
import { PeopleData } from "./My_power"
import My_power_sidebar from "../../components/my-power/My_power_sidebar"
import ResultCards from "../../components/ResultCards"
import Progress_meter from "../../components/Progress-meter/Progress_meter"
import RoundedBtn from "../../components/RoundedBtn"
import Filter_btn from "../../components/Filter_btn"
import { useSelector } from "react-redux"
import { revealArray } from "../../Variable"


const Analytics = () => {
    const naviagte = useNavigate()
    const [percentatge, setPercentatge] = useState(78)
    let financialDetails = useSelector((state) => state)
    console.log(financialDetails,"finanace");
    return (
        <div className='min-h-screen bg-result  -gradiant'
            style={{ background: 'radial-gradient(ellipse at 210.67% 129.74%, #9891AD 0%, #538096 22.18%, #3C566E 2.79%, #131529 61.23%)' }}
        >
            <Menubar />
            <div className="flex items-start">
                <My_power_sidebar />
                <div className="max-w-[1260px]  mx-auto flex flex-col gap-12 justify-end items-center">
                    <div className=" mt-14">
                        <Result_chart moneyPathIndex={3} data={PeopleData} x_axis_dataKey='age' y_axis_dataKey='closingAssets' Freedom_age={58} />
                    </div>

                    <div className="w-full flex gap-12  self-end">
                        <div className="flex-[2] flex flex-wrap gap-7 justify-end">
                            <ResultCards
                                revealId={1}
                                revealFilterData={revealArray.filter(list => list.id == 1)}
                                style={{ background: "" }}
                                label='Enough Money for all goals?'
                                value={'YES!'}
                                subValue={""}
                            />
                            <ResultCards
                                revealId={2}
                                style={{ background: "#BCFBE4" }}
                                revealFilterData={revealArray.filter(list => list.id == 2)}
                                label='FIRE Amount Required Today'
                                value={4.3}
                                subValue={"Crores"}
                            />
                            <ResultCards
                                revealId={3}
                                style={{ background: "#B4DAF6" }}
                                revealFilterData={revealArray.filter(list => list.id == 3)}
                                label='Networth at Retirement'
                                value={9.8}
                                subValue={"Crores"}
                            />
                            <ResultCards
                                revealId={4}
                                style={{ background: "#B0C3F5" }}
                                revealFilterData={revealArray.filter(list => list.id == 4)}
                                label='Likely inheritance'
                                value={"NO"}
                                subValue={""}
                            />
                        </div>
                        <div className="flex-[1] flex flex-col  justify-between gap-6 max-w-[400px]">
                            <div className="flex-1 flex items-center justify-center rounded-[30px] card-shadow "
                                style={{ backgroundImage: 'radial-gradient(1323.55% 390.21% at 116.51% 142.46%, #9891AD 0%, #538096 22.18%, #3C566E 37.68%, #131529 94.3%)', }}
                                onClick={() => setPercentatge(pre => pre + 1)}
                            >
                                <Progress_meter percent={70} />
                            </div>



                            <div className=" flex gap-3 justify-center items-center ">
                                <RoundedBtn label={'Show All Insights'}
                                    onClick={() => { naviagte('insides') }}
                                />
                                <Filter_btn path={'analytics'} onClick={() => console.log("object")} />
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    )
}

export default Analytics
