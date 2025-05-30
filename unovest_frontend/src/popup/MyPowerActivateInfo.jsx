import React, { useState, useEffect, useRef } from 'react';
import { rewarddiamond, filter } from "../../src/assets/Icons";
import { useSelector } from 'react-redux';

function MyPowerActivateInfo({ onClose, ActivateMyPowerPopUp }) {
    const modalRef = useRef(null);
    const refferalDetails = useSelector((state) => state?.Card_inputs?.refferal_user)
    const userdetails = JSON.parse(localStorage.getItem('userdetails'));

    useEffect(() => {
        const handleClickOutsideModal = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose(); // Close the modal if click is outside
            }
        };

        document.addEventListener('mousedown', handleClickOutsideModal);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideModal);
        };
    }, [onClose]);

    return (
        <>
            <div className="justify-end items-end flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className=" relative w-auto my-6 max-w-4xl pe-5 bottom-20 right-48" ref={modalRef}>
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                        <div className='p-6 bg-emerald-100 m-auto rounded-xl w-[21rem] mt-2'>
                            <p className='font-Montserrat font-medium text-base text-gray-700 pb-8'>Now is the time to use your coins to activate <span className='font-extrabold text-lg'>myPowers</span>, which will open a world of possibilities with your money.</p>
                            <p className='font-Montserrat font-medium text-base text-gray-700 pb-6'>Here you can make adjustments to your inputs, and see live changes to your MoneyPath in order to improve your financial health!</p>
                            <div className='flex gap-4 justify-between pb-4'>
                                <div>
                                    <button className='flex items-center justify-center w-[8.688rem] h-[2.25] bg-blue-100 rounded-[1.625rem] '><img src={rewarddiamond} alt="" className="w-9 h-9" /><span className='font-Montserrat font-extrabold text-base text-sky-950'>{refferalDetails?.coins || 0}</span></button>
                                    <p className='font-normal font-Montserrat text-xs text-center italic pt-1 text-gray-700'>Current Balance</p>
                                </div>
                                <div>
                                    <button className='flex items-center justify-center w-[8.688rem] h-[2.25] bg-gray-700 rounded-[1.625rem]'><img src={rewarddiamond} alt="" className="w-9 h-9" /><span className='font-Montserrat font-extrabold text-base text-amber-600'>{userdetails.coinmaster[8]?.coins}</span></button>
                                    <p className='font-normal font-Montserrat text-xs text-center italic pt-1 text-gray-700'>To activate myPowers</p>
                                </div>
                            </div>
                            <button onClick={ActivateMyPowerPopUp} className='w-[17.5rem] rounded-[1.875rem] py-3 px-8 flex font-Montserrat font-extrabold text-base items-center justify-center ' style={{ background: 'linear-gradient(270deg, #FF5151 0%, #FFD84C 100%)' }}>Activate <span className='font-Montserrat font-normal italic text-sm ps-2'>my</span>Powers <img src={filter} className='ps-3' /></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyPowerActivateInfo;
