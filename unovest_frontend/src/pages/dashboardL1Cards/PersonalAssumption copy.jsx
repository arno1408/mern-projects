import React, { useEffect, useState } from 'react'
import RangePickerCards from '../../components/rangepickers/RangePickerCards'
import RangeInput from '../../components/rangepickers/RangeInput'
import { useDispatch, useSelector } from 'react-redux';
import { getData, saveDetails } from '../destop_L1/server';
import { all_level_1_data } from '../../redux/slices/Level_1_all_data';

const PersonalAssumption = () => {
    const dispatch = useDispatch();
    let allData = useSelector((state) => state?.level_1_data)
    const handleInputChange = (e) => {
        let temp = { ...allData?.profile_data };
        temp[e.target.name] = e.target.value
        dispatch(all_level_1_data({ profile_data: temp }))
    };


    return (
        <RangePickerCards heading={"Personal Assumptions"}>
            <div className="p-12 flex flex-col gap-6 justify-center">
                {/* <RowInputs inputName={"Work Till Age"} /> */}

                {/* Work Till Age */}
                <div className='flex gap-6 items-center justify-between'>
                    <div >
                        <p className='text-grey-3'>{"Work Till Age"}</p>
                    </div>
                    <div className="ml-auto">
                        <RangeInput className='progress' name={"work_till_age"} value={allData?.profile_data?.work_till_age} min="0" max="100" style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${allData?.profile_data?.work_till_age}%, #676767 ${allData?.profile_data?.work_till_age}%, #676767 100%)` }} onChange={handleInputChange} />
                        {/* <input type="range" className='progress' step="1" min="0" max="100" value={rangeValue} style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${rangeValue}%, #676767 ${rangeValue}%, #676767 100%)` }} onChange={(e) => handleRangeChange(e)} /> */}
                    </div>
                    <input type="number"
                        autoFocus
                        name={"work_till_age"}
                        value={allData?.profile_data?.work_till_age}
                        onChange={handleInputChange}
                        className={`py-[9px] border text-accent-green border-accent-bright-green px-4 rounded-2xl font-normal font-Work_Sans w-[60px] text-xs input-border-none bg-transparent focus:outline-none focus:ring-1 ring-accent-green  focus:text-accent-green focus:border-accent-bright-green focus:py-[9px]`}
                    />
                </div>
                {/* current Age  */}
                {/* <RowInputs inputName={"Current Age"} /> */}
                <div className='flex gap-6 items-center justify-between'>
                    <div >
                        <p className='text-grey-3'>{"Current Age"}</p>
                    </div>
                    <div className="ml-auto">
                        <RangeInput className='progress' onChange={handleInputChange} name={"current_age"} value={allData?.profile_data?.current_age} min="0" max="100" style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${allData?.profile_data?.current_age}%, #676767 ${allData?.profile_data?.current_age}%, #676767 100%)` }} />
                        {/* <input type="range" className='progress' step="1" min="0" max="100" value={rangeValue} style={{ background: `linear-gradient(to right, #BCFBE4 0%, #BCFBE4 ${rangeValue}%, #676767 ${rangeValue}%, #676767 100%)` }} onChange={(e) => handleRangeChange(e)} /> */}
                    </div>
                    <input type="number"
                        autoFocus
                        name='current_age'
                        value={allData?.profile_data?.current_age}
                        onChange={handleInputChange}
                        className={`py-[9px] border text-accent-green border-accent-bright-green px-4 rounded-2xl font-normal font-Work_Sans w-[60px] text-xs input-border-none bg-transparent focus:outline-none focus:ring-1 ring-accent-green  focus:text-accent-green focus:border-accent-bright-green focus:py-[9px]`}
                    />
                </div>
                <div className='flex justify-between'>
                    <p className='text-grey-3'>Plan Till Age</p>
                    <input type="number"
                        autoFocus
                        onChange={handleInputChange}
                        name='living_age'
                        value={allData?.profile_data?.living_age}
                        className="py-[9px] text-accent-green px-4 rounded-2xl font-normal font-Work_Sans w-[60px] text-xs input-border-none bg-transparent" style={{ background: "rgba(220, 220, 220, 0.10)" }}
                    />
                </div>
                <div className='flex justify-between'>
                    <p className='text-grey-3'>Any Financial Dependents?</p>
                    <div className="bg-grey-1 px-3 py-[5px] rounded-2xl border border-accent-bright-green" style={{ background: 'linear-gradient(184deg, rgba(24, 33, 50, 0.40) 2.7%, rgba(24, 34, 51, 0.40) 96.07%' }}>
                        <select name="any_financial_dependents" id="" className='w-[60px] text-white  text-lg input-border-none bg-transparent' defaultValue={allData?.profile_data?.any_financial_dependents} onChange={handleInputChange}>
                            <option className="text-white  text-lg input-border-none bg-dark-blue" value={true}>Yes</option>
                            <option className="text-white  text-lg input-border-none bg-dark-blue" value={false}>No</option>
                        </select>
                    </div>
                </div>
            </div>
        </RangePickerCards>
    )
}

export default PersonalAssumption
