import React from 'react'
import {crossIcon} from "../../assets/Icons/index";
import { REFERRALENDPOINT } from '../../Variable';

const Notifier = ({toggleModal,open,referralCopied,img_icon,text,iconsArray,userRefferal,handlerCopyLink,handlerCancel,actionHandler}) => {

  return (
    <div className='transition-all duration-100'>
     <div className={`fixed z-10 overflow-y-auto top-0 w-full left-0 ${open ? "":"hidden"}`} id="modal">
    
     <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
       <div className="fixed inset-0 transition-opacity">
         <div className="absolute inset-0 bg-gray-900 opacity-75" />
       </div>
      
       <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
       <div className="inline-block align-center rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
         <div className="bg-get-start-gradient lg:min-w-full px-6 py-6 animate-grow-out">
         <span className='absolute z-10 right-0 mx-2 cursor-pointer text-2xl bg-slate-100 rounded-full' onClick={toggleModal}><img src={crossIcon} alt='image_cross'/></span>
            <div className='flex gap-2'>
                <label className="font-black text-2xl lg:text-4xl text-slate-200 my-1 lg:my-6">{text}</label>
            </div>
            {iconsArray?(
              <>
                <div className='text-slate-200 text-sm md:text-base  py-4'>
                Earn Coin each time a friend signs up with Rapidfire & use these coins to Upgrade your subscription
                </div>
                <div className=' text-2xl md:text-4xl lg:text-6xl text-slate-200 flex justify-around gap-3 my-5'>
                  {iconsArray?.map((ele)=>(
                  <a href={ele.link} target='_blank'>
                      <img src={ele.icons} alt="socialIcon_images" />
                  </a>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-0 bg-slate-500 px-4 py-3 text-right w-full rounded-xl">
                  <div className='text-lg truncate text-slate-100 max-md:text-sm'>{`${REFERRALENDPOINT}SignUp/?refree=${userRefferal?.code}`}</div>
                  <button type="button" className={`lg:py-2 py-1 px-5 lg:px-8 ${referralCopied?'bg-emerald-300 border-slate-200 text-slate-800':'bg-transparent border-[#67EAB3] text-[#67EAB3]'} border text-xs md:text-base  text-nowrap font-bold hover:bg-gray-700 rounded-2xl lg:rounded-3xl transition-all ease-in-out duration-200`} onClick={handlerCopyLink}>{referralCopied?'Link Copied':'Copy Link'}</button>
                </div>
                
              </>
            ):(
              <div className='text-slate-200 py-4'>
                <div className='text-slate-200 py-4'>
                  The selected Item will delelted and the remaining goals will be displayed here.
                  are you sure you want to delete the selected Item?
                </div>
                <div className="flex items-center justify-end gap-2 bg-slate-500 px-4 py-3 text-right w-full rounded-xl">
                  <button type="button" className="py-2 px-8 bg-transparent border text-md border-[#67EAB3] text-[#67EAB3] font-bold hover:bg-gray-700 rounded-3xl" onClick={actionHandler}><i className="fas fa-times"></i> delete</button>
                  <button type="button" className="py-2 px-8 bg-transparent border text-md border-[#67EAB3] text-[#67EAB3] font-bold hover:bg-gray-700 rounded-3xl" onClick={handlerCancel}><i className="fas fa-times"></i> cancel</button>
                </div>
              </div>
            )}
           
         </div>
       </div>
     </div>
   </div>
    </div>
   
  
  )
}

export default Notifier
