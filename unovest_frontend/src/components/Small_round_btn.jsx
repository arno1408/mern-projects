import { FaChevronLeft } from "react-icons/fa"

const Small_round_btn = ({ onClick }) => {
    return (
        <>
            <span className=" cursor-pointer w-8 h-8 p-2 flex items-start justify-center bg-grey-2 bg-opacity-20 rounded-full"
                onClick={onClick}
            ><FaChevronLeft size={17} className=" text-grey-3" /></span>
        </>
    )
}

export default Small_round_btn