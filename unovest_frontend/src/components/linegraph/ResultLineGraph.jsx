import React from 'react'
import { useSelector } from 'react-redux'
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { changeNumbertoComma } from '../../Variable'
let tick_style = { fontSize: 20, fontWeight: 500, fill: "#B5B5B5" }


const ResultLineGraph = ({ data, y_axis_dataKey, x_axis_dataKey, ...props }) => {
    // const userDetails = JSON.parse(localStorage.getItem('userdetails'))
    // const numerical_format = userDetails?.user_data?.numerical_format || 'lakhs'; 
    const numerictype = useSelector(state => state?.statistical_Data?.numerical_format)

    return (
        <div className='ResultLine-main'>
            <>
                <div className="ResultLine-container" >
                    <div className="flex  items-end ">
                        {/* y-axis */}
                        <div className="pb-2 flex flex-col justify-between items-end" style={{ width: "2%", height: 443 }}  >
                            <p className=" -rotate-90  text-grey-3 text-xl leading- font-medium ">{numerictype == 'lakhs'? 'Cr.': 'Millions'}</p>
                            <ResponsiveContainer width={'267%'} height={360}>
                                <LineChart width={"100%"} height={'100%'} data={data}
                                >
                                  <YAxis
                                        tickLine={false}
                                        interval={'preserveStartEnd'}
                                        tick={tick_style}
                                        axisLine={false}
                                        // tickFormatter={value => value/100}
                                        tickFormatter={(value) => {
                                            return `${numerictype == 'lakhs'? changeNumbertoComma(value):changeNumbertoComma(value/10)}`
                                        }}
                                    />
                                    {/* <Line type="monotone"
                                        dataKey={y_axis_dataKey.netWorth}
                                        stroke="transparent" strokeWidth={4}
                                        fillOpacity={0} fill="transparent"
                                        dot={false}
                                    />
                                    <Line type="monotone"
                                        dataKey={y_axis_dataKey.outflows}
                                        stroke="transparent" strokeWidth={4}
                                        fillOpacity={0} fill="transparent"
                                        dot={false}
                                    />
                                    <Line type="monotone"
                                        dataKey={y_axis_dataKey.income}
                                        stroke="transparent" strokeWidth={4}
                                        fillOpacity={0} fill="transparent"
                                        dot={false}
                                    />
                                    <Line type="monotone"
                                        dataKey={y_axis_dataKey.goaloutflow}
                                        stroke="transparent" strokeWidth={4}
                                        fillOpacity={0} fill="transparent"
                                        dot={false}
                                    /> */}
                                    {props.networth ? <Line type="monotone"
                                        dataKey={y_axis_dataKey.netWorth}
                                        stroke="transparent" strokeWidth={4}
                                        fillOpacity={0} fill="transparent"
                                        dot={false}
                                    /> : null}
                                    {props.outflows ?
                                        <Line type="monotone"
                                            dataKey={y_axis_dataKey.outflows}
                                            stroke="transparent" strokeWidth={4}
                                            fillOpacity={0} fill="transparent"
                                            dot={false}
                                        /> : null}
                                    {props.income ? <Line type="monotone"
                                        dataKey={y_axis_dataKey.income}
                                        stroke="transparent" strokeWidth={4}
                                        fillOpacity={0} fill="transparent"
                                        dot={false}
                                    /> : null}
                                    {props.goaloutflows ? <Line type="monotone"
                                        dataKey={y_axis_dataKey.goaloutflow}
                                        stroke="transparent" strokeWidth={4}
                                        fillOpacity={0} fill="transparent"
                                        dot={false}
                                    /> : null}
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="flex items-end flex-1 rounded-[30px] overflow-hidden mb-2 relative"
                            style={{ height: 443, background: "rgba(236, 236, 236, 0.20)" }}
                        >
                            <ResponsiveContainer width={'100%'} height={"80%"}>
                                <LineChart width={"100%"} height={'100%'} data={data}
                                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                                >
                                    <CartesianGrid strokeDasharray="" horizontal={true} vertical={false} />
                                    {/* <Tooltip /> */}
                                    {props.networth ? <Line type="monotone"
                                        dataKey={y_axis_dataKey.netWorth}
                                        stroke="#67EAB3" strokeWidth={4}
                                        fillOpacity={1}
                                        dot={false}
                                    /> : null}
                                    {props.outflows ?
                                        <Line type="monotone"
                                            dataKey={y_axis_dataKey.outflows}
                                            stroke="#9DAFF0" strokeWidth={4}
                                            fillOpacity={1}
                                            dot={false}
                                        /> : null}
                                    {props.income ? <Line type="monotone"
                                        dataKey={y_axis_dataKey.income}
                                        stroke="#4196BA" strokeWidth={4}
                                        fillOpacity={1}
                                        dot={false}
                                    /> : null}
                                    {props.goaloutflows ? <Line type="monotone"
                                        dataKey={y_axis_dataKey.goaloutflow}
                                        stroke="#EFEFEF" strokeWidth={4}
                                        fillOpacity={1}
                                        dot={false}
                                    /> : null}
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* x-axis */}
                    <div className="">
                        <ResponsiveContainer width={'97%'} height={30} style={{position:'relative'}}>
                            <LineChart width={"100%"} height={'100%'} data={data}
                                margin={{ top: 30, left:20 }} 
                            >
                                <XAxis
                                    tick={tick_style}
                                    tickCount={1}
                                    interval={'equidistantPreserveStart'}
                                    dataKey={x_axis_dataKey}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                {/* <YAxis /> */}
                                {/* <Tooltip /> */}
                            </LineChart>
                        <p className=" text-grey-3 text-xl font-medium absolute bottom-0 -right-10">Age</p>
                        </ResponsiveContainer>
                    </div>
                </div>
            </>
        </div>
    )
}

export default ResultLineGraph
