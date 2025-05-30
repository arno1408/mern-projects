import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const Protected = ({ Component }) => {
   let location = useLocation();
  const userdetails = JSON.parse(localStorage.getItem("userdetails"));
  const page_data = useSelector((state) => state.Page_Data);

 //-------------added protected route to restrict the path outside my-power---------------//
  if(location?.pathname == "/level-1/quiz/result/insides/my-power"){
    let expiryDate  = new Date(page_data.activate_my_power_expiry);
    let currentDate = new Date();
  
    // current date exceed expiry date 
    if(expiryDate > currentDate){
      return <Navigate to="/level-1/quiz/result/insides/my-power/"/>
    }
    // current date less than expiry date 
    else if(expiryDate < currentDate){
      if(page_data?.is_expired){
        return <Navigate to="/level-1/quiz/result/insides/"/>
       }
    }
    // current date equals expiry date 
    else{
      if(page_data?.is_expired){
        return <Navigate to="/level-1/quiz/result/insides/"/>
       }
    }

  }
  if (userdetails?.token?.access) {
    return Component;
  } else {
    return <Navigate to="/" />
  }
};