import React, { useEffect, useState } from 'react'
import { userSignIn } from '../Server';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { login_signup_checked, login_signup_uncheck, login_signup_uncheck_img } from '../../assets/Icons';
import { FiEye, FiEyeOff } from "react-icons/fi";
import login_signup_svg1 from '../../assets/images/login-signup-svg1.png'
import login_signup_svg2 from '../../assets/images/login-signup-svg2.png'
import OrLine from './../signin/OrLine';
import SocialAccountDesktop from './../signin/SocialAccountDesktop';
import SocialAcountMob from './../signin/SocialAcountMob';
import { getData } from '../../pages/destop_L1/server';
import axios from 'axios'
import validator from 'validator'
import { BACKENDURL } from '../../Variable';
const SetNewPassword = () => {
    const params = useParams();
    console.log(params, "params")
    const [UserInputs, setUserInputs] = useState({ password: "", code: "" });
    const navigate = useNavigate();

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isValid, setisValid] = useState(false);
    const [passErr, setpassErr] = useState("");

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

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
            // const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
            // const isValidPassword = alphanumericRegex.test(e.target.value);
            // setisValid(isValidPassword);
            validate(e.target.value)
            if (e.target.value.length == 0) {
                setpassErr("")
            }
        }
    }

    console.log(isValid)
    const reset = () => {
        if (isValid) {
            axios.post(`${BACKENDURL}set_password/`, UserInputs).then((resp) => {
                console.log(resp)
                if (resp.data.code == 200) {
                    localStorage.setItem("userdetails", JSON.stringify(resp.data.message))
                    if (resp.data.message?.user_data?.login_form_number == null) {
                        navigate("/level-1");
                    } else if (resp.data.message?.user_data?.login_form_number == 6) {
                        navigate("/level-1/quiz/result");
                    } else {
                        navigate('/level-1/quiz')
                    }
                } else {
                    alert(resp.data.message)
                    navigate("/login");
                }
            }, (error) => {
                console.log(error.response)
            })
        } else {
            alert("hi")
        }
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const codeParam = urlParams.get('code');
        console.log('Code:', codeParam);
        let data = { ...UserInputs };
        data["code"] = codeParam;
        setUserInputs(data);
    }, []);



    return (
        <section className="login-sugnup-bg isolate flex items-center justify-center h-screen bg-opacity-90 px-6">
            <div className='w-full'>
                <h1 className="login-singup-heading mt-[81px] md:mt-0 mb-[72px]  md:mb-[50px]"><span>Welcome to </span> RapidFIRE</h1>

                <div className="flex justify-center">
                    <form className="" onSubmit={reset}>
                        <div className='px-5 md:px-0'>
                            <div className='mb-4 md:mb-7'>
                                <label for="password" className="login-signup-label">New Password</label>
                                <div className='relative w-max'>
                                    <input
                                        type={passwordVisible ? 'text' : 'password'}
                                        // type={'text'}
                                        name="password" id="password"
                                        onChange={inputChange}
                                        placeholder="********"
                                        className="login-signup-input w-full slg:w-[415px]"
                                        required={true}
                                        // value={passwordVisible ? UserInputs?.password.replace(/./g, '*') : UserInputs?.password}
                                        value={passwordVisible ? UserInputs?.password : UserInputs?.password.replace(/./g, '*')}
                                    />
                                    <button type="button" onClick={togglePasswordVisibility}>
                                        {!passwordVisible ? <FiEyeOff className='absolute end-3 top-1/2 translate-y-[-50%] hidden md:block' size={"24"} stroke='#B5B5B5' onClick={togglePasswordVisibility} /> : <FiEye className='absolute end-3 top-1/2 translate-y-[-50%] hidden md:block' size={"24"} stroke='#B5B5B5' onClick={togglePasswordVisibility} />}
                                    </button>
                                </div>
                                {passErr.length > 0 ? <p className={passErr == "Strong password" ? 'text-green-400' : 'text-red-400'}>{passErr}</p> : null}
                            </div>

                            {/* <div>
                                <label for="password" className="login-signup-label">Confirm Password</label>
                                <div className='relative w-max'>
                                    <input
                                        // type={passwordVisible ? 'text' : 'password'}
                                        type={'text'}
                                        name="password" id="password"
                                        onChange={inputChange}
                                        placeholder="********"
                                        className="login-signup-input w-full slg:w-[415px]"
                                        required={true}
                                        // value={passwordVisible ? UserInputs?.password.replace(/./g, '*') : UserInputs?.password}
                                        value={passwordVisible ? UserInputs?.password : UserInputs?.password.replace(/./g, '*')}
                                    />
                                    <button type="button" onClick={togglePasswordVisibility}>
                                        {!passwordVisible ? <FiEyeOff className='absolute end-3 top-1/2 translate-y-[-50%] hidden md:block' size={"24"} stroke='#B5B5B5' onClick={togglePasswordVisibility} /> : <FiEye className='absolute end-3 top-1/2 translate-y-[-50%] hidden md:block' size={"24"} stroke='#B5B5B5' onClick={togglePasswordVisibility} />}
                                    </button>
                                </div>
                            </div> */}
                        </div>

                        <button type="submit" className="theme-button w-[301px] mt-3 md:hidden">
                            Reset
                        </button>
                    </form>
                </div>


                <div className='flex flex-wrap items-center justify-center gap-3 md:gap-8 mt-[25px] z-10 relative'>
                    <button type="button" className="theme-button w-full md:w-[199px]" onClick={reset}>
                        Reset
                    </button>
                </div>

                <div className='flex items-center justify-center mt-4 md:hidden text-white gap-1'>
                    <span className=' text-sm font-normal font-["Montserrat"] leading-[18.48px]'> RapidFIRE’s </span>
                    <Link to="/terms-condition" className="text-base font-medium font-['Montserrat'] leading-[21.12px]"> Terms & Conditions</Link>
                </div>

            </div>
            <div className='absolute bottom-0 w-full z-0 hidden md:block z-[-1]'>
                <img src={login_signup_svg1} alt="" className='absolute bottom-0 w-full' />
                <img src={login_signup_svg2} alt="" className='absolute bottom-0 w-full' />
            </div>

        </section>
    )
}

export default SetNewPassword
