import React from 'react'
import QuestionCard from '../../QuestionCard'

const FirstCardMobile = () => {
  return (
    <>
      <div style={{ boxShadow: "9px -28px 63px 42px black" }}>
        <QuestionCard number='1' label="Your Family's Annual Take-Home Income" />
      </div>
      <div className="flex flex-col gap-6 items-center">
        <div className='flex flex-col items-center justify-center'>
          <p className='font-Montserrat text-white text-sm'>Enter Annual Income <br />
            (After Tax)</p>
          <div className="flex gap-2 items-center">
            <p className='font-Montserrat text-white text-sm'>₹</p>
            <input type="text" className='w-full px-4 py-3 font-medium input-border-none rounded-2xl ' style={{ boxShadow: "2px 2px 4px 0px rgba(0, 0, 0, 0.50) inset" }} />
          </div>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <p className='font-Montserrat text-white text-sm'>Average Yearly Growth Rate</p>
          <div className="flex gap-2 items-center">
            <p className='font-Montserrat text-white text-sm'>%</p>
            <input type="text" className='w-full px-4 py-3 font-medium input-border-none rounded-2xl ' style={{ boxShadow: "2px 2px 4px 0px rgba(0, 0, 0, 0.50) inset" }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default FirstCardMobile
