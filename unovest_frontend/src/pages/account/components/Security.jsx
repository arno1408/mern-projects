import React, { useState } from 'react'
import MyAccountCards from './MyAccountCards'
import MyAccountHead from './MyAccountHead'
import MyAccountInput from './MyAccountInput'
import { FaRegCheckCircle  } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { updateDetailsWithoutId } from '../../destop_L1/server';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Security() {
    const [passwordVisible, setPasswordVisible] = useState({
        old_password: false,
        new_password: false,
        confirm_password: false,
    });
    const [password, setPassword] = useState({
        old_password: '',
        new_password: '',
        confirm_new_password: '',
    });

    const [validation, setvalidation] = useState({
        has15character: false,
        hasOneNumber: false,
        hasUpperLetter: false,
        hasSpecialChar: false,
        allPass: false,
        validationMessage: null
    });

    // toggle the password section based on name check
    const handleTogglePasswordVisibility = (type) => {
        let oldPass = false;
        let newPass = false;
        let confPass = false;
        if(type == 'old_password'){
            oldPass = !passwordVisible.old_password
        }else if(type == 'new_password'){
            newPass = !passwordVisible.new_password
        }else{
            confPass = !passwordVisible.confirm_password
        }
        setPasswordVisible({
            ...passwordVisible,
            old_password: oldPass,
            new_password: newPass,
            confirm_password: confPass,
        })
      };

    // valiation check for new password fields
    const newPasswordValidationCheck=(value)=>{
        const allpass = new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[@#$%])[A-Za-z\d@#$%]{9,15}$/);
        const hasUpperLetter = new RegExp(/(?=.*[A-Z])/).test(value);
        const hasOneNumber = new RegExp(/.*[0-9].*/).test(value);
        const hasSpecialChar = new RegExp(/(?=.*[@#$%])/).test(value);
        const has15character = new RegExp(/^.{9,15}$/).test(value);

        setvalidation({
            ...validation,
            has15character,
            hasOneNumber,
            hasSpecialChar,
            hasUpperLetter,
            allpass,
        })
        
    }

    console.log(validation.allPass,'yes');
    
    // handle the password change
    const handlePasswordChange=(e)=>{
        if(e.target.name == 'new_password'){
            newPasswordValidationCheck(e.target.value);
        } 
    
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
    }

    const passwordValidation=()=>{
        if(password.new_password !==  password.confirm_new_password){
             return true;
        }else if(password.old_password.trim().length <= 0){
             return true;
        }else if(password.confirm_new_password.trim().length <= 0){
             return true;
        }else if(password.old_password ===  password.new_password){
             return true;
        }
        return false;
    }

    // update password changes
    const updatePassword = async() =>{   
        const passwordPayload = {
            old_password: password.old_password,
            new_password: password.new_password,
            confirm_password: password.confirm_new_password,
        }   
        try {
            await updateDetailsWithoutId('change_password', passwordPayload, false,
                (success) => {
                    // handleAlertClick(success.data.message,'success')
                    if (success.data.code == 400) {
                        toast.warn(success.data.status_message)
                    } else {
                        toast.success(success.data.status_message)
                    }
                    setPassword({
                        old_password: '',
                        new_password: '',
                        confirm_new_password: '',
                    })

                },
                (error) => {
                    console.log(error);
                }
            )
        } catch (error) {

        }
        
      
    }

    return (
        <>
            <div className='flex gap-9 mt-[52px] max-lg:flex-col'>
                <MyAccountCards className="flex-grow">
                    <div className='flex flex-col gap-6 max-md:gap-3'>
                        <MyAccountHead className="leading-none mb-3">Password</MyAccountHead>
                        <MyAccountInput placeholder={'Old Password'} id="old_password" label="Old Password" classNameInput='md:w-full' value={password.old_password} onChangeHandler={handlePasswordChange} isInputWithIcon={true} togglePasswordVisibility={() =>handleTogglePasswordVisibility('old_password')} passwordVisible={passwordVisible.old_password} />
                        <MyAccountInput placeholder={'New Password'} id="new_password" label="New Password" classNameInput='md:w-full' value={password.new_password} onChangeHandler={handlePasswordChange} isInputWithIcon={true} togglePasswordVisibility={() =>handleTogglePasswordVisibility('new_password')} passwordVisible={passwordVisible.new_password} />

                        <ul className={`list-disc list-inside`}>
                            <li className={`${validation.has15character? 'list-none flex gap-1': ''} my-account-desc`}>{validation.has15character && <FaRegCheckCircle className='text-emerald-300'/>} Atleast 9-15 Characters</li>
                            <li className={`${validation.hasOneNumber? 'list-none flex gap-1': ''} my-account-desc`}>{validation.hasOneNumber && <FaRegCheckCircle className='text-emerald-300'/>}Atleast one Number</li>
                            <li className={`${validation.hasUpperLetter? 'list-none flex gap-1': ''} my-account-desc`}>{validation.hasUpperLetter && <FaRegCheckCircle className='text-emerald-300'/>}Atleast one Upper Case Letter</li>
                            <li className={`${validation.hasSpecialChar? 'list-none flex gap-1': ''} my-account-desc`}>{validation.hasSpecialChar && <FaRegCheckCircle className='text-emerald-300'/>}Atleast one Special Character @#$%</li>
                        </ul>

                        <MyAccountInput placeholder={'Confirm Password'} id="confirm_new_password" label="Confirm New Password" classNameInput='md:w-full' value={password.confirm_new_password} onChangeHandler={handlePasswordChange} isInputWithIcon={true} togglePasswordVisibility={() =>handleTogglePasswordVisibility('confirm_password')} passwordVisible={passwordVisible.confirm_password} />
                        <ul className={`list-disc list-inside`}>
                            <li className={`${!password.old_password || !password.new_password || !password.confirm_new_password ? 'flex gap-1' : 'hidden'} my-account-desc`}>{(!password.old_password || !password.new_password || !password.confirm_new_password) && <IoCloseCircle className='text-red-500 min-w-4' />} Please fill All the Fields!</li>
                            <li className={`${(!validation.has15character || !validation.hasOneNumber || !validation.hasUpperLetter || !validation.hasSpecialChar) ? 'flex gap-1' : 'hidden'} my-account-desc`}>{(!validation.has15character || !validation.hasOneNumber || !validation.hasUpperLetter || !validation.hasSpecialChar) && <IoCloseCircle className='text-red-500  min-w-4' />} Validation must be followed!</li>
                            <li className={`${password.new_password !== password.confirm_new_password ? 'flex gap-1' : 'hidden'} my-account-desc`}>{password.new_password !== password.confirm_new_password && <IoCloseCircle className='text-red-500  min-w-4' />} New Password and Confirm Password Mismatch!</li>
                            <li className={`${password.old_password == password.new_password ? 'flex gap-1' : 'hidden'} my-account-desc`}>{password.old_password == password.new_password && <IoCloseCircle className='text-red-500  min-w-4' />} Old Password must not same as New Password!</li>
                        </ul>

                        <button className='px-8 py-3 max-md:px-1 max-md:py-2 bg-emerald-300 rounded-[30px] shadow text-center text-cyan-950 text-2xl max-md:text-lg font-extrabold font-["Montserrat"] capitalize mt-6 max-md:mt-1 disabled:opacity-50' disabled={passwordValidation()} onClick={updatePassword}>Change Password</button>
                    </div>
                </MyAccountCards>
                <MyAccountCards className="flex-grow lg:self-start max-md:justify-center  opacity-45">
                    <div className='lg:pe-[10%] '>
                        <MyAccountHead>2 Factor Authentication</MyAccountHead>

                        <p className='my-account-desc mt-9 max-md:mt-4'>We will send an SMS to the number you enter below. Carrier Rates Apply.</p>

                        <MyAccountInput disable={true} id="sms_authentication" label="SMS Authentication" classNameInput='md:w-full' type="text" className="mt-6 max-md:mt-4" />

                        <button className='px-8 py-3 max-md:w-full max-md:px-8 max-md:py-2 bg-emerald-300 rounded-[30px] shadow text-center text-cyan-950 text-2xl max-md:text-lg font-extrabold font-["Montserrat"] capitalize mt-12 max-md:mt-5' disabled='disable'>Sent code</button>
                    </div>
                </MyAccountCards>
            </div>

            <div className='px-12 py-6 max-md:py-2 mt-9 max-md:mt-2 max-md:mb-24'>
                <h4 className="text-slate-300 text-xl max-md:text-lg font-black font-['Montserrat']">Delete My Account</h4>
                <p className="w-[478.50px] max-md:w-[250px] text-slate-300 text-sm font-normal font-['Montserrat'] leading-[18.48px] italic mt-3"> By clicking Yes all your data will be permanently deleted from our database. This action cannot be undone.</p>

                <button className='h-[60px] max-md:h-[40px] px-6 py-2 max-md:py-1 rounded-[30px] border border-slate-400 text-center text-slate-400 text-2xl max-md:text-base font-extrabold font-["Montserrat"] capitalize mt-6 max-md:mt-4 max-md:w-full'>Delete my Account</button>
            </div>
            <ToastContainer hideProgressBar toastStyle={{background:"#BCFBE4", color:"#0F3A4D", fontFamily:"Montserrat"}}/>
           
        </>
    )
}

export default Security
