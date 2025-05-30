import { FaChevronRight } from "react-icons/fa"
// import { Right_arrow } from "../assets/Icons"

const RoundedBtnWithoutArrow = ({ onClick, label, type,className,textClass ,disable}) => {
  return (
    <>
      <button onClick={onClick} type={type} className={className} disabled={disable}>
        <p className={`flex-1 text-center text-xl  max-md:text-lg max-md:p-2  font-extrabold ${textClass}`}>{label}</p>
        {/* <span><img src={Right_arrow} alt="" srcSet="" /></span> */}
        {/* <span><FaChevronRight size={28} className="text-dark-blue " /></span> */}
      </button>
    </>
  )
}

export default RoundedBtnWithoutArrow