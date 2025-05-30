import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import OrLine from '../signin/OrLine';
import SocialAcountMob from '../signin/SocialAcountMob';
import login_signup_svg1 from '../../assets/images/login-signup-svg1.png';
import login_signup_svg2 from '../../assets/images/login-signup-svg2.png';

function ResetPassword() {
    const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] = useState(false);

    const toggleOldPasswordVisibility = () => {
        setOldPasswordVisible(!oldPasswordVisible);
    };

    const toggleNewPasswordVisibility = () => {
        setNewPasswordVisible(!newPasswordVisible);
    };

    const toggleConfirmNewPasswordVisibility = () => {
        setConfirmNewPasswordVisible(!confirmNewPasswordVisible);
    };

    const inputChange = (e) => {

    };

    const resetPassword = (e) => {

    };

    return (
        <section className="login-sugnup-bg isolate flex items-center justify-center h-screen bg-opacity-90 px-6">
            <div className='w-[415px] max-w-full flex flex-col md:justify-center min-h-screen md:min-h-auto relative z-20'>
                <h1 className="login-singup-heading mt-20 md:mt-0 mb-[15px] block md:hidden"><span>Welcome to </span> RapidFIRE</h1>
                <h1 className="login-singup-heading md:mt-0 mb-[15px] hidden md:block" style={{ textAlign: "left" }}>Set New Password?</h1>

                <h2 className='login-signup-mob-heading text-center md:hidden mt-auto' style={{ marginBottom: "0" }}>Set New Password?</h2>

                <p className='login-signup-desc'>No worries, we will send you Password Reset Instructions</p>

                <form className="mt-7 md:mt-[33px]" onSubmit={resetPassword}>
                    <div className='px-5 md:px-0'>

                        <div className='px-5 md:px-0 mt-4'>
                            <label htmlFor="old-password" className="login-signup-label">Old Password</label>
                            <div className='relative w-max'>
                                <input
                                    type={oldPasswordVisible ? 'text' : 'password'}
                                    name="old-password" id="old-password"
                                    onChange={inputChange}
                                    placeholder="Enter Old Password"
                                    className="login-signup-input w-full slg:w-[450px]"
                                    required={true}
                                />
                                <button type="button" onClick={toggleOldPasswordVisibility}>
                                    {!oldPasswordVisible ? <FiEyeOff className='absolute end-3 top-1/2 translate-y-[-50%] hidden md:block' size={"24"} stroke='#B5B5B5' /> : <FiEye className='absolute end-3 top-1/2 translate-y-[-50%] hidden md:block' size={"24"} stroke='#B5B5B5' />}
                                </button>
                            </div>
                        </div>

                        <div className='px-5 md:px-0 mt-4'>
                            <label htmlFor="new-password" className="login-signup-label">New Password</label>
                            <div className='relative w-max'>
                                <input
                                    type={newPasswordVisible ? 'text' : 'password'}
                                    name="new-password" id="new-password"
                                    onChange={inputChange}
                                    placeholder="Enter New Password"
                                    className="login-signup-input w-full slg:w-[450px]"
                                    required={true}
                                />
                                <button type="button" onClick={toggleNewPasswordVisibility}>
                                    {!newPasswordVisible ? <FiEyeOff className='absolute end-3 top-1/2 translate-y-[-50%] hidden md:block' size={"24"} stroke='#B5B5B5' /> : <FiEye className='absolute end-3 top-1/2 translate-y-[-50%] hidden md:block' size={"24"} stroke='#B5B5B5' />}
                                </button>
                            </div>
                        </div>

                        <div className='px-5 md:px-0 mt-4'>
                            <label htmlFor="confirm-new-password" className="login-signup-label">Confirm New Password</label>
                            <div className='relative w-max'>
                                <input
                                    type={confirmNewPasswordVisible ? 'text' : 'password'}
                                    name="confirm-new-password" id="confirm-new-password"
                                    onChange={inputChange}
                                    placeholder="Confirm New Password"
                                    className="login-signup-input w-full slg:w-[450px]"
                                    required={true}
                                />
                                <button type="button" onClick={toggleConfirmNewPasswordVisibility}>
                                    {!confirmNewPasswordVisible ? <FiEyeOff className='absolute end-3 top-1/2 translate-y-[-50%] hidden md:block' size={"24"} stroke='#B5B5B5' /> : <FiEye className='absolute end-3 top-1/2 translate-y-[-50%] hidden md:block' size={"24"} stroke='#B5B5B5' />}
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="theme-button w-full mt-[30px] md:mt-[38px]" >
                            Change Password
                        </button>
                        <Link to="/" className='mt-4 block text-center text-white text-sm font-medium font-["Montserrat"] underline underline-offset-3 leading-[18.48px] '>Back to Sign In</Link>
                    </div>
                </form>

                <div className='text-center mb-9 md:hidden'>
                    <OrLine />
                    <p className='login-signup-desc'>Sign Up with your social accounts</p>
                    <SocialAcountMob />
                    <Link to="/" className="text-white text-lg font-extrabold font-['Montserrat'] underline underline-offset-4  text-center mt-[22px] block md:hidden">Sign In</Link>
                    <div className='flex items-center justify-center mt-4 md:hidden text-white gap-1'>
                        <span className=' text-sm font-normal font-["Montserrat"] leading-[18.48px]'> RapidFIRE’s </span>
                        <Link to="/terms-condition" className="text-base font-medium font-['Montserrat'] leading-[21.12px]"> Terms & Conditions</Link>
                    </div>
                </div>
            </div>
            <div className='absolute bottom-0 w-full z-0 hidden md:block'>
                <img src={login_signup_svg1} alt="" className='absolute bottom-0 w-full' />
                <img src={login_signup_svg2} alt="" className='absolute bottom-0 w-full' />
            </div>
        </section>
    );
}

export default ResetPassword;



