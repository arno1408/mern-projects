import {rewarddiamond} from "./../../../../assets/Icons"

 
 
const Earnreward = (props) => {
   
    return (
        <>
          {props?.alldata?.map((users,i) => {
                return (
                 <div key={i}>
                        <div className="Earn-icon ">
                            <img src={users?.image} alt='user' className="w-full"/>
                        </div>
                      <p className="Earn-reward"><img src={rewarddiamond} className="" alt="diamond" />+{users?.number}</p>
                      <h5 className="Earn-heading ">{users?.heading}</h5>
                      <p className="Earnreward-subheading">{users?.para}</p>
                 </div>
                )
            })}
        </>
    )
}
 
export default Earnreward