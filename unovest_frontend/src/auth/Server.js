import axios from "axios"
import { BACKENDURL } from "../Variable"

export const userSignUp=(data,success,error)=>{
    axios.post(`${BACKENDURL}signup/`,data).then((resp)=>{
        if(resp.data.code===200){
            success(resp)
        }else{
            success(resp);
        }
    }).catch((err)=>error(err))
}

export const userSignIn=(data,success,error)=>{
    axios.post(`${BACKENDURL}signin/`,data).then((resp)=>{
        if(resp.data.code===200){
            success(resp)
        }else{  
            success(resp)
        }
    }).catch((err)=>error(err))
}

export const socialSignIn=(data,endpoint,success,error)=>{
    axios.post(`${BACKENDURL}${endpoint}/`,data).then((resp)=>{
        if(resp.data.code===200){
            success(resp)
        }else{  
            success(resp)
        }
    }).catch((err)=>error(err))
}