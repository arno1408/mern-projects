import React, { useState,useRef, useEffect } from 'react'
import MyAccountCards from './MyAccountCards'
import MyAccountHead from './MyAccountHead'
import MyAccountInput from './MyAccountInput'
import MyAccountSelect from './MyAccountSelect'
import MyAccountDatePicker from './MyAccountDatePicker'
import { Profile_Img } from '../../../assets/images'
import RoundedBtnWithoutArrow from '../../../components/RoundedBtnWithoutArrow'
import { CountryData, CurrencyData } from '../../../constants'
import Tooltip from "../../../components/tooltip/Tooltip"
import { getData, updateDetailsWithoutId } from '../../destop_L1/server'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AnimalsData } from '../../../constants'
import dayjs from 'dayjs'
import { updateStatisticalData } from '../../../redux/slices/Statistical_Data'
import { useDispatch, useSelector } from 'react-redux'


function UserProfile() {
    const userdetails = JSON.parse(localStorage.getItem("userdetails"));
    const numerictype = useSelector(state => state?.statistical_Data?.numerical_format)
    const fileRef = useRef();
    const dispatch = useDispatch();
  
    const currencyFormats = ['1,11,11,111','111,111,111'];
    const countryList = CountryData.map(list => list.country)
    const currencyList = CurrencyData.map(list => list.country)
    
    const [selectedDate, setSelectedDate] = useState(null);
    const [profile, setprofile] = useState({
        first_name: null, 
        last_name: null, 
        phone_number: null,
        numerical_format: numerictype === 'millions'? '111,111,111': '1,11,11,111',
        country_code: 'India', // here we are using country name for setting parameters
        preferred_currency: 'India', // here we are using country name for setting parameters
        email_address: userdetails?.user_data?.email || ''
    });
    const [profileSize,setProfileSize]=useState({
         width:'500px',
         height:'500px'
    })

    useEffect(() =>{
       getProfileData();
    },[]);

    //fetch all profile data for user
    const getProfileData=()=>{
        getData('profile', (success) =>{
            console.log(success.data.message);
            const {first_name,last_name,phone_number, country_code, date_of_birth} = success.data.message;
            setprofile({
                ...profile,
                first_name: first_name == null ? userdetails.user_data.first_name: first_name,
                last_name : last_name == null ? userdetails.user_data.last_name: last_name,
                phone_number,
                preferred_currency: CurrencyData.find(list => list.currencyIndex).country,
                country_code: country_code?.split(' ')[1] || 'India',
            })
            setSelectedDate(dayjs(date_of_birth))
        }, (error) =>{
            console.log(error);
        })
    }

    console.log(profile,"profile");
    console.log(selectedDate,"selectedDate");

    let animalIndex=[]; 
     animalIndex.push(Math.round(Math.random() * 69));

    const handleDateChange=(value)=>{
        const dateFormat = new Date(value.$d);
        const setDate = `${dateFormat.getFullYear()}-${dateFormat.getMonth()+1}-${dateFormat.getDate()}`
        setSelectedDate(setDate);
    }

    const inputChangeHandler=(e)=>{
        if(e.target.name == 'phone_number'){
            const numericValue = e.target.value.replace(/\D/g, '');
            const truncatedValue = numericValue.slice(0, 10);
            setprofile({
                ...profile,
                [e.target.name]: truncatedValue
            })
        }else{
            setprofile({
                ...profile,
                [e.target.name]: e.target.value
            })
        }
       
    }

    const saveProfileHandler=async()=>{
      
        const getCountry = CountryData?.find(list=> list.country == profile.country_code)
        const getCurrency = CurrencyData?.find(list=> list.country == profile.preferred_currency)
        let setDate=null;
        if(typeof selectedDate == 'object' && !isNaN(selectedDate)){
            const dateFormat = new Date(selectedDate.$d); 
            setDate = `${dateFormat.getFullYear()}-${dateFormat.getMonth()+1}-${dateFormat.getDate()}`
        }else{
            setDate = selectedDate
        }
        console.log(setDate,selectedDate,'make');
        const profilePayload = {
            first_name: profile.first_name, 
            last_name: profile.last_name, 
            phone_number: profile.phone_number,
            numerical_format: profile.numerical_format == "111,111,111"?'International':'Domestic',
            country_code: getCountry?`${getCountry.code} ${getCountry.country}`: '', // here we are using country name for setting parameters
            preferred_currency: getCountry? getCurrency.currencyIndex: '', // here we have to change the code
            date_of_birth: setDate
        }
             console.log(profilePayload,'profilePayload');

            await updateDetailsWithoutId("profile", profilePayload, false,
            (success) =>{
                toast.success(success.data.message)
                const updatedProfile = {...userdetails,user_data:{...userdetails?.user_data, first_name:profile.first_name, last_name: profile.last_name, full_name:`${profile.first_name} ${profile.last_name}` }} 
                localStorage.setItem('userdetails', JSON.stringify(updatedProfile))
               const numeric_data =  profile.numerical_format == "111,111,111"?'millions':'lakhs'
                dispatch(updateStatisticalData({numerical_format: numeric_data}))
            },(error)=>{
                console.log(error);
            })
    }

    // change profile image on button click
    const changeProfileImage=()=>{
            fileRef.current.click();
    }


    useEffect(()=>{
       if(window.innerWidth<750){
         setProfileSize({
            width:'300px',
            height:'300px'
         })
       }
    },[])

    return (
        <div className='mt-[52px] max-md:mb-24 mb-0 max-md:mx-auto'>
            <MyAccountCards>

                <MyAccountHead>Personal Details</MyAccountHead>
                <div className='flex mt-9 max-lg:gap-5 max-lg:flex-col justify-evenly'>
                    <div className='PersonalDetails_Container'>
                        <MyAccountInput id="first_name" value={profile.first_name} onChangeHandler={inputChangeHandler}  label="First Name" type="text" placeholder="First Name" />
                        <MyAccountInput id="last_name" value={profile.last_name} onChangeHandler={inputChangeHandler}  label="Last Name" type="text" placeholder="Last Name" />
                        <MyAccountInput disable={true} id="email_address" tooltipId={'lock'} value={profile.email_address} onChangeHandler={inputChangeHandler}  label="Email Address" type="email" placeholder="Email" />
                        <MyAccountDatePicker label={'Date Of Birth'} className={"max-md:w-[17rem]"} classNameLabel={'text-left max-md:w-[17rem]'} selectedDate={selectedDate} width={'22rem'} popperWidth={'22rem'} handleDateChange={handleDateChange} maxDate={dayjs()}/>
                        {/* <MyAccountInput id="date_of_birth" label="Date Of Birth" type="date" placeholder="DD/MM/YYYY" /> */}
                        <MyAccountSelect id="country_code" value={profile.country_code}  onChangeHandler={inputChangeHandler} label="Country Code" options={countryList} data={CountryData} firstDropdown="+91" />
                        <MyAccountInput id="phone_number" value={profile.phone_number} maxlength={15} onChangeHandler={inputChangeHandler} label="Phone Number" type="tel" placeholder="Phone Number" />
                    </div>

                    <div className='PersonalDetailsImage-container' >
                        <div className='PersonalDetails-Image'>
                            {/* <img className='bg-emerald-300 border-2 rounded-full' src={`https://anonymous-animals.azurewebsites.net/avatar/:${AnimalsData[animalIndex[0]]}`} width={500} height={500} alt="side_bar" /> */}
                            <img className='bg-emerald-300 border-2 rounded-full'style={{backgroundColor:userdetails?.user_data?.avatar_color}} src={`https://anonymous-animals.azurewebsites.net/avatar/:${AnimalsData[userdetails?.user_data?.avatar_id]}`} width={`${profileSize.width}`} height={`${profileSize.height}`} alt="side_bar" />
                        </div>
                        <input type='file' className='hidden' ref={fileRef}/>
                        <button onClick={changeProfileImage} className='ChangeProfile-btn'>
                            Change Profile Picture
                        </button>
                    </div>
                </div>
            </MyAccountCards>

            <MyAccountCards className="mt-[45px] max-md:my-10">
                <MyAccountHead>Preferences</MyAccountHead>

                <div className='flex flex-wrap gap-x-[60px] gap-y-[45px]  max-md:gap-7 mt-9 max-md:justify-center max-md:pb-3'>
                    <MyAccountSelect id="preferred_currency" value={profile.preferred_currency}  onChangeHandler={inputChangeHandler} label="Preferred Currency" options={currencyList} data={CurrencyData}  firstDropdown="₹" />
                    <MyAccountSelect id="numerical_format" value={profile.numerical_format}  onChangeHandler={inputChangeHandler} label="Numerical Format" options={currencyFormats}  firstDropdown="" />
                   <RoundedBtnWithoutArrow onClick={saveProfileHandler} label={"Save Profile"} className={'bg-emerald-300 rounded-3xl lg:h-12 px-4 md:py-2 border lg:mt-6 border-slate-300 '}/>
                </div>
                <Tooltip
                    id={'lock'}
                    backgroundColor={'#232E41'}
                    message="Upgrade to Next Level"
                    opacity={1}
                />
            </MyAccountCards>
            <ToastContainer hideProgressBar toastStyle={{background:"#BCFBE4", color:"#0F3A4D", fontFamily:"Montserrat"}}/>
        </div>
    )
}

export default UserProfile
