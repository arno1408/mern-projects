import { Area, AreaChart, CartesianGrid, Dot, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
// import chart_bg from '../assets/images/chart_bg_image2.png'
import chart_bg from '../assets/images/garph_bg.png'
import { Area_data } from '../constants'
import CustomizedDotFlag from './CustomizedDotFlag';
import { home_graph } from '../assets/Icons';
import CustomizedDotFlagDashboard from './CustomizedDotFlagDashboard';
import { formatNumberWithCommas } from '../Variable';

const DotFlag = (props) => {
    const { cx, cy, value, maxvalue } = props;

    if (value[1] === 1300) {
        return (
            null
        );
    }

    if (value[1] > maxvalue) {
        return (
            <g x={cx - 10} y={cy - 10}>
                <circle cx={props.cx} cy={props.cy} r={8} fill="white" fillOpacity="0.2" />
                <circle cx={props.cx} cy={props.cy} r={5} fill="#67EAB3" />
                <circle cx={props.cx} cy={props.cy} r={3} fill="#0F3A4D" />

                <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 100 100" fill="none"
                    x={cx - 17}
                    y={cy - 50}
                >
                    <g filter="url(#filter0_d_514_1031)">
                        <path d="M49.1998 21.8448C31.7085 17.8531 23.6119 21.2578 21.75 23.4591L24.6227 50.7553C26.9633 48.2115 37.4857 42.1555 53.1896 45.9124C68.8934 49.6693 77.6071 46.4994 80.001 44.4449L74.894 21.8448C73.6173 23.508 66.691 25.8365 49.1998 21.8448Z" fill="#EFEFEF" />
                        <rect x="0.437121" y="0.362995" width="0.797437" height="59.3217" transform="matrix(0.996416 -0.0845939 0.0998994 0.994998 19.9653 20.2204)" fill="white" stroke="white" strokeWidth="0.797437" />
                    </g>
                    <defs>
                        <filter id="filter0_d_514_1031" x="0" y="0" width="100" height="100" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset />
                            <feGaussianBlur stdDeviation="10" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0.405206 0 0 0 0 0.917448 0 0 0 0 0.702306 0 0 0 0.8 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_514_1031" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_514_1031" result="shape" />
                        </filter>
                    </defs>
                </svg>

                <svg width="6" height="150" viewBox="0 0 2 326" fill="none" xmlns="http://www.w3.org/2000/svg"
                    x={cx - 3.5} y={cy}
                >
                    <rect width="5" height="280" fill="url(#paint0_linear_975_14346)" />
                    <defs>
                        <linearGradient id="paint0_linear_975_14346" x1="1" y1="0" x2="1" y2="326" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#0F3A4D" />
                            <stop offset="1" stopColor="#0F3A4D" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </g>
        );
    }

    return (
        <g x={cx - 10} y={cy - 10}>
            <circle cx={props.cx} cy={props.cy} r={7} fill="white" fillOpacity="0.2" />
            <circle cx={props.cx} cy={props.cy} r={5} fill="#67EAB3" />
            <circle cx={props.cx} cy={props.cy} r={3} fill="#0F3A4D" />

            <svg xmlns="http://www.w3.org/2000/svg" width="47" height="46" viewBox="0 0 47 46" fill="none"
                x={cx - 13}
                y={cy - 40}
            >
                <g filter="url(#filter0_d_1376_3392)">
                    <path d="M23.0759 11.0478C15.456 9.37436 11.9288 10.8017 11.1177 11.7246L12.3691 23.168C13.3888 22.1016 17.9728 19.5627 24.814 21.1377C31.6552 22.7127 35.4513 21.3838 36.4941 20.5224L34.2694 11.0478C33.7132 11.7451 30.6958 12.7213 23.0759 11.0478Z" fill="#67EAB3" />
                    <rect x="0.191095" y="0.158574" width="0.347304" height="24.8665" transform="matrix(0.996679 -0.081429 0.103768 0.994601 10.3401 10.367)" fill="white" stroke="white" strokeWidth="0.347304" />
                </g>
                <defs>
                    <filter id="filter0_d_1376_3392" x="0.355957" y="0.274414" width="46.1382" height="45.1538" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset />
                        <feGaussianBlur stdDeviation="5" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.405206 0 0 0 0 0.917448 0 0 0 0 0.702306 0 0 0 0.6 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1376_3392" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1376_3392" result="shape" />
                    </filter>
                </defs>
            </svg>
        </g>
    );
}

const Custume_AreaChart = () => {
    
  const CustomToolTip=({ active, payload, label })=>{
    console.log(payload[0]?.payload?.amt ,"load")
    return(
      <div className='bg-slate-800 rounded-xl p-4'>
        <div className='text-sm text-slate-200 font-semibold uppercase'>Portfolio </div>
         <div className='text-2xl text-emerald-300'>{payload.length>0 ?payload[0]?.payload?.amt : 0}</div>
      </div>
    )
  }

    return (
        <div className='h-[94%]'>
            <div className="aspect-video md:aspect-[547/149] bg-center flex items-end rounded-[30px] border-2 border-accent-bright-green overflow-hidden drop-shadow-[-2px_-2px_8px_rgba(255,255,255,0.60)]"  // md:aspect-[1095/383]
                style={{ backgroundImage: `url(${chart_bg})`, backgroundRepeat: 'no-repeat', height: '100%', width: "100%", backgroundSize: "100% 100%" }}
            >
                <ResponsiveContainer width="100%" height="92%" className={"relative"}>
                    <div className='absolute z-10 lg:top-[3.5rem] lg:left-[2.5rem] xl:top-[4rem] xl:left-[6.5rem] 2xl:top-[4rem] 2xl:left-[8.5rem] opacity-60 text-light-blue-1 bg-[#000000]  rounded-xl p-2 lg:text-sm xl:text-base'>Enough money for<br/>your child’s education</div>
                    <div className='absolute lg:z-10 lg:top-[0.25rem] lg:right-[12.25rem] xl:top-[0.25rem] xl:right-[16.25rem] 2xl:top-[0.5rem 2xl:right-[18rem] opacity-60 text-light-blue-1 bg-[#000000]  rounded-xl p-2 lg:text-sm xl:text-base'>Can this be your<br/> Financial Freedom?</div>
                    <AreaChart data={Area_data} width='100%' height='100%'>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1" width={'100%'}>
                                <stop offset="0%" stopColor="#131529 " stopOpacity={0.6} />
                                <stop offset="37%" stopColor="#131529 " stopOpacity={0.6} />
                                <stop offset="75%" stopColor="#131529 " stopOpacity={0.6} />
                            </linearGradient>
                        </defs>
                        <Tooltip content={<CustomToolTip/>} contentStyle={{color:"white",backgroundColor:"grey"}} />
                        <Area 
                            type="monotone" 
                            dataKey="amt" 
                            stroke="#67EAB3" 
                            fillOpacity={1} 
                            fill="url(#colorUv)"
                            dot={<CustomizedDotFlagDashboard maxValue={700} r={20}/>}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <ResponsiveContainer width="100%" height="9%">
                <AreaChart data={Area_data} width='100%' height='100%'
                    margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
                >
                    <XAxis dataKey="uv" tickLine={false} axisLine={false} interval={'preserveStartEnd'}
                        tick={{ fontSize: 18, fontWeight: 500, fill: "#B5B5B5" }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Custume_AreaChart