import React from 'react'
import { Select } from 'antd';
const { Option } = Select;

// the <option> elements for the startTime and endTime <select> dropdowns
export const startTimeSelectOptions = [
  <Option value="8:30">8:30am</Option>,
  <Option value="9:20">9:20am</Option>,
  <Option value="10:10">10:10am</Option>,
  <Option value="11:00">11:00am</Option>,
  <Option value="11:30">11:30am</Option>,
  <Option value="12:20">12:20am</Option>,
  <Option value="13:10">13:10pm</Option>,
  <Option value="14:00">14:00pm</Option>,
  <Option value="12:00">12:00pm</Option>,
  <Option value="13:10">1:10pm</Option>,
  <Option value="14:00">2:00pm</Option>,
  <Option value="14:30">2:30pm</Option>,
  <Option value="15:20">3:20pm</Option>,
  <Option value="16:10">4:10pm</Option>,
  <Option value="17:00">5:00pm</Option>,
  <Option value="17:30">5:30pm</Option>,
  <Option value="18:20">6:20pm</Option>,
  
]

export const endTimeSelectOptions = [
  <option value="9:20">9:20am</option>,
  <option value="10:10">10:10am</option>,
  <option value="11:00">11:00am</option>,
  <option value="11:30">11:30am</option>,
  <option value="12:20">12:20am</option>,
  <option value="13:10">13:10pm</option>,
  <option value="14:00">14:00pm</option>,
  <option value="12:00">12:00pm</option>,
  <option value="13:10">1:10pm</option>,
  <option value="14:00">2:00pm</option>,
  <option value="14:30">2:30pm</option>,
  <option value="15:20">3:20pm</option>,
  <option value="16:10">4:10pm</option>,
  <option value="17:00">5:00pm</option>,
  <option value="17:30">5:30pm</option>,
  <option value="18:20">6:20pm</option>,
  <option value="19:10">7:20pm</option>,
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

