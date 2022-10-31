import React from 'react'


// the <option> elements for the startTime and endTime <select> dropdowns
export const startTimeSelectOptions = [
  <option value="0920">9:20am</option>,
  <option value="1010">10:10am</option>,
  <option value="1100">11:00am</option>,
  <option value="1130">11:30am</option>,
  <option value="1220">12:20pm</option>,
  <option value="1310">1:10pm</option>,
  <option value="1400">2:00pm</option>,
  <option value="1430">2:30pm</option>,
  <option value="1520">3:20pm</option>,
  <option value="1610">4:10pm</option>,
  <option value="1700">5:00pm</option>,
  <option value="1730">5:30pm</option>,
  <option value="1820">6:20pm</option>,

]

export const endTimeSelectOptions = [
  <option value="0920">9:20am</option>,
  <option value="1010">10:10am</option>,
  <option value="1100">11:00am</option>,
  <option value="1130">11:30am</option>,
  <option value="1220">12:20pm</option>,
  <option value="1310">1:10pm</option>,
  <option value="1400">2:00pm</option>,
  <option value="1430">2:30pm</option>,
  <option value="1520">3:20pm</option>,
  <option value="1610">4:10pm</option>,
  <option value="1700">5:00pm</option>,
  <option value="1730">5:30pm</option>,
  <option value="1820">6:20pm</option>,
  <option value="1910">7:10pm</option>,
]

// formats the time extracted from the time inputs into an array, eg 8:30 => [8, 30]
export const formatTime = (time) => {
  let formatedTimeArray = []
  formatedTimeArray = time.split(':').map((item) => parseInt(item, 10))
  return formatedTimeArray
}

// Find the Room and floor number from the booking ID
export const findRoomInfo = (roomId, roomData) => {
  let roomInfo
  roomData.forEach(room => {
    if (room._id === roomId) {
      roomInfo = room
    }
  })
  return roomInfo
}

