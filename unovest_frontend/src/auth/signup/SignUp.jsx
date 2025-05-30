import React, { useEffect, useState } from 'react'
import { socialSignIn, userSignUp } from '../Server';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Card_input from '../../components/quize-card/Card_input';
import CheckCard from '../../components/quize-card/CheckCard';
import RoundedBtnWithoutArrow from '../../components/RoundedBtnWithoutArrow';


import { login_signup_checked, login_signup_uncheck_img } from '../../assets/Icons';

import { FiEye, FiEyeOff } from "react-icons/fi";

import login_signup_svg1 from '../../assets/images/login-signup-svg1.png'
import login_signup_svg2 from '../../assets/images/login-signup-svg2.png'
import OrLine from '../signin/OrLine';
import SocialAccountDesktop from '../signin/SocialAccountDesktop';
import SocialAcountMob from '../signin/SocialAcountMob';
import validator from 'validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userCoinMaster } from '../../pages/destop_L1/server';
import { useDispatch, useSelector } from 'react-redux';
import { updateCradInputs } from '../../redux/slices/Card_Inputs';
import { introductors, myPowerExpiry } from '../../redux/slices/Page_Data';
import { updateStatisticalData } from '../../redux/slices/Statistical_Data';

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const page_data = useSelector((state) => state.Page_Data);
    const [searchParams] = useSearchParams();
    console.log(searchParams.get('refree'),searchParams.size,"params");
    const [UserInputs, setUserInputs] = useState({ first_name: "", last_name:"",email: "", password: "", confirm_password: "", user_account_type_id: 1, invited_referral_code: "", remember: false });
    const [err, seterr] = useState({ emailErr: false, passwordErr: false,first_name: false, last_name: false, confirm_passwordErr: "", user_account_type_idErr: "", invited_referral_codeErr: "" });
    const [checked, setchecked] = useState(false);
    const [isValid, setisValid] = useState(false);
    const [passErr, setpassErr] = useState("");
    const [remember, setRemember] = useState(false);
    const [termsError, setTermsError] = useState(false);
    const [referralCode, setReferralCode] = useState(null);
    const [ profile, setProfile ] = useState([]);

    // const termsCondiInputChange = () => {
    //   setRemember(!remember);
    //   // You can perform additional actions if needed
    // };

    useEffect(() =>{
        let codeIsAvailable = localStorage.getItem('userRefferal');
        if(codeIsAvailable){
            setReferralCode(codeIsAvailable);
        }

        if(searchParams?.size > 0){
            const refferalId = searchParams.get('refree');
            localStorage.setItem('userRefferal', refferalId);
            setReferralCode(refferalId)
        }

    },[])


    useEffect(() =>{
        if(profile.hasOwnProperty('email')){
            const signInPayload={
                email: profile.email,
                google_id: profile.id,
                user_account_type_id: 1,
                first_name: profile.given_name,
                last_name: profile.family_name,
                invited_referral_code: referralCode
            }
            socialSignIn(signInPayload,'social_signin',
            (success) =>{
                if(success.data.code === 200){
                    toast(success.data.status_message)
                    const user_details = success.data.message;
                    const user_details_with_numeric = {
                        ...user_details, user_data: {
                            ...user_details.user_data,
                            numerical_format: 'lakhs'
                        }
                    }
                   
                    dispatch(updateCradInputs({numerical_format: 'lakhs'}))
                    localStorage.setItem("userdetails", JSON.stringify(user_details_with_numeric))
                    // const userDetails = JSON.parse(localStorage.getItem('userdetails'));
                  
                    dispatch(updateStatisticalData({numerical_format: 'lakhs'}))
                    dispatch(introductors({dashboardIntroductor: true, moneyPathIntroductor: true}))
                      //-----------------------coin master for feteching coins-----------------------//
                        userCoinMaster((success) => {
                            if (success.data.code == 200) {
                                const userdetails = JSON.parse(localStorage.getItem('userdetails'));
                                if (userdetails !== null) {
                                    const coinmasterUpdated = { ...userdetails, coinmaster: success.data.message }
                                    localStorage.setItem('userdetails', JSON.stringify(coinmasterUpdated))
                                } else {
                                    console.log('null');
                                }
                            }
                        }, (error) => {
                            console.log(error.data);
                        })

                        // dispatch(myPowerExpiry({
                        //     is_expired: success.data.message.user_data.is_expired, 
                        //     activate_my_power_expiry: success.data.message.user_data.activate_my_power_expiry,
                        //     is_activated_my_power: true,
                        // }))
            
                    if (success.data.message?.user_data?.login_form_number == null) {
                        setTimeout(() => {
                        navigate("/level-1",{replace:true});
                        }, 2000);
                        timeoutnavigator();
                    } else if(page_data?.is_activated_my_power === true ){
                        setTimeout(() => {
                            navigate("/level-1/quiz/result/insides/my-power/");
                        }, 2000);
                        timeoutnavigator();
                    } else if (success.data.message?.user_data?.login_form_number == 6) {
                        setTimeout(() => {
                            navigate("/level-1/quiz/result",{replace:true});
                        }, 2000);
                        // timeoutnavigator();
                    }  else {
                        setTimeout(() => {
                        navigate('/level-1/quiz',{replace:true})
                        }, 2000);
                        timeoutnavigator();
                    }
                } else{
                    toast(success.data.status_message)
                    // alert(success.data.message)
                    navigate("/login");
                }
            },(error) =>{
                console.log(error);
            })
        }
    },[profile])

    const validate = (value) => {
        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setisValid(true)
            setpassErr("Strong password")
        } else {
            setisValid(false)
            setpassErr("Weak Password")
        }
    }

    const inputChange = (e) => {
        let data = { ...UserInputs };
        data[e.target.name] = e.target.value;
        setUserInputs(data);
        if (e.target.name == "password") {
            // setisValid(/^[a-zA-Z0-9]+$/.test(e.target.value))
            validate(e.target.value)
            if (e.target.value.length == 0) {
                setpassErr("")
            }
        }
    }

    console.log(referralCode,"referralCode");
    console.log(isValid)

    const signup = () => {
        const data = {
            email: UserInputs.email,
            first_name: UserInputs.first_name,
            last_name: UserInputs.last_name,
            password: UserInputs.password,
            confirm_password: UserInputs.password,
            user_account_type_id: 1,
            invited_referral_code: referralCode
            // invited_referral_code: UserInputs.invited_referral_code == "" ? null : UserInputs.invited_referral_code
        }

        if (isValid) {
            if(UserInputs.remember){
                userSignUp(data, (success) => {
                    if (success.data.code == 200) {
                        toast(success.data.status_message)
                        const user_details = success.data.message;
                        const updatedUserDetails = {
                            ...user_details, user_data: {
                                ...user_details.user_data,
                                first_name: UserInputs.first_name,
                                last_name: UserInputs.last_name,
                                numerical_format: 'lakhs'
                            }
                        }
                        dispatch(updateCradInputs({numerical_format: 'lakhs'}))
                        dispatch(introductors({dashboardIntroductor: true, moneyPathIntroductor: true}))
                        localStorage.setItem("userdetails", JSON.stringify(updatedUserDetails))
                        dispatch(updateStatisticalData({numerical_format: 'lakhs'}))
                        //-----------------------coin master for feteching coins-----------------------//
                        userCoinMaster((success) => {
                            if (success.data.code == 200) {
                                const userdetails = JSON.parse(localStorage.getItem('userdetails'));
                                if (userdetails !== null) {
                                    const coinmasterUpdated = { ...userdetails, coinmaster: success.data.message }
                                    localStorage.setItem('userdetails',  JSON.stringify(coinmasterUpdated))
                                } else {
                                    console.log('null');
                                }
                            }
                        }, (error) => {
                            console.log(error.data);
                        })
                        
                        // dispatch(myPowerExpiry({
                        //     is_expired: success.data.message.user_data.is_expired, 
                        //     activate_my_power_expiry: success.data.message.user_data.activate_my_power_expiry,
                        //     is_activated_my_power: success.data.message.user_data.is_activated_my_power,
                        // }))

                        if (success.data.message?.user_data?.login_form_number == null) {
                            setTimeout(() => {
                                navigate("/level-1");
                            }, 2000);
                        } else if (success.data.message?.user_data?.login_form_number == 6) {
                            setTimeout(() => {
                                navigate("/level-1/quiz/result");
                            }, 2000);
                        } else {
                            setTimeout(() => {
                                navigate('/level-1/quiz')
                            }, 2000);
                        }
                    } else {
                        toast(success.data.status_message)
                    }
                }), (error) => {
                    console.log(error);
                    toast(success.data.status_message)
                }
            }else{
                setTermsError(true);
            }
        }
    }

    const handleChecked = (e) => {
        if (e.target.checked == true) {
            setchecked(true)
        } else {
            setchecked(false)
        }
    }

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const termsCondiInputChange = (e) => {
        let data = { ...UserInputs };
        data[e.target.name] = e.target.checked;
        setUserInputs(data);
        if(e.target.checked){
            setTermsError(false);
        }
    }

    return (
        <section className="login-sugnup-bg isolate flex items-center justify-center bg-opacity-90 px-6 pb-5 md:pb-[89px] relative">
            <div className='w-full h-full absolute inset-0 image-gradient opacity-[40%] md:opacity-100 '></div>
            <div className='w-full'>
                <h1 className="login-singup-heading mt-[81px] md:mt-0 mb-[72px]  md:mb-[50px] relative"><span>Welcome  to </span> RapidFIRE</h1>

                <div className='flex flex-wrap items-center md:flex-nowrap justify-center z-10 relative'>
                    <div className='md:pe-[50px] md:border-e border-slate-300 md:py-[30px] h-max order-3 md:order-1 md:w-1/2 md:flex justify-end'>
                        <div>
                            <p className='login-signup-desc'>Sign Up with your social accounts</p>
                            <SocialAccountDesktop setProfile={setProfile}/>
                            <SocialAcountMob setProfile={setProfile}/>

                            <Link to="/" className="text-white text-lg font-extrabold font-['Montserrat'] underline underline-offset-4  text-center mt-[22px] block md:hidden">Sign In</Link>
                        </div>
                    </div>

                    <OrLine />

                    <div className='signup md:ps-[50px] order-1 md:order-3 md:w-1/2'>
                        <h3 className='login-signup-mob-heading px-2 ms-5 md:px-0'>Sign Up</h3>


                        <div className="space-y-4 md:space-y-7" >
                            <div className='px-2 md:px-0'>
                                <div className='px-5 md:px-0'>
                                    <label for="first_name" className="login-signup-label">First Name</label>
                                    <input type="first_name" name="first_name" id="name" onChange={inputChange} className="login-signup-input w-full slg:w-[450px] capitalize input-with-inner-shadow " placeholder="First Name" required={true} />
                                </div>
                                <div className='px-5 md:px-0 mt-7'>
                                    <label for="last_name" className="login-signup-label">Last Name</label>
                                    <input type="last_name" name="last_name" id="name" onChange={inputChange} className="login-signup-input w-full slg:w-[450px] capitalize input-with-inner-shadow " placeholder="Last Name" required={true} />
                                </div>

                                <div className='px-5 md:px-0 mt-7'>
                                    <label for="email" className="login-signup-label">Email Address</label>
                                    <input type="email" name="email" id="email" onChange={inputChange} className="login-signup-input w-full slg:w-[450px] input-with-inner-shadow" placeholder="name@company.com" required={true} />
                                </div>
                                <div className='px-5 md:px-0 mt-7'>
                                    <label for="password" className="login-signup-label">Password</label>

                                    <div className='relative w-full lg:w-max'>
                                        <input
                                            type={passwordVisible ? 'text' : 'password'}
                                            name="password" id="password"
                                            onChange={inputChange}
                                            placeholder="Enter Password"
                                            className="login-signup-input w-full slg:w-[450px] input-with-inner-shadow"
                                            required={true} />

                                        <button type="button"
                                            onClick={togglePasswordVisibility}>

                                            {!passwordVisible ? <FiEyeOff className='absolute end-3 top-1/2 translate-y-[-50%] icon' size={"24"} stroke='#B5B5B5' onClick={togglePasswordVisibility} /> : <FiEye className='absolute end-3 top-1/2 translate-y-[-50%] icon' size={"24"} stroke='#B5B5B5' onClick={togglePasswordVisibility} />}
                                        </button>
                                    </div>
                                </div>
                                {passErr.length > 0 ? <p className={passErr == "Strong password" ? 'text-green-400 ms-5 md:ms-0' : 'text-red-400 ms-5 md:ms-0'}>{passErr}</p> : null}
                                <div className='md:hidden mt-3 ms-6'>
                                      <div className='relative z-20 lg:flex lg:flex-col md:flex items-center justify-center'>
                                        <input className='hidden' type="checkbox" name='remember' id='signup-terms-condition'
                                            defaultChecked={UserInputs.remember} onChange={termsCondiInputChange}
                                        />
                                        <label htmlFor="signup-terms-condition" className='flex items-center gap-3'>
                                            {UserInputs.remember ? <img src={login_signup_checked} alt="" /> : <img src={login_signup_uncheck_img} alt="login_signup_uncheck" style={{ width: "20px", height: "20px" }} />}
                                            <div>
                                                <span className='text-white text-xs font-normal font-["Montserrat"] leading-[18.48px]'>I agree with RapidFIRE’s </span>
                                                <Link to='/terms-condition' className='text-white text-sm font-medium font-["Montserrat"] leading-[21.12px]'> Terms & Conditions</Link>
                                            </div>
                                        </label>
                                        {termsError && (
                                            <div className='text-[10px] text-orange pt-2 font-semibold italic'>
                                                * You must agree with the terms and conditions
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <button type="submit" onClick={signup} className="theme-button max-md:w-full w-[301px] mx-auto mt-4 md:mt-3 md:hidden">
                                    Sign Up
                                </button>


                            </div>
                        </div>
                    </div>

                </div>

                <div className='relative z-20 hidden lg:flex lg:flex-col md:flex items-center justify-center mt-[57px] '>
                    {/* <input type="checkbox" checked={true} id="signup-terms-condition" className='me-4 h-5 w-[22px] relative appearance-none before:border-2 before:border-[#0F3A4D] checked:bg-dark before:absolute before:top-1/2 before:translate-y-[-50%] before:h-5 before:w-[22px] before:bg-white before:rounded-full checked:before:bg-[#6ee7b7]' /> */}
                    <input className='hidden' type="checkbox" name='remember' id='signup-terms-condition'
                        defaultChecked={UserInputs.remember} onChange={termsCondiInputChange}
                    />
                    <label htmlFor="signup-terms-condition" className='flex items-center gap-3'>
                        {UserInputs.remember ? <img src={login_signup_checked} alt="" /> : <img src={login_signup_uncheck_img} alt="login_signup_uncheck" style={{ width: "20px", height: "20px" }} />}
                        <span className='text-white text-sm font-normal font-["Montserrat"] leading-[18.48px]'>I agree with RapidFIRE’s </span>
                        <Link to='/terms-condition' className='text-white text-[18px] font-medium font-["Montserrat"] leading-[21.12px]'> Terms & Conditions</Link>
                    </label>
                    {termsError && (
                    <div className='text-sm text-orange pt-2 font-semibold italic'>
                        * You must agree with the terms and conditions
                    </div>
                )}
                </div>
                

                <div className='hidden md:flex flex-wrap items-center justify-center gap-3 md:gap-8 mt-[25px] z-10 relative '>
                    <p className="w-full md:w-auto">
                        <button to="/" className="theme-button block w-full md:w-[199px]" onClick={signup}>Sign Up <span className='sm:hidden'>With Email</span></button>
                    </p>
                    <Link to="/" className="theme-border-btn w-full md:w-[199px]" >
                        Sign In
                    </Link>
                </div>

                <div className='flex items-center justify-center mt-4 md:hidden text-white gap-1 relative'>
                    <span className=' text-sm font-normal font-["Montserrat"] leading-[18.48px]'> RapidFIRE’s </span>
                    <Link to="/terms-condition" className="text-base font-medium font-['Montserrat'] leading-[21.12px]"> Terms & Conditions</Link>
                </div>

            </div>
            <div className='absolute bottom-0 w-full z-0 hidden md:block'>
                <img src={login_signup_svg1} alt="" className='absolute bottom-0 w-full' />
                <img src={login_signup_svg2} alt="" className='absolute bottom-0 w-full' />
            </div>

            <ToastContainer hideProgressBar toastStyle={{background:"#BCFBE4", color:"#0F3A4D", fontFamily:"Montserrat"}}/>
        </section>
    )
}

export default SignUp
