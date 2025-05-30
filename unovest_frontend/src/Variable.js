export const BACKENDURL = "https://devadmin.unovest.co/"
export const IMAGEBACKENDURL = "https://devadmin.unovest.co"
export const REFERRALENDPOINT = "https://dev-app.unovest.co/"
import { useSelector } from 'react-redux'
// export const REFERRALENDPOINT = "http://13.202.49.240/"
import {Whatsapp,Linkedin,X,Telegram,Facebook } from './assets/Icons'
import { CurrencyData } from './constants'
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa6";


export const token = () => {
    let obj = {}
    const userdetails = JSON.parse(localStorage.getItem("userdetails"))
    obj.userdata = userdetails.user_data
    obj.accessToken = userdetails.token.access
    obj.refreshToken = userdetails.token.refresh
    return obj;
}

export const CurrencyFinder=()=>{
    // const userdetails = JSON.parse(localStorage.getItem('userdetails'));
    // const numerictype = userdetails?.user_data?.numerical_format || 'lakhs';
    const allmodels = useSelector((state) => state?.Card_inputs);
    const numerictype = useSelector(state => state?.statistical_Data?.numerical_format)

    if(numerictype == 'millions'){
        return FaDollarSign()  ;
    } else if(allmodels?.preferred_currency){
      const selectedCurrency = CurrencyData?.find(currency => currency.currencyIndex == allmodels?.preferred_currency).symbol
      return selectedCurrency;
    } else{
        return FaIndianRupeeSign();
      }
  }

export const NumericUnit = ({numerictype})=>{
    // const userdetails = JSON.parse(localStorage.getItem('userdetails'));
    // const numerictype = userdetails?.user_data?.numerical_format || 'lakhs';

    if(numerictype == 'millions'){
        return 'M';
    } 
}  


export const max_input_range = 100000000

export function formatNumberWithCommas(number) {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function RegexNumberWithCommas(value){
    return new RegExp(/^\d+(,\d+)*$/).test(value);
} 

export const changeNumbertoComma = (value, numerictype) => {
    // console.log(new Intl.NumberFormat('en-US').format(value)); // 143,450
    // console.log(new Intl.NumberFormat('en-IN').format(value)); // 1,43,450

    if(numerictype == 'millions'){
        return new Intl.NumberFormat('en-US').format(value)
    }else{
        return new Intl.NumberFormat('en-IN').format(value)
    }
    
}

export function formatNumberInCrores(value){
    return value && Number((value/10000000).toFixed(2));
}

const getuserData = JSON.parse(localStorage.getItem('userdetails'));
let user_data = getuserData?.user_data;

export const revealArray = [
   {
        id: user_data?.is_enough_money_for_all_goal_reveal_id,
        status: user_data?.is_enough_money_for_all_goal_reveal_status
    },
    {
        id: user_data?.is_fire_amount_reveal_id,
        status: user_data?.is_fire_amount_reveal_status 
    },
    {
        id: user_data?.is_retire_sum_reveal_id,
        status: user_data?.is_retire_sum_reveal_status
    },
    {
        id: user_data?.is_likely_inheritance_reveal_id,
        status: user_data?.is_likely_inheritance_reveal_status

    }
]

export const iconArray=[
    {
       id:1,
       icons: Whatsapp,
       link: "https://web.whatsapp.com/"
    },
    {
        id:2,
        icons: Facebook,
        link: "https://www.facebook.com/"
    },
    {
        id:3,
        icons: Linkedin,
        link: "https://www.linkedin.com/"
    },
    {
        id:4,
        icons: X,
        link: "https://twitter.com/i/flow/login"
    }, {
        id:5,
        icons: Telegram,
        link: "https://web.telegram.org/k/"
    },
]