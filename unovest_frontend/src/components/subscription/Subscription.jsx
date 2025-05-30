import React, { useState } from 'react'
import { circle, levelMeter, premium, visa } from '../../assets/images'
import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'
import PremiumButton from './PremiumButton'
import Menubar from '../Menubar'

const Subscription = () => {
    const [date, setdate] = useState(["24 March 2020", "24 March 2020", "24 March 2020", "24 March 2020", "24 March 2020", "24 March 2020"],)
    const [amount, setamount] = useState(["₹1060", 500, "₹1060", "₹1060", 1000, "₹1060",])
    const [method, setmethod] = useState(["Visa 4587", "Coins", "Visa 4587", "Visa 4587", "Coins", "Visa 4587",])
    const [access, setaccess] = useState(["1 Week", "1 Week", "1 Week", "2 Weeks", "1 Day", "1 Week"])
    console.log(useState);
    const handleClick = () => {
        alert('button')
    }
    return (
        <>
       <Menubar/>
        <div className='w-full'>
            <div className='container  flex pt-20 gap-6 w-full'>
                <div className=' rounded-3xl  p-8 bg-slate-700 w-1/2 '>
                    <h2 className='font font-black text-white font text-[32px] Montserrat  pb-6 '>Plan Details</h2>
                    <div className='flex gap-x-12'>
                        <div>
                            <h3 className='text-xl font-medium text-slate-100 Montserrat pb-1 '>Current Plan</h3>
                            <div className='flex rounded-lg justify-center items-center bg-slate-600 p-3  '>
                                <img src={levelMeter}></img>
                                <h3 className='font-bold text-2xl text-[#67EAB3] Montserrat'>Basecamp</h3>
                            </div>
                        </div>
                        <div>
                            <h3 className='text-xl font-medium text-slate-100 Montserrat'>Member Since</h3>
                            <p className='font-extrabold text-[28px] text-slate-50 Montserrat'>2022</p>
                        </div>
                    </div>
                    {/* --------------  button component   ----------- */}
                    
                    <PremiumButton onClick={handleClick}
                        label="Upgrade To Summit"
                        type="button"
                        className="my-12" />

                    <h2 className='font font-black text-white font text-[32px] Montserrat pb-4 '>Summit Benefits</h2>
                    <div className='flex justify-between '>
                        <div className='items-center w-[150px]'>
                            <img className='w-[100%]' src={circle}></img>
                            <p className='text-lg font-semibold text-slate-100 Montserrat text-center max-w-32 pt-4'>Add more details</p>
                        </div>
                        <div className='items-center w-[150px]'>
                            <img className='w-[100%]' src={circle}></img>
                            <p className='text-lg font-semibold text-slate-100 Montserrat text-center max-w-40 pt-4'>Compare What-IF moneypaths</p>
                        </div>
                        <div className='items-center w-[150px]'>
                            <img className='w-[100%]' src={circle}></img>
                            <p className='text-lg font-semibold text-slate-100 Montserrat text-center max-w-40 pt-4'>get regular alerts on paying higher interest rates</p>
                        </div>
                    </div>
                </div>
                {/* -------------------------------------- */}
                <div className='  rounded-3xl bg-slate-700 p-6 pl-10 pr-16 w-1/2'>
                    <h2 className='font-black text-white text-[32px] font-Montserrat pl-3 pb-6'>Billing Details</h2>
                    <div className='flex justify-between'>
                        <h3 className='text-xl font-medium text-slate-100 Montserrat pb-1 pl-3'>Payment Method</h3>
                        <Link className='text-xl font-medium text-[#67EAB3] Montserrat pb-1 pl-3' onClick={() => alert("link")}>Change</Link>
                    </div>
                    <div className='flex items-center gap-5 rounded-xl p-8 bg-slate-500 ml-3'>
                        <img src={visa}></img>
                        <div>
                            <h3 className='text-2xl font-black text-slate-50'>**** **** **** 2957</h3>
                            <h4 className='text-base font-extrabold text-slate-50'>Vipin Khandelwal</h4>
                            <p className='text-xs font-normal text-slate-50'>Expires: Dec 2028</p>
                        </div>
                    </div>
                    {/* ---------  form  ---------- */}
                    <form className='pl-3 py-10'>
                        <div className="sm:col-span-4">
                            <label className='text-xl font-medium text-slate-100 Montserrat pb-1 '>Billing Address</label>
                            <div className=''>
                                <input type="text" placeholder='54, Baner Road, Bharat Colony' className="block w-full rounded-[15px]  py-3 pl-3 placeholder:text-xl placeholder:text-[#0F3A4D] text-xl font-[Work_Sans]v  sm:leading-6 border-none focus:outline-none   " />
                            </div>
                        </div>
                        <div className="sm:col-span-4 mt-4">
                            <label className='text-xl font-medium text-slate-100 Montserrat pb-1'>ZipCode</label>
                            <div>
                                <input type="number" placeholder='349853' className="block w-[50%] rounded-[15px] shadow-inner py-3 pl-3 text-[#0F3A4D] placeholder:text-xl placeholder:text-[#0F3A4D] font-[Work_Sans]  sm:leading-6 border-none focus:outline-none" />
                            </div>
                        </div>
                        <div className="sm:col-span-4 mt-4">
                            <label className='text-xl font-medium text-slate-100 Montserrat pb-1 '>City</label>
                            <div>
                                <input type="text" placeholder='Jaipur' className="block w-[50%] rounded-[15px] shadow-inner py-3 pl-3 text-[#0F3A4D]   placeholder:text-[#0F3A4D] font-[Work_Sans]  sm:leading-6 placeholder:text-xl border-none focus:outline-none" />
                            </div>
                        </div>


                        <div class="sm:col-span-3 mt-4">
                            <label for="country" className='text-xl font-medium text-slate-100 Montserrat pb-1 '>Country</label>
                            <div className="">
                                <select id="country" name="country" autoComplete="country-name" className="block w-full rounded-[15px] text-xl border-0 py-3  shadow-inner font-[Work_Sans]  sm:max-w-xs  sm:leading-6 bg-slate-600 text-white pl-3 border-none focus:outline-none">
                                    <option className=' bg-slate-400 text-xl'>India</option>
                                    <option className=' bg-slate-400 text-xl'>Canada</option>
                                    <option className=' bg-slate-400 text-xl'>Mexico</option>
                                </select>
                            </div>

                        </div>

                    </form>
                </div>
            </div>

            <div className='container  mt-10 bg-slate-700 rounded-3xl py-6 px-16 '>
                <h2 className='font font-black text-white font text-[32px] font-[Montserrat] pl-3 pb-6 '>Transaction History</h2>
                <div className='flex justify-between'>
                    <div className='pl-3'>
                        <h3 className='text-2xl font-extrabold text-[#B5B5B5]'>Date</h3>
                        {date.map((item) => {
                            return (
                                <p className='text-[#B5B5B5] font-medium text-xl'>{item}</p>
                            )
                        })}
                    </div>
                    <div>
                        <h3 className='text-2xl font-extrabold text-white'>Amount</h3>
                        {amount.map((item) => {
                            return (
                                <p className='text-[#EFEFEF] font-medium text-xl'>{item}</p>
                            )
                        })}
                    </div>
                    <div>
                        <h3 className='text-2xl font-extrabold text-[#B5B5B5]'>Method</h3>
                        {method.map((item) => {
                            return (
                                <p className='text-[#B5B5B5] font-medium text-xl'>{item}</p>
                            )
                        })}
                    </div>
                    <div>
                        <h3 className='text-2xl font-extrabold text-[#B5B5B5]'>Access</h3>
                        {access.map((item) => {
                            return (
                                <p className='text-[#B5B5B5] font-medium text-xl'>{item}</p>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Subscription