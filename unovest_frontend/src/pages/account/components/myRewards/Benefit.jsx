import {rewarddiamond} from "./../../../../assets/Icons"
 
 
const Benefit = (props) => {
  return (
    <>
    {props?.rewards?.map((users,i) => {
                return (
                 <div key={i}>
                      <p className="font-Work_Sans text-2xl  max-md:text-lg  font-extrabold text-[#FF9356] bg-[#435066] md:px-7 md:py-2 rounded-[26px] flex justify-center items-center mb-4 "><img src={rewarddiamond} className="mt-2" alt="diamond"  /> {users?.number}</p>
                      <h5 className="text-center font-Montserrat text-lg  max-md:text-base font-semibold text-white  max-w-28 m-auto max-md:mb-2">{users?.heading}</h5>
                 </div>
                )
            })}
    </>
  )
}
 
export default Benefit
 