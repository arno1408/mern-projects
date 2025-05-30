const Gray_btn = ({ label,PreIcon,type, Icon, onClick, className }) => {
    return (
        <>
            <button type='button' className={`cursor-pointer flex items-center 2xl:gap-4 xl:gap-1.5 lg:gap-2 gap-4  2xl:py-[8px] lg:px-[10px] px-[12px] py-2 rounded-[20px] border lg:border-none border-slate-600 lg:rounded-[14px]  bg-stone-300 bg-opacity-10 lg:bg-grey-2 lg:bg-opacity-20 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.50)] ${className}`} onClick={onClick}>
               {PreIcon && <img src={PreIcon} alt="pre-icon" width={24}/>}
                <span className=" flex-1 text-grey-2 whitespace-nowrap text-base lg:text-xs 2xl:text-base font-semibold text-center">
                    {label}
                </span>

                {Icon && <span>{<Icon size={15} className={'text-grey-2'} />}</span>}
            </button>
        </>


    )
}

export default Gray_btn