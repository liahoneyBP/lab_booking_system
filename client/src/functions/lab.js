import axios from "axios";

export const createLab = async (lab, authtoken) => 
    await axios.post(`${process.env.REACT_APP_API}/create-lab`, lab, {
        headers:{
            authtoken,
        }
    })


export const getLabsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/labs/${count}`);
