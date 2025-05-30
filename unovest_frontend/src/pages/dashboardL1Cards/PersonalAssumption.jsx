import React, { useEffect, useState } from 'react'
import RangePickerCards from '../../components/rangepickers/RangePickerCards'
import RangeInput from '../../components/rangepickers/RangeInput'
import { useDispatch, useSelector } from 'react-redux';
import { all_level_1_data } from '../../redux/slices/Level_1_all_data';
import useFetchPortfolio from '../../useFetchPortfolio/useFetchPortfolio';
import Assumptions_icon from '../../components/my-power/sidebar-icons/Assumptions_icon';
import { updateMy_powersidebar } from '../../redux/slices/My_powersidebar';
import Tooltip from '../../components/tooltip/Tooltip';
import { IoLockClosed } from 'react-icons/io5';


const PersonalAssumption = ({ handleSliderChange }) => {
    const [isMobile, setIsMobile] = useState(false);
    const dispatch = useDispatch();
    let allData = useSelector((state) => state?.level_1_data)
    // console.log(allData, "alllData") 
    const { result_chart_data } = useFetchPortfolio(allData?.profile_data?.current_age, allData?.profile_data?.work_till_age, allData?.profile_data?.living_age);
    // console.log(result_chart_data,"chart");
    useEffect(() => {
          if (window.innerWidth < 768) {
            setIsMobile(true);
          } else {
            setIsMobile(false);
          }
      }, [window.innerWidth]); 

    const handleInputChange = (e) => {
        // setrangeValue(parseInt(e.target.value, 10));
        let temp = { ...allData?.profile_data };
        temp[e.target.name] = e.target.value
        temp['isEdit_profile'] = true;

        dispatch(all_level_1_data({ profile_data: temp }))
        // console.log(temp,"temp")

        // setinputs(temp)  
    };
    let ChangeSection = (number) => {
        dispatch(updateMy_powersidebar({ currentSection: number }));
    }

    const Message=({message})=>{
        return (
            <div className='w-52'>
                {message}
            </div>
        )
    }
    return (
        <RangePickerCards heading={"Assumptions"} Icon={Assumptions_icon} onclick={() => ChangeSection(1)}>
            <div className={`p-12 flex flex-col gap-6 justify-center ${isMobile && 'border-2 rounded-b-xl border-solid shadow-2xl border-accent-green'}`}>
                {/* <RowInputs inputName={"Work Till Age"} /> */}

                {/* Work Till Age */}
                <div className='flex flex-wrap gap-2 md:gap-6 items-center justify-between'>
                    <div className='order-1'>
                        <p className='rates-heading'>{"Work Till Age"}</p>
                    </div>
                    <div className="rates-rangeInput">
                        <RangeInput className='progress w-full' name={"work_till_age"} value={allData?.profile_data?.work_till_age} min={allData?.profile_data?.current_age} max="100" style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${allData?.profile_data?.work_till_age}%, #676767 ${allData?.profile_data?.work_till_age}%, #676767 100%)` }} onChange={handleInputChange} />
                        {/* <input type="range" className='progress' step="1" min="0" max="100" value={rangeValue} style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${rangeValue}%, #676767 ${rangeValue}%, #676767 100%)` }} onChange={(e) => handleRangeChange(e)} /> */}
                    </div>
                    <input type="number"
                        //autoFocus
                        name={"work_till_age"}
                        value={allData?.profile_data?.work_till_age}
                        onChange={handleInputChange}
                        className={`assumpation-input-border  md:order-3  text-accent-green  md:border-accent-bright-green    ring-accent-green  focus:text-accent-green focus:border-accent-bright-green `}
                    />
                </div>
                {/* current Age  */}
                {/* <RowInputs inputName={"Current Age"} /> */}
                <div className='flex flex-wrap gap-2 md:gap-6 items-center justify-between'>
                    <div className='order-1'>
                        <p className='rates-heading'>{"Current Age"}</p>
                    </div>
                    <div className="rates-rangeInput">
                        <RangeInput className='progress w-full' onChange={handleInputChange} name={"current_age"} value={allData?.profile_data?.current_age} min="0" max="100" style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${allData?.profile_data?.current_age}%, #676767 ${allData?.profile_data?.current_age}%, #676767 100%)` }} />
                        {/* <input type="range" className='progress' step="1" min="0" max="100" value={rangeValue} style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${rangeValue}%, #676767 ${rangeValue}%, #676767 100%)` }} onChange={(e) => handleRangeChange(e)} /> */}
                    </div>
                    <input type="number"
                        //autoFocus
                        name='current_age'
                        value={allData?.profile_data?.current_age}
                        onChange={handleInputChange}
                        className={`assumpation-input-border max-md:order-2 text-accent-green  md:border-accent-bright-green  ring-accent-green  focus:text-accent-green focus:border-accent-bright-green `}
                    />
                </div>
                <div className='flex justify-between'>
                    <p className='rates-heading'>Plan Till Age</p>
                    <div className='flex gap-1 items-center'  data-tooltip-id='upgrade-level2'>
                        <input type="number"
                            //autoFocus
                            disabled
                            onChange={handleInputChange}
                            name='living_age'
                            value={allData?.profile_data?.living_age}
                            className="assumpation-input-age text-accent-green " style={{ background: "rgba(220, 220, 220, 0.10)" }}
                        />
                        <IoLockClosed size={'1.4em'} color='#B5B5B5' />
                    </div>
                   
                </div>
                <div className='flex justify-between'>
                    <p className='rates-heading'>Any Financial Dependents?</p>
                    <div className="bg-grey-1 px-3 py-1 max-md:py-[5px] rounded-2xl border border-slate-400 md:border-accent-bright-green" style={{ background: 'linear-gradient(184deg, rgba(24, 33, 50, 0.40) 2.7%, rgba(24, 34, 51, 0.40) 96.07%' }}>
                        <select name="any_financial_dependents" id="" className='w-[60px] text-white leading-snug  text-lg max-md:text-base font-semibold input-border-none bg-transparent' defaultValue={allData?.profile_data?.any_financial_dependents} onChange={handleInputChange}>
                            <option className="text-white text-lg max-md:text-xs input-border-none bg-dark-blue" value={true}>Yes</option>
                            <option className="text-white text-lg max-md:text-xs input-border-none bg-dark-blue" value={false}>No</option>
                        </select>
                    </div>
                </div>
                <Tooltip
                    id={'upgrade-level2'}
                    backgroundColor={'#232E41'}
                    message={<Message message={'Upgrade to Level 2'}/>}
                    opacity={1}
                    position='top'
                /> 
            </div>
        </RangePickerCards>
    )
}

export default PersonalAssumption
