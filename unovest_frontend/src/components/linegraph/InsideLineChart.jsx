import { BsEyeSlash } from "react-icons/bs"
import EyeIconButton from "../EyeIconButton"
import { FiEye } from "react-icons/fi"
import ResultLineGraph from "./ResultLineGraph"
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
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

const InsideLineChart = ({ data }) => {
    const [networth, setnetworth] = useState(true);
    const [income, setincome] = useState(true);
    const [outflows, setoutflows] = useState(true);
    const [goaloutflows, setgoaloutflows] = useState(true);
    const cashflowdetail = useSelector((state) => state.financialFreedomData?.cashflowdetail?.cashFlowDetails);

    const [graphData, setgraphData] = useState([]);

    useEffect(() => {
        if (cashflowdetail?.length > 0) {
            const newgraphData = cashflowdetail.map((data) => {
                return {
                    age: data?.age,
                    // goaloutflow: data?.goalOutflow,
                    // income: data?.income,
                    // outflows: data?.totalOutflow,
                    // networth: data?.closingNetworth
                    goaloutflow: data?.goalOutflow / 10000000,
                    income: data?.income / 10000000,
                    outflows: data?.totalOutflow / 10000000,
                    networth: data?.closingNetworth / 10000000
                }
            })
            setgraphData(newgraphData)
        }
    }, [cashflowdetail]);
    return (
        <div className="inshighteslinechart">
            <p className='mb-5'>CUSTOMIZE YOUR GRAPH</p>
            <div className='flex items-center w-full gap-4'>
                <EyeIconButton onClick={() => setnetworth(!networth)} icon={networth ? <FiEye color={"#0F3A4D"} fontSize={"24px"} /> : <BsEyeSlash color='#B0C3F5' fontSize={"24px"} />} colorbg={networth ? "#BCFBE4" : "rgba(236, 236, 236, 0.20)"} text={"Networth"} color={networth ? "#0F3A4D" : "#B4DAF6"} />
                <EyeIconButton onClick={() => setoutflows(!outflows)} icon={outflows ? <FiEye color={"#0F3A4D"} fontSize={"24px"} /> : <BsEyeSlash color='#B0C3F5' fontSize={"24px"} />} colorbg={outflows ? "#BCFBE4" : "rgba(236, 236, 236, 0.20)"} text={"Outflows"} color={outflows ? "#0F3A4D" : "#B4DAF6"} />

                <EyeIconButton onClick={() => setincome(!income)} icon={income ? <FiEye color={'#0F3A4D'} fontSize={"24px"} /> : <BsEyeSlash color='#B0C3F5' fontSize={"24px"} />} colorbg={income ? "#A1FBF6" : "rgba(236, 236, 236, 0.20)"} text={"Income"} color={income ? "#0F3A4D" : "#B0C3F5"} />
                <EyeIconButton onClick={() => setgoaloutflows(!goaloutflows)} icon={goaloutflows ? <FiEye color={'#0F3A4D'} fontSize={"24px"} /> : <BsEyeSlash color='#B0C3F5' fontSize={"24px"} />} colorbg={goaloutflows ? "#A1FBF6" : "rgba(236, 236, 236, 0.20)"} text={"Goal Outflows"} color={goaloutflows ? "#0F3A4D" : "#B0C3F5"} />
            </div>
            <div className=''>
                {/* {console.log(graphData,"graphData")} */}
                <ResultLineGraph
                    data={graphData.length > 0 ? graphData : []}
                    x_axis_dataKey='age'
                    y_axis_dataKey={{ netWorth: "networth", outflows: "outflows", income: "income", goaloutflow: "goaloutflow" }}
                    Freedom_age={50}
                    networth={networth}
                    outflows={outflows}
                    income={income}
                    goaloutflows={goaloutflows}
                />
            </div>
        </div>
    )
}

export default InsideLineChart
