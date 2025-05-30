import React, { useEffect, useState } from 'react'
import { socialSignIn, userSignIn } from '../Server';
import { Link, useNavigate,useParams } from 'react-router-dom';
import { login_signup_checked, login_signup_uncheck, login_signup_uncheck_img } from '../../assets/Icons';
import { FiEye, FiEyeOff } from "react-icons/fi";
import login_signup_svg1 from '../../assets/images/login-signup-svg1.png'
import login_signup_svg2 from '../../assets/images/login-signup-svg2.png'
import OrLine from './OrLine';
import SocialAccountDesktop from './SocialAccountDesktop';
import SocialAcountMob from './SocialAcountMob';
import { getData, userCoinMaster } from '../../pages/destop_L1/server';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './../../assets/css/main.scss'
import { updateCradInputs } from '../../redux/slices/Card_Inputs';
import { useDispatch, useSelector } from 'react-redux';
import { introductors, myPowerExpiry } from '../../redux/slices/Page_Data';
import { updateStatisticalData } from '../../redux/slices/Statistical_Data';

const SignIn = () => {
    const [UserInputs, setUserInputs] = useState({ email: "", password: "", remember: false });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const page_data = useSelector((state) => state.Page_Data);
    const params = useParams();

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [ profile, setProfile ] = useState([]);
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({
        message: ""
    });

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const passInputChange = (event) => {
        setPassword(event.target.value);
    };

    useEffect(() =>{
        if(params?.refferalId){
            const {refferalId} = params;
            localStorage.setItem('userRefferal', refferalId);
        }else{
            localStorage.setItem('userRefferal', null);
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
                invited_referral_code: "REF12345"
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

                       
                        dispatch(myPowerExpiry({
                            is_expired: success.data.message.user_data.is_expired, 
                            activate_my_power_expiry: success.data.message.user_data.activate_my_power_expiry,
                            is_activated_my_power: success.data.message.user_data.is_activated_my_power,
                        }))
                       
                    if (success.data.message?.user_data?.login_form_number == null) {
                        setTimeout(() => {
                        navigate("/level-1",{replace:true});
                        }, 2000);
                        timeoutnavigator();
                    } else if(success.data.message?.user_data?.is_activated_my_power === true ){
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


    const inputChange = (e) => {
        let data = { ...UserInputs };
        if(e.target.name !== "remember"){
            data[e.target.name] = e.target.value;
        }else{
            data[e.target.name] = e.target.checked;
        }
      
        setUserInputs(data);

        
    }


    const ToastWelcomeBack = () => {
        return (
         
            <div className="w-[300px] mr-4 md:mr-0 md:w-[500px]  rounded-xl bg-green-200 p-3 md:p-6">
              <h2 className="font-['Montserrat'] font-bold text-lg md:text-2xl text-[#384151]">Welcome Back!</h2>
              <p className="font-['Montserrat'] font-medium text-xs md:text-base text-[#384151] ">Continue filling in Basecamp details, You’re almost there!
                All your past inputs remain the same, but you can still change your answers by navigating back.</p>
            </div>
         
        )
      }
     
      const timeoutnavigator=()=>{
        setTimeout(() => {
            toast(<ToastWelcomeBack/>,{
                position: "top-left",
                className:'welcomeBack',  
                style: { background: 'none' , width:'516px',boxShadow:'none'},
                hideProgressBar:true                   
            })
            }, 3000);
      }

      console.log(profile,'data');
    const signin = (e) => {
        e.preventDefault();
        userSignIn(UserInputs, (success) => {
            if (success.data.code === 200) {
                toast(success.data.status_message)
                const user_details = success.data.message;
                const user_details_with_numeric = {
                    ...user_details, user_data: {
                        ...user_details.user_data,
                        numerical_format: 'lakhs'
                    }
                }
                
             

                dispatch(updateCradInputs({numerical_format: 'lakhs'}))
                //---for dashboard Introductor testing purpose we have kept this in sign in page------//
                //--- but we trigger it from signup page for opening it once in lifetime--------//
                // dispatch(introductors({dashboardIntroductor: true}))
                localStorage.setItem("userdetails", JSON.stringify(user_details_with_numeric))
                // const userDetails = JSON.parse(localStorage.getItem('userdetails'));
               
                dispatch(updateStatisticalData({numerical_format: 'lakhs'}))
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
                    
                 
                    dispatch(myPowerExpiry({
                        is_expired: success.data.message.user_data.is_expired, 
                        activate_my_power_expiry: success.data.message.user_data.activate_my_power_expiry,
                        is_activated_my_power: success.data.message.user_data.is_activated_my_power,
                    }))


                if (success.data.message?.user_data?.login_form_number == null) {
                    setTimeout(() => {
                    navigate("/level-1",{replace:true});
                    }, 2000);
                    timeoutnavigator();
                } else if(success.data.message?.user_data?.is_activated_my_power === true ){
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

            } else {
                toast(success.data.status_message)
                // alert(success.data.message)
                navigate("/login");
            }
        }, (error) => {
            toast(error.data.status_message)
            // console.log(error.response)
        })
    }

    return (
        <section className="login-sugnup-bg isolate flex items-center justify-center bg-opacity-90 px-6  pb-5 md:pb-[89px] relative">
            <div className='w-full h-full absolute inset-0 image-gradient opacity-[40%] md:opacity-100 '></div>
            <div className='w-full'>
                <h1 className="login-singup-heading mt-[81px] md:mt-0 mb-[72px] md:mb-[50px] relative"><span>Welcome to </span> RapidFIRE</h1>

                <div className='flex flex-wrap justify-center z-10 relative'>
                    <div className='md:pe-6 slg:pe-[50px] md:border-e border-slate-300 md:py-[30px] h-max order-3 md:order-1 md:w-1/2 md:flex justify-end'>
                        <div>
                            <p className='login-signup-desc'>Sign In with your social accounts</p>
                            <SocialAccountDesktop setProfile={setProfile}  />
                            <SocialAcountMob setProfile={setProfile} />

                            <Link to="/signup" className="text-white text-lg font-extrabold font-['Montserrat'] underline underline-offset-4  text-center mt-[22px] block md:hidden">Sign Up</Link>
                        </div>
                    </div>
                    <OrLine />
                    <div className='signup md:ps-6 slg:ps-[50px] pt-[0px] md:pt-[30px] max-sm:mx-3  order-1 md:order-3 w-full md:w-1/2'>
                        <h3 className='login-signup-mob-heading px-5 md:px-0'>Sign In</h3>
                        <form className="" onSubmit={signin}>
                            <div className='px-5 md:px-0'>
                                <div className='mb-4 md:mb-7'>
                                    <label for="email" className="login-signup-label">
                                        <span className='hidden md:block'>Email Address</span>
                                        <span className='block md:hidden'>Name or Email Address</span>
                                        </label>
                                    <input type="email" name="email" id="email" onChange={inputChange} className="login-signup-input w-full  text-['rgba(236, 236, 236, 0.75)'] slg:w-[415px] input-with-inner-shadow" placeholder="name@company.com" required={true} />
                                </div>
                                <div>
                                    <label for="password" className="login-signup-label">Password</label>
                                    <div className='relative slg:w-max'>
                                        <input
                                            type={passwordVisible ? 'text' : 'password'}
                                            // type={'text'}
                                            name="password" id="password"
                                            onChange={inputChange}
                                            placeholder="Enter Password"
                                            className="login-signup-input w-full slg:w-[415px] input-with-inner-shadow "
                                            required={true}
                                            // value={passwordVisible ? UserInputs?.password.replace(/./g, '*') : UserInputs?.password}
                                            // value={passwordVisible ?  : UserInputs?.password.replace(/./g, '*')}
                                            value={UserInputs?.password}
                                        />
                                        <button type="button" onClick={togglePasswordVisibility}>
                                            {!passwordVisible ? <FiEyeOff className='absolute end-3 top-1/2 translate-y-[-50%] icon' size={"24"} stroke='#B5B5B5' onClick={togglePasswordVisibility} /> : <FiEye className='absolute end-3 top-1/2 translate-y-[-50%] icon' size={"24"} stroke='#B5B5B5' onClick={togglePasswordVisibility} />}
                                        </button>
                                    </div>
                                </div>
                                <Link to="/forget-password" className="text-white text-sm font-medium font-['Montserrat'] underline leading-[18.48px] mt-7 md:mt-2 block">Forgot Password</Link>

                                <div className='mt-6 md:mt-9'>
                                    <input className='hidden' type="checkbox" name='remember' id='remember-me' defaultChecked={UserInputs.remember} onChange={inputChange} />

                                    <label htmlFor="remember-me" className='flex items-center gap-3 text-white text-sm font-normal font-["Montserrat"] leading-[18.48px]'>
                                        {UserInputs.remember ? <img src={login_signup_checked} alt="" /> : <img src={login_signup_uncheck_img} alt="login_signup_uncheck" style={{ width: "20px" ,height:"20px"}} />} Remember Me
                                    </label>
                                </div>
                            </div>

                            <button type="submit" className="theme-button w-fit max-md:w-full mx-auto md:w-[301px] mt-3 md:hidden">
                                Sign In
                            </button>
                        </form>
                    </div>

                </div>

                <div className='hidden md:flex flex-wrap items-center justify-center gap-3 md:gap-8 mt-[25px] z-10 relative'>
                    <p className="w-full md:w-auto">
                        <Link to="/signup" className="theme-border-btn block w-full md:w-[199px]">Sign Up <span className='sm:hidden'>With Email</span></Link>
                    </p>

                    <button type="button" className="theme-button w-full md:w-[199px]" onClick={signin}>
                        Sign In
                    </button>
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

export default SignIn
