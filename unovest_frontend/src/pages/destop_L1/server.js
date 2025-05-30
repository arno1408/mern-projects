import axios from "axios";
import { BACKENDURL, token } from "../../Variable";


export const getallcurrencyServer = (success, error) => {
    let usertoken = token();
    axios.get(`${BACKENDURL}currency/`, {
        headers: { Authorization: `Bearer ${usertoken.accessToken}` }
    }).then((resp) => {
        if (resp.data.code === 200) {
            success(resp)
        } else {
            success(resp.data.message)
        }
    }).catch((err) => error(err))
}


export const saveDetails = async (endpoint, data, success, error) => {
    let usertoken = token();
    data.user_auth = usertoken?.userdata?.id
    await axios.post(`${BACKENDURL}${endpoint}/`, data, {
        headers: { Authorization: `Bearer ${usertoken.accessToken}` }
    }).then((resp) => {
        if (resp.data.code === 200) {
            success(resp)
        } else {
            success(resp.data.message)
        }
    }).catch((err) => error(err))
}

export const postWithoutAuth = async (endpoint, data, success, error) => {
    await axios.post(`${BACKENDURL}${endpoint}/`, data).then((resp) => {
        if (resp.data.code === 200) {
            success(resp)
        } else {
            success(resp.data.message)
        }
    }).catch((err) => error(err))
}

export const updateDetails = async (id, endpoint, data, success, error) => {
    let usertoken = token();
    console.log(usertoken, "usertoken")
    let newdata = { ...data }
    newdata.user_auth = usertoken?.userdata?.id
    console.log(data)
    await axios.put(`${BACKENDURL}${endpoint}/${id}/`, newdata, {
        headers: { Authorization: `Bearer ${usertoken.accessToken}` }
    }).then((resp) => {
        if (resp.data.code === 200) {
            success(resp)
        } else {
            success(resp.data.message)
        }
    }).catch((err) => error(err))
}

export const updateDetailsWithoutId = async (endpoint, data,isUser_auth=false, success, error) => {
    let usertoken = token();
    let newdata = { ...data }
    newdata.user_auth = usertoken?.userdata?.id

    const urlWithoutUserAuth = `${BACKENDURL}${endpoint}/`; 
    const urlWithUserAuth = `${BACKENDURL}${endpoint}/?user_auth=${newdata.user_auth}`; 

    await axios.put(isUser_auth?urlWithUserAuth:urlWithoutUserAuth, newdata, {
        headers: { Authorization: `Bearer ${usertoken.accessToken}` }
    }).then((resp) => {
        if (resp.data.code === 200) {
            success(resp)
        } else {
            success(resp)
        }
    }).catch((err) => error(err))
}

export const getallmodelsfields = (success, error) => {
    let usertoken = token();
    axios.get(`${BACKENDURL}all-models/`, {
        headers: { Authorization: `Bearer ${usertoken.accessToken}` }
    }).then((resp) => {
        if (resp.data.code === 200) {
            success(resp)
        } else {
            success(resp.data.message)
        }
    }).catch((err) => error(err))
}


export const getData = async (type, success, error) => {
    let usertoken = token();
    await axios.get(`${BACKENDURL}${type}/?user_auth=${usertoken.userdata.id}`, {
        headers: { Authorization: `Bearer ${usertoken.accessToken}` }
    }).then((resp) => {
        if (resp.data.code === 200) {
            success(resp)
        }else{
            success(resp)
        }
    }).catch((err) => error(err))
}


export const getWithoutAuth = async (type, success, error) => {
    let usertoken = token();
    await axios.get(`${BACKENDURL}${type}/`, {
        headers: { Authorization: `Bearer ${usertoken.accessToken}` }
    }).then((resp) => {
        if (resp.data.code === 200) {
            success(resp)
        } else {
            success(resp.data.message)
        }
    }).catch((err) => error(err))
}

export const getWithoutAuth2 = async (type, success, error) => {
    await axios.get(`${BACKENDURL}${type}/`).then((resp) => {
        if (resp.data.code === 200) {
            success(resp)
        } else {
            success(resp.data.message)
        }
    }).catch((err) => error(err))
}

export const deleteData = async(type, id, success, error) => {
    let usertoken = token();
    await axios.delete(`${BACKENDURL}${type}/${id}/`, {
        headers: { Authorization: `Bearer ${usertoken.accessToken}` }
    }).then((resp) => {
        if (resp.data.code === 200) {
            success(resp)
        } else {
            success(resp.data.message)
        }
    }).catch((err) => error(err))
}

export const getUserExpenseDetails= async(endPoint,success,error)=>{
    let usertoken = token();
    let userDetails = JSON.parse(localStorage.getItem('userdetails'));
   await axios.get(`${BACKENDURL}${endPoint}/?user_auth=${userDetails?.user_data?.id}`,{
        headers:{Authorization:`Bearer ${usertoken.accessToken}`}
    })
    .then((resp) =>{
        if(resp.data.code === 200){
            success(resp)
        }
    })
    .catch((err)=>{
        error(err)
    })
}

export const userActivePower=async(endpoint,activePowerData,success,error)=>{
    let usertoken = token();
    let userDetails = JSON.parse(localStorage.getItem('userdetails'));
   await axios.put(`${BACKENDURL}${endpoint}/?user_auth=${userDetails?.user_data?.id}`,activePowerData,{
        Headers:{Authorization:`Bearer ${usertoken.accessToken}`}
    }).then((resp)=>{
        if(resp.data.code === 200){
            success(resp)
        }else{
            success(resp)
        }
    }).catch((err) =>{
        error(err)
    })
}

export const userRevealStatus= async(revealId,success,error)=>{
    let usertoken = token();
    let data = revealId;
    let userDetails = JSON.parse(localStorage.getItem('userdetails'));
   await axios.post(`${BACKENDURL}user_update_reveal_status/?user_auth=${userDetails?.user_data?.id}`,data,{
        Headers:{Authorization:`Bearer ${usertoken.accessToken}`}
    }).then((resp)=>{
        if(resp.data.code === 200){
            success(resp)
        }
    }).catch((err) =>{
        error(err)
    })
}

export const userCoinMaster= async(success,error)=>{
   await axios.get(`${BACKENDURL}coins_master/`).then((resp)=>{
        if(resp.data.code === 200){
            success(resp)
        }
    }).catch((err) =>{
        error(err)
    })
}

