import { useEffect } from 'react';
import { formatNumberInCrores, formatNumberWithCommas } from '../Variable';


export const NumericFormatConversion = (numericalValue, selectedFormat = '', numerictype) => {
        // const userdetails = JSON.parse(localStorage.getItem('userdetails'));
        // const numerictype = userdetails?.user_data?.numerical_format || 'lakhs';
    
        let formattedNumber = null;
        if(numerictype == 'lakhs'){
            if(selectedFormat == 'crores'){
                formattedNumber = formatNumberInCrores(Math.round(numericalValue));
            }else{
                formattedNumber = formatNumberWithCommas(Math.round(numericalValue));
            }
        }else {
            formattedNumber = Math.round(numericalValue / 1000000);
        }
        
        // console.log(formattedNumber,'lop');
        return formattedNumber;
}

export const NumericSummaryConversion = (numericalValue, selectedFormat = '', numerictype) => {
    let formattedNumber = null;
    if(numerictype == 'lakhs'){
        if(selectedFormat == 'crores'){
            formattedNumber = formatNumberInCrores(numericalValue);
        }else{
            formattedNumber = formatNumberWithCommas(numericalValue);
        }
    }else {
        formattedNumber = numericalValue / 1000000;
    }
    return formattedNumber.toFixed(2);
}

export const NumericBaseFormatConversion1 = (numericalValue) => {
    const userdetails = JSON.parse(localStorage.getItem('userdetails'));
    const numerictype = userdetails?.user_data?.numerical_format;

    let formattedNumber = null; 
    if(numerictype == 'lakhs'){
        formattedNumber = numericalValue;
    }else {
        formattedNumber = formatNumberWithCommas((numericalValue / 1000000));
    }
    
    // console.log(formattedNumber ,'lop');
    return formattedNumber;
}

export const NumericBaseFormatConversion2 = (numericalValue) => {
    const userdetails = JSON.parse(localStorage.getItem('userdetails'));
    const numerictype = userdetails?.user_data?.numerical_format;

    let formattedNumber = null; 
    if(numerictype == 'lakhs'){
        if(numericalValue.toString().length <=4){
            formattedNumber = numericalValue * 1000000;
        }else{
            formattedNumber = numericalValue;
        } 
    }else {
        if(numericalValue.toString().length >=5){
            formattedNumber = numericalValue / 1000000;
        }else{
            formattedNumber = numericalValue;
        }
    }
    
    // console.log(formattedNumber ,'lop');
    return formattedNumber;
}

export const NumericBaseFormatConversion = (numericalValue) =>{
    const userdetails = JSON.parse(localStorage.getItem('userdetails'));
    const numerictype = userdetails?.user_data?.numerical_format;
    const isMillionChanged = userdetails?.user_data?.isMillionChanged;
    const isLakh = new RegExp(/\b\d{1,3}(,\d{3})*(,\d{1,2})?\s*\b/g).test(formatNumberWithCommas(numericalValue));

    let formattedNumber = null;
    if(numerictype === 'lakhs' && !isMillionChanged){
        formattedNumber = numericalValue;
    }else if(numerictype === 'lakhs' && isMillionChanged && (numericalValue.toString().length < 5 || numericalValue < 100)){
        formattedNumber = numericalValue * 1000000;
    }else if(numerictype === 'millions' && isMillionChanged && numericalValue.toString().length >= 5){
        formattedNumber = numericalValue / 1000000;
    }else {
        formattedNumber = numericalValue;
    }
 
    return formattedNumber;
}

