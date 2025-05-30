import React from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function MyAccountInput({ id,isInputWithIcon= false,togglePasswordVisibility,passwordVisible=false,maxlength=100,tooltipId=null, label,value='', type, placeholder,onChangeHandler, className='', classNameLabel='', classNameInput='', disable }) {
 // 
  return !isInputWithIcon ? (
    <div data-tooltip-id={tooltipId} className={`flex flex-col max-md:w-full ${className} ${disable ? 'opacity-45' : ''}`}>
      <label htmlFor={id} className={` MyAccountInput-label ${classNameLabel}`}>{label}</label>
      <input maxLength={maxlength} value={value || ''} name={id} onChange={onChangeHandler} disabled={disable} type={type} id={id} placeholder={placeholder} className={` MyAccount-Input ${classNameInput}`} />
    </div>
  ) : (<div data-tooltip-id={tooltipId} className={`flex flex-col ${className} ${disable ? 'opacity-45' : ''}`}>
    <label htmlFor={id} className={` MyAccountInput-label ${classNameLabel}`}>{label}</label>
      <div className='relative slg:w-max max-md:text-sm'>
        <input
          type={passwordVisible ? 'text' : 'password'}
          name={id}
          id={id}
          onChange={onChangeHandler}
          placeholder={placeholder}
          className={`login-signup-input  w-[360px] max-lg:w-full slg:w-[600px] lg:w-[360px] max-md:text-sm ${classNameInput}`}
          required={true}
          value={value || ''}
        />
        <button type="button" onClick={togglePasswordVisibility}>
          {!passwordVisible ? <FiEyeOff className='absolute end-3 top-1/2  translate-y-[-50%] max-md:stroke-slate-500 max-md:w-4 max-md:h-4' size={"24"} stroke='#B5B5B5' onClick={togglePasswordVisibility} /> 
          : <FiEye className='absolute end-3 top-1/2  translate-y-[-50%]  max-md:stroke-slate-500 max-md:w-4 max-md:h-4' size={"24"} stroke='#B5B5B5' onClick={togglePasswordVisibility} />}
        </button>
      </div>
  </div>)
}

export default MyAccountInput;
