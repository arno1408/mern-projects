import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function MyAccountSelect({ firstDropdown,disable=false,value='', data = null, id, label, options, onChangeHandler,classNameInput }) {
    const findCountryCode =() =>{
        if(data !== null){
            if(id == 'country_code'){
                return data.filter(list => list.country == value)[0]?.code
            }else if(id == 'preferred_currency'){
                return data.filter(list => list.country == value)[0]?.symbol
            }
        }
        return firstDropdown;
    }
   
    return (
        <div className='flex flex-col'>
            <FormControl sx={{ m: 0, minWidth: 120 }}>
                <label htmlFor={id} className='MyAccountInput-label'>{label}</label>
                {/* <InputLabel id="demo-simple-select-helper-label">Age</InputLabel> */}
                <div className={`MyAccountSelect myaccount-select ${classNameInput}`}>
                <div className='text-gray-200 text-lg max-md:text-sm  font-semibold font-["Montserrat"] leading-snug'>{findCountryCode()}</div>
                           
                    <Select
                        labelId={id}
                        id={id}
                        value={value}
                        name={id}
                        label="Age"
                        className='flex-grow mt-1 '
                        onChange={onChangeHandler}
                        disabled={disable}
                    >
                        {/* <MenuItem value=""></MenuItem> */}
                        {options.map((opiton) => (
                            <MenuItem value={opiton} key={opiton}>{opiton}</MenuItem>
                        ))}
                    </Select>
                </div>
            </FormControl>


        </div>
    )
}

export default MyAccountSelect
