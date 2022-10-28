import React from 'react'

import { formatTime, startTimeSelectOptions, endTimeSelectOptions } from '../../helpers/timeSelections';

import { DatePicker, Space } from 'antd';
import { Input } from 'antd';
import { Radio } from 'antd';

import { Link } from 'react-router-dom';

const LabBookingForm = ({ handleSubmit, handleChange, values, setValues, user, lab }) => {

  // 
  const {
    description,
    bookedBy
  } = values;

  return (
    <form onSubmit={handleSubmit}>

      <div className="form-group">
        <label>Start Time </label>
        <select
          name="timeStart"
          className="form-control"
          onChange={handleChange}
        >
          <option>Please select</option>
          <option value="830">8:30am</option>,
          <option value="920">9:20am</option>,
          <option value="1010">10:10am</option>,
          <option value="1100">11:00am</option>,
          <option value="1130">11:30am</option>,
          <option value="1220">12:20am</option>,
          <option value="1310">13:10pm</option>,
          <option value="1400">14:00pm</option>,
          <option value="1200">12:00pm</option>,
          <option value="1310">1:10pm</option>,
          <option value="1400">2:00pm</option>,
          <option value="1430">2:30pm</option>,
          <option value="1520">3:20pm</option>,
          <option value="1610">4:10pm</option>,
          <option value="1700">5:00pm</option>,
          <option value="1730">5:30pm</option>,
          <option value="1820">6:20pm</option>,
        </select>
      </div>

      <div className="form-group">
        <label>End Time </label>
        <select
          name="timeEnd"
          className="form-control"
          onChange={handleChange}
        >
          <option>Please select</option>
          <option value="920">9:20am</option>,
          <option value="1010">10:10am</option>,
          <option value="1100">11:00am</option>,
          <option value="1130">11:30am</option>,
          <option value="1220">12:20am</option>,
          <option value="1310">13:10pm</option>,
          <option value="1400">14:00pm</option>,
          <option value="1200">12:00pm</option>,
          <option value="1310">1:10pm</option>,
          <option value="1400">2:00pm</option>,
          <option value="1430">2:30pm</option>,
          <option value="1520">3:20pm</option>,
          <option value="1610">4:10pm</option>,
          <option value="1700">5:00pm</option>,
          <option value="1730">5:30pm</option>,
          <option value="1820">6:20pm</option>,
          <option value="1910">7:20pm</option>,
        </select>
      </div>



      <div className="form-group">
        <label>From Date</label> <br />
        <Space direction="vertical">
          <DatePicker
            onChange={(date, dateString) =>
              setValues({ ...values, dateStart: dateString })
            }
          />

        </Space>
      </div>
      <div className="form-group">
        <label>To Date</label> <br />
        <Space direction="vertical">
          <DatePicker
            onChange={(date, dateString) =>
              setValues({ ...values, dateEnd: dateString })
            }
          />

        </Space>
      </div>

      <div className="form-group">
        <label>Book By</label>
        <input
          type="text"
          name="bookedBy"
          placeholder="Your Name"
          className="form-control"
          value={bookedBy}
          onChange={handleChange}

        />
      </div>

      <div className="form-group">
        <label>Position</label>
        <select
          name="position"
          className="form-control"
          onChange={handleChange}
        >
          <option>Please select</option>
          <option value="Lecturer">Lecturer</option>
          <option value="Student">Student</option>
        </select>
      </div>

      <div className="form-group">
        <label>Purpose</label>
        <select
          name="purpose"
          className="form-control"
          onChange={handleChange}
        >
          <option>Please select</option>
          <option value="Schedule Class">Schedule Class</option>
          <option value="Special Event">Special Event</option>
        </select>
      </div>


      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}

        />
      </div>


  
      <button className="btn btn-outline-info">BOOK</button>

      
    </form>

  )
}

export default LabBookingForm;