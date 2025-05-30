import { FaChevronRight } from "react-icons/fa"
// import { Right_arrow } from "../assets/Icons"

const RoundedBtn = ({ onClick, label, type, className = '', disable=false }) => {
  return (
    <>
      <button disabled={disable} onClick={onClick} type={type} className={`${className} small-padding rounded-btn `} >
        <p className="small-text rounded-btn-p text-dark-blue">{label}</p>
        {/* <span><img src={Right_arrow} alt="" srcSet="" /></span> */}
        <span><FaChevronRight  className="rounded-btn-span text-dark-blue" /></span>
      </button>
    </>
  )
}

export default RoundedBtn