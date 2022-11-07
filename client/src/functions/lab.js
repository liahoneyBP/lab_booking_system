import axios from "axios";

export const createLab = async (lab, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/create-lab`, lab, {
        headers: {
            authtoken,
        }
    })


export const getLabsByCount = async (count) =>
    await axios.get(`${process.env.REACT_APP_API}/labs/${count}`);


export const removeLab = async (slug, authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/remove-lab/${slug}`, {
        headers: {
            authtoken,
        }
    });



export const fetchLabsbyFilter = async (arg) =>
    await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);

export const fetchUserBookingsbyFilter = async (arg) =>
    await axios.post(`${process.env.REACT_APP_API}/search/filters/userbookings`, arg);


export const getLab = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/labslug/${slug}`);



export const updateLab = async (slug, lab, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/update-lab/${slug}`, lab, {
        headers: {
            authtoken,
        }
    })
