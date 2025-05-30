import React ,{ useState}from 'react'
import MyAccountDatePicker from './../pages/account/components/MyAccountDatePicker'
import { IoMdCloseCircle } from "react-icons/io";
import dayjs from 'dayjs';

function ExitReminder({forwardRef,selectedDate, onClose,onRemainderSet, handleDateChange}) {
  const minDate = dayjs();

  return (
    <>
      <div ref={forwardRef} className='w-[36rem] max-md:w-[20rem] bg-emerald-100 p-[3.75rem] max-md:p-[2rem] m-auto rounded-[2.25rem] mb-2 absolute top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 z-50'>
            <div className='absolute right-6 top-6 text-4xl max-md:text-2xl cursor-pointer text-grey-4' onClick={onClose}><IoMdCloseCircle/></div>
           <h2 className='font-Montserrat font-extrabold text-[1.75rem] max-md:text-lg text-gray-700 pb-6 max-md:pb-3'>Before you exit, setup a Reminder to revisit RapidFIRE</h2>
           <p className='font-Montserrat font-medium text-xl max-md:text-sm text-gray-500 pb-6 max-md:pb-3'>Set a date to checkin with your future progress and we will remind you!</p>
           <MyAccountDatePicker 
              ref={forwardRef}
              className={"max-md:w-[15rem]"}
              label={'Remind me on'} 
              classNameLabel={'text-left text-gray-500 max-md:text-sm max-md:text-left max-md:w-[15rem]'} 
              selectedDate={selectedDate} width={'22rem'} 
              popperWidth={'22rem'} 
              backgroundColor={'#7CA29D'} 
              handleDateChange={handleDateChange}
              minDate={minDate}
           />
            <button className='bg-transparent rounder py-2 px-8 max-md:px-7 rounded-[1.875rem] border-[0.063rem] border-[#435066] mt-6 max-md:mt-3 font-Montserrat font-semibold text-base max-md:text-sm' onClick={onRemainderSet}>Repeat Reminder</button>
      </div>
    </>
  )
}

export default ExitReminder
