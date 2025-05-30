import React, { useState } from 'react'
import login_signup_svg1 from '../../assets/images/login-signup-svg1.png'
import login_signup_svg2 from '../../assets/images/login-signup-svg2.png'
import { Link } from 'react-router-dom'
import OrLine from '../signin/OrLine';
import SocialAcountMob from '../signin/SocialAcountMob';
import { postWithoutAuth, saveDetails } from '../../pages/destop_L1/server';

const ForgetPassword = () => {
    const [email, setemail] = useState("");
    const resetPassword = (e) => {
        e.preventDefault();
        postWithoutAuth("reset_password", { email }, (success) => {
            console.log(success)
        }, (error) => {
            console.log(error)
        })
    }
    return (
        <section className="login-sugnup-bg isolate flex items-center justify-center h-screen bg-opacity-90 px-6 relative">
             <div className='w-full h-full absolute inset-0 image-gradient opacity-[40%] md:opacity-100 ' ></div>
            <div className='w-[415px] max-w-full flex flex-col md:justify-center md-item-center min-h-screen md:min-h-auto relative z-20'>
                <h1 className="login-singup-heading mt-20 md:mt-0 mb-[15px] block md:hidden"><span>Welcome to </span> RapidFIRE</h1>
                <h1 className="login-singup-heading md:mt-0 mb-[15px] hidden md:block" style={{ textAlign: "left" }}>Forgot Password?</h1>

                <h2 className='login-signup-mob-heading text-center md:hidden mt-auto' style={{ marginBottom: "0" }}>Forgot Password?</h2>

                <p className='login-signup-desc  max-w-[73%] md:max-w-[100%]'>No worries, we will send you Reset Instructions</p>

                <form className="mt-7 md:mt-[33px]" onSubmit={resetPassword}>
                    <div className='px-5 md:px-0'>

                        <div className='px-5 md:px-0 mt-4'>
                            <label for="email" className="login-signup-label">Email Address</label>
                            <input type="email" name="email" id="email" className="login-signup-input w-full input-with-inner-shadow" placeholder="name@company.com" required={true} onChange={(e) => setemail(e.target.value)} />
                        </div>

                        <button type="submit" className="theme-button w-full mt-[30px] md:mt-[38px]" >
                            Reset Password
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

    )
}

export default ForgetPassword
