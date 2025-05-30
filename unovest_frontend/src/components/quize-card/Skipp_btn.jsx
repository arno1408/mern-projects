import { FaChevronRight } from "react-icons/fa"


const Skipp_btn = ({ onClick }) => {
    return (
        <button className="w-full cursor-pointer flex items-center justify-between  py-[10px] px-[14px] rounded-2xl bg-skip-btn-gradiant shadow-[0px_2px_10px_0px_rgba(0,0,0,0.50)]"
            onClick={onClick}
        >
            <span className=" flex-1 text-grey-2  text-lg text-center font-bold">Skip for now</span>
            <span>{<FaChevronRight size={20} className='text-grey-2' />}</span>
        </button>
    )
}

export default Skipp_btn