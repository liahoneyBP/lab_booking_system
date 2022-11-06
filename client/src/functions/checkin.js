import axios from "axios";

export const checkIn = async (pinCode, slug, bookingId, authtoken) =>
await axios.put(`${process.env.REACT_APP_API}/lab/booking/checkin/${slug}/${bookingId}`, {pinbody: pinCode}, {
    headers: {
        authtoken
    }

});
