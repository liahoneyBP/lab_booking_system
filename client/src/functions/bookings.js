import axios from "axios";
import momentTimezone from "moment-timezone"


// Function to receive booking data (AEST) and convert to JS Date object
// Data expected in [year, month, date, hours, seconds] format
/*const dateUTC = (dataArray) => {
  // Ensure date data is saved in AEST and then converted to a Date object in UTC
  return momentTimezone(dataArray).tz('Australia/Sydney').toDate()
}*/


export const makeBooking = async (slug, lab, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/makebooking/lab/${slug}`, lab,
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



export const removeBooking = async (bookingId, labId, userEmail, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/removeBooking`, { bodyBookingId: bookingId, bodyLabId: labId, userEmailinTable: userEmail}, {
    headers: {
      authtoken,
    }
  });



export const getLabBookingLists = async (slug, userEmail) =>
  await axios.post(`${process.env.REACT_APP_API}/lab/booking/lists/${slug}`, { emailbody: userEmail }, {

  });



export const getBookingsById = async (slug, bookingId) =>
  await axios.get(`${process.env.REACT_APP_API}/getLabBookingsBySlug/${slug}`, {bodybookingId: bookingId},
    {
      

    })










/*
export function updateStateRoom(self, updatedRoom, loadMyBookings) {
  self.setState((previousState) => {
    // Find the relevant room in React State and replace it with the new room data
    const updatedRoomData = previousState.roomData.map((room) => {
      if (room._id === updatedRoom._id) {
        return updatedRoom
      } else {
        return room
      }
    })
    return {
      // Update the room data in application state
      roomData: updatedRoomData,
      currentRoom: updatedRoom
    }
  })
  loadMyBookings()
}
*/