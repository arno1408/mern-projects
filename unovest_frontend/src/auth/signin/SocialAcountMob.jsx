import React, { useEffect, useState } from 'react'
import {login_signup_facebook_mob, login_signup_google } from '../../assets/Icons';
import { useGoogleLogin } from '@react-oauth/google';
import { LoginSocialFacebook } from "reactjs-social-login";
import axios from 'axios';

// opacity to be removed in later stage, as this temporary for showcase user
const SocialAcountMob = ({setProfile}) => {
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
        <div className='flex justify-center gap-4 md:hidden mt-2'>
            <button onClick={() =>loginThroughGoogle()} className='bg-white rounded-[15px] p-2 w-10 h-10 flex items-center justify-center opacity-100 md:opacity-45'>
                <img src={login_signup_google} alt="" className='' />
            </button> 
            <LoginSocialFacebook
                appId="1776710672824490"
                onResolve={loginThroughFacebook}
                onReject={(error) => {
                    console.log("Facebook login failed:", error);
                }}
            >
                <button className='bg-white rounded-[15px] w-10 h-10 flex items-center justify-center opacity-100 md:opacity-45'>
                    <img src={login_signup_facebook_mob} alt="" className='rounded-full' />
                </button>
            </LoginSocialFacebook>            
         
        </div>
    )
}

export default SocialAcountMob
