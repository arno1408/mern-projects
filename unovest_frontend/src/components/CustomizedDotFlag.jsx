import GreenGoalFlag from "./customizedFlags/GreenGoalFlag";
import RedGoalFlag from "./customizedFlags/RedGoalFlag";
import WhiteFinancialFreedomFlag from "./customizedFlags/WhiteFinancialFreedomFlag";

const CustomizedDotFlag = (props) => {
    const { cx, cy, value, maxvalue,payload,freedomAge } = props;
    if(payload?.isGoalAvaiableInThisYear){
      if(payload?.isGoalAchived === true){
        return <GreenGoalFlag cx={cx} cy={cy} payload={payload}/>
      } if(payload?.isGoalAchived === false){
        return <RedGoalFlag cx={cx} cy={cy} payload={payload}/>
      }      
    }
    if(freedomAge == payload.age){
     return <WhiteFinancialFreedomFlag cx={cx} cy={cy} payload={payload}/>
    }  
}

export default CustomizedDotFlag