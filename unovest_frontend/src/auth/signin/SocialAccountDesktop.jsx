import React, { useEffect, useState } from 'react'
import {login_signup_facebook, login_signup_google } from '../../assets/Icons';
import { useGoogleLogin  } from '@react-oauth/google';
import { LoginSocialFacebook } from "reactjs-social-login";
import axios from 'axios';

// opacity to be removed in later stage, as this temporary for showcase user
const SocialAccountDesktop = ({setProfile}) => {

    const [ user, setUser ] = useState([]);

    const loginThroughGoogle = useGoogleLogin({
        onError: (err) => console.log(err),
        onSuccess: (codeResponse ) => setUser(codeResponse )
    })

    const loginThroughFacebook = async (response) => {
        try {
          console.log("Response: ", response);
        } catch (error) {
          console.log("error: ", error);
        }
      };

    useEffect(
        () => {
            if (user.hasOwnProperty('access_token')) {
                axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );

    return (
        <div className='hidden md:block'>
            <LoginSocialFacebook
                appId="1776710672824490"
                onResolve={loginThroughFacebook}
                onReject={(error) => {
                    console.log("Facebook login failed:", error);
                }}
            >
                <button className='flex items-center bg-blue-600 rounded-[30px] md:rounded-[10px] gap-[15px] text-white  slg:text-xl font-bold font-["Helvetica"] px-6 py-[15px] w-full md:w-[300px] slg:w-[345px] mt-3 md:mt-[23px]'>
                    <img src={login_signup_facebook} alt="" className='rounded-full' />
                    Continue with Facebook
                </button>
            </LoginSocialFacebook>
            
            <button onClick={() =>loginThroughGoogle()} className='flex items-center bg-white rounded-[30px] md:rounded-[10px] gap-[15px] text-black
                text-opacity-50 slg:text-xl font-bold font-["Helvetica"] px-6 py-[15px] w-full md:w-[300px] slg:w-[345px] mt-[15px] md:mt-[23px]'>
                <img src={login_signup_google} alt="" className='' />
                Continue with Google
            </button>
           
        </div>
    )
}

export default SocialAccountDesktop
