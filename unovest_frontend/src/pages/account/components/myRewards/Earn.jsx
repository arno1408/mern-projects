import {rewarddiamond} from "./../../../../assets/Icons"
 
const Earn = (props) => {
  return (
    <>      
      {props?.datas?.map((users,i) => {
                return (
                 <div key={i}>
                        <div className="Earn-icon">
                            <img src={users?.image} alt='user' className="w-full h-full object-contain "/>
                        </div>
                      <p className="Earn-reward "><img src={rewarddiamond} className="" alt="diamond"  /> +{users?.number}</p>
                      <h5 className="Earn-heading">{users?.heading}</h5>
                      <p className="Earn-subheading">{users?.para}</p>
                 
                 </div>
 
 
                )
            })}
    </>
  )
}
 
export default Earn
 
 