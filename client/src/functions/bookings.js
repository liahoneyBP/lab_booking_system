import axios from "axios";




export const makeBooking = async (slug, lab, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/makebooking/lab/${slug}`, lab,
    {
      headers: {
        authtoken,
      },

    })


export const UpdateBookingId = async (labId, bookingId, booking, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/updateBooking/${labId}/${bookingId}`, booking,
    {
      headers: {
        authtoken,
      },

    })



export const getUserBookings = async (userEmail, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/getUserBookings`, { currentUserEmail: userEmail },
    {
      headers: {
        authtoken,
      },

    })



export const getAllUserBookings = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/getAllUserBookings`,
    {
      headers: {
        authtoken,
      },

    })



export const getLabBookings = async (labId, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/getLabBookings`, { currentlabId: labId },
    {
      headers: {
        authtoken,
      },

    })


export const getLabBookingsBySlug = async (slug, authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/getLabBookingsBySlug/${slug}`,
    {
      headers: {
        authtoken,
      },

    })



export const removeBooking = async (value, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/removeBooking`, value, {
    headers: {
      authtoken,
    }
  });


export const userRemoveBooking = async (bookingId, labId, userEmail, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/removeBooking`, { bodyBookingId: bookingId, bodyLabId: labId, userEmailinTable: userEmail }, {
    headers: {
      authtoken,
    }
  });





export const getLabBookingLists = async (slug, userEmail) =>
  await axios.post(`${process.env.REACT_APP_API}/lab/booking/lists/${slug}`, { emailbody: userEmail }, {

  });



export const getBookingsById = async (slug, bookingId) =>
  await axios.get(`${process.env.REACT_APP_API}/getBookingsById/${slug}/${bookingId}`,
    {


    })


// for Admin get BookingId by params in Update Page
export const getLabBookingsIDparams = async (labId, bookingId, authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/getLabBookingsIDparams/${labId}/${bookingId}`, {
    headers: {
      authtoken,
    }

  })


export const readUser = async (userId) =>
  await axios.post(`${process.env.REACT_APP_API}/readUser`, { userIdBody: userId }, {

  });



export const incrementBooked = async (userId, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/incrementBooked`, { userIdBody: userId }, {
    headers: {
      authtoken
    }

  });

export const reduceBooked = async (userId, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/reduceBooked`, { userIdBody: userId }, {
    headers: {
      authtoken
    }

  });


export const reduceBookedbyEmail = async (userEmail, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/reduceBookedbyEmail`, { userEmailBody: userEmail }, {
    headers: {
      authtoken
    }

  });











