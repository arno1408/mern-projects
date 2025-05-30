import React from 'react'
import MyAccountCards from './MyAccountCards'
import MyAccountHead from './MyAccountHead'
import { myAccountBtn, myAccountRightIcon } from '../../../assets/Icons'
import { visacard } from '../../../assets/images'
import MyAccountInput from './MyAccountInput'
import MyAccountSelect from './MyAccountSelect'

let Progressstepper = () => {
   
    return (
        <svg width="64" height="40" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_4944_7828)">
                <path d="M15.2444 29.6756H6C6 21.4311 10.3913 14.1845 17.0222 10.0293L21.8418 17.7109C17.8653 20.2828 15.2444 24.6814 15.2444 29.6756Z" fill="#435066" />
                <path d="M54 29.6756H44.7556C44.7556 24.9969 42.4553 20.8409 38.8952 18.2198L44.1626 10.8215C50.1268 15.0699 54 21.9327 54 29.6756Z" fill="#435066" />
                <path d="M30 6.32422C25.7382 6.32422 21.7358 7.40504 18.2667 9.30033L22.6182 17.2418C24.7894 16.0188 27.3107 15.3188 30 15.3188C33.0164 15.3188 35.8213 16.1994 38.1582 17.7109L42.9778 10.0293C39.2361 7.68461 34.7813 6.32422 30 6.32422Z" fill="#435066" />
                <path d="M15.2444 29.6756H6C6 21.4311 10.3913 14.1845 17.0222 10.0293L21.8418 17.7109C17.8653 20.2828 15.2444 24.6814 15.2444 29.6756Z" fill="#67EAB3" />
                <path d="M30 6.32422C25.7382 6.32422 21.7358 7.40504 18.2667 9.30033L22.6182 17.2418C24.7894 16.0188 27.3107 15.3188 30 15.3188C33.0164 15.3188 35.8213 16.1994 38.1582 17.7109L42.9778 10.0293C39.2361 7.68461 34.7813 6.32422 30 6.32422Z" fill="#67EAB3" />
            </g>
            <defs>
                <filter id="filter0_d_4944_7828" x="0" y="0.324219" width="64" height="39.3516" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="2" dy="2" />
                    <feGaussianBlur stdDeviation="4" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4944_7828" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4944_7828" result="shape" />
                </filter>
            </defs>
        </svg>
    )
}

