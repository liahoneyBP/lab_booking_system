import axios from "axios";
import momentTimezone from "moment-timezone"


// Function to receive booking data (AEST) and convert to JS Date object
// Data expected in [year, month, date, hours, seconds] format
/*const dateUTC = (dataArray) => {
  // Ensure date data is saved in AEST and then converted to a Date object in UTC
  return momentTimezone(dataArray).tz('Australia/Sydney').toDate()
}*/


export const makeBooking = async (slug, lab, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/makebooking/lab/${slug}`, lab
    ,
    {
      headers: {
        authtoken,
      },

    })


export const getUserBookings = async (slug, email, authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/getUserBookings`, email
    ,
    {
      headers: {
        authtoken,
      },

    })



export const getAllUserBookings = async ( authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/getAllUserBookings`, 
    {
      headers: {
        authtoken,
      },

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