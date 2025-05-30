import React from 'react'
import { RiDeleteBinLine } from "react-icons/ri";

const DeleteConfirmation = ({ toggleModal, open, handlerCancel,containerClass='',rightButtonClass='',leftButtonClass='', actionHandler,property_name ,text=''}) => {
    return (
        <div className='transition-all duration-50'>
            <div className={`fixed z-10 overflow-y-auto top-1/2 translate-y-[-50%] w-full left-0 ${open ? "" : "hidden"}`} id="modal">
                <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="delete-div align-center" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        <div className={`${containerClass} delete-subdiv animate-grow-out`}>

                            <div className='delete-text'>
                            <RiDeleteBinLine  className='w-6 h-6'/>  {`${text} ${property_name}`} ?
                            </div>
                            <div className="bg-transparent flex items-center  gap-2 px-2 py-3 w-full rounded-xl">
                                <button type="button" className={`text-[#0F3A4D] delete-btn ${leftButtonClass}`} onClick={handlerCancel}><i className="fas fa-times"></i> Cancel</button>
                                <button type="button" className={`bg-[#0F3A4D] text-[#BCFBE4] delete-btn ${rightButtonClass}`} onClick={actionHandler}><i className="fas fa-times"></i> Delete</button>
                            </div>
                        </div>
                    </div >
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmation
