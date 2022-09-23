import axios from "axios";

export const createLab = async (lab, authtoken) => {
    await axios.post(`${process.env.REACT_APP_API}/lab`, lab, {
        headers:{
            authtoken,
        }
    })
}