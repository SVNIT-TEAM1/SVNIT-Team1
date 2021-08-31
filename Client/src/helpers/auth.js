import axios from "axios";

export const login = async (url,data) =>{
  try {
    let resp = await axios.post(url,data);
    return resp.data;
  }catch(err){
    return err.response.data
  }
}

export const register= async(url, user)=>{
  try {
    let resp=await axios.post(url, user);
    return resp.data;
  }catch(err){
    return err.response.data
  }
}