function Subscription() {
    const country = ['ten', 'twenty', 'thirty', "forty"];
    const data = [
        { date: "24 March 2020", amount: "₹1060", method: "Visa 4587", access: "1 Week" },
        { date: "24 March 2020", amount: "500", method: "Coins", access: "1 Week" },
        { date: "24 March 2020", amount: "₹1060", method: "Visa 4587", access: "1 Week" },
        { date: "24 March 2020", amount: "₹1060", method: "Visa 4587", access: "2 Weeks" },
        { date: "24 March 2020", amount: "1000", method: "Coins", access: "1 Day" },
        { date: "24 March 2020", amount: "₹1060", method: "Visa 4587", access: "1 Week" }
    ];

    return (
        <>
            <div className='Subscripation-container'>
                <MyAccountCards className="flex-grow basis-1/2">
                    <MyAccountHead>Plan Details</MyAccountHead>

                    <div className='PlainDetails-container'>
                        <div className='max-md:flex  max-md:gap-16 max-md:items-center'>
                            <p className='my-account-title'>Current Plan</p>
                            <div className="Progressstepper-container" style={{ background: 'rgba(220, 220, 220, 0.10)' }} >
                                <Progressstepper />
                                <div className="Basecamp">
                                    Basecamp</div>
                            </div>
                        </div>

                        <div className='max-md:flex max-md:gap-16 max-md:items-center'>
                            <p className='my-account-title'>Member Since</p>
                            <h4 className="member-year">2022</h4>
                        </div>
                    </div>

                    <button className='upgradeSummit-btn'>
                        <img src={myAccountBtn} alt='' />
                        Upgrade to summit
                        <img src={myAccountRightIcon} alt='' className='xl:ms-auto max-lg:ms-auto' />

                    </button>

                    <MyAccountHead className="mt-12 max-md:mt-5 mb-[30px]">Summit Benefits</MyAccountHead>

                    <div className='flex flex-wrap xl:justify-between lg:justify-center max-md:justify-around gap-4'>
                        <div className=''>
                            <div className="Benefits-image" />
                            <p className='Benefits-text'>Add more details</p>
                        </div>
                        <div className=''>
                            <div className="Benefits-image" />
                            <p className='Benefits-text'>Compare What-IF moneypaths</p>
                        </div>
                        <div className='max-md:m-auto'>
                            <div className="Benefits-image" />
                            <p className='Benefits-text'>get regular alerts on paying higher interest rates</p>
                        </div>
                    </div>


                </MyAccountCards>

                <MyAccountCards className="flex-grow basis-1/2">
                    <MyAccountHead>Billing Details</MyAccountHead>

                    <div className='flex items-center justify-between mt-8 max-md:mt-4'>
                        <p className='my-account-title'>Payment Method</p>
                        <button className='text-emerald-300 text-opacity-60 text-base max-md:text-sm font-bold font-["Montserrat"] leading-[21.12px]'>Change</button>
                    </div>

                    <div className='Payment-container'>
                        <img src={visacard} alt="" className='max-md:w-28' />
                        <div className='flex flex-col gap-2'>
                            <h5 className='account-number'>**** **** **** 2957</h5>
                            <p className="text-gray-200 text-base max-md:text-sm font-extrabold font-['Montserrat'] leading-tight">Vipin Khandelwal</p>
                            <p className="text-gray-200 text-xs font-normal font-['Montserrat']">Expires: Dec 2028</p>
                        </div>
                    </div>

                    <div className='mt-[50px] max-md:mt-8 flex flex-col gap-2'>
                        <MyAccountInput disable={true} id="billing_address" label="Billing Address" type="text" placeholder="Billing Address" defaultValue="54, Baner Road, Bharat Colony" />
                        <MyAccountInput  disable={true} id="zipcode" label="Zipcode" type="text" placeholder="Zipcode" defaultValue="349853" className="mt-[22px] max-md:mt-0" />
                        <MyAccountInput  disable={true} id="billing_address" label="Billing Address" type="text" placeholder="Billing Address" defaultValue="54, Baner Road, Bharat Colony" />
                        <MyAccountSelect disable={true}  id="country" label="Country" options={country} />
                    </div>

                </MyAccountCards>

            </div>
            <MyAccountCards className="flex-grow  mt-12 max-md:my-5 px-24 max-md:px-0 py-12 m-auto max-md:mb-24 opacity-45">
                <MyAccountHead >Transaction History</MyAccountHead>

                <div className='mt-9 relative max-md:w-[270px] overflow-x-auto scrollbar-hide ' disable>
                  <table  className='w-full  text-left'>
                    <thead>
                        <tr className='text-[#B5B5B5] text-[28px] max-md:text-lg font-Montserrat font-extrabold'>
                            <th className='max-md:px-5'>Date</th>
                            <th className='text-[#EFEFEF] max-md:px-5'>Amount</th>
                            <th className='max-md:px-5'>Method</th>
                            <th className='max-md:px-5'>Access</th>
                        </tr>
                    </thead>
                    <tbody className='text-[#B5B5B5] font-Montserrat font-medium text-xl max-md:text-sm'>
                            {data.map((item, index) => (
                                <tr key={index} >
                                    <td className='max-md:px-5 text-nowrap'>{item.date}</td>
                                    <td className='text-[#EFEFEF] max-md:px-5'>{item.amount}</td>
                                    <td className='max-md:px-5'>{item.method}</td>
                                    <td className='max-md:px-5'>{item.access}</td>
                                </tr>
                            ))}
                    </tbody>
                  </table>
                </div>
            </MyAccountCards>
        </>
    )
}

export default Subscription
