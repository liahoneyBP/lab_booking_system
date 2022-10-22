import React from 'react'

import { startTimeSelectOptions, endTimeSelectOptions } from '../../helpers/timeSelections';

import { DatePicker, Space } from 'antd';
import { Input } from 'antd';
import { Radio } from 'antd';


const LabBookingForm = ({ handleSubmit, handleChange, values, setValues }) => {
 
  // 
  const {
    description,
    position,
    purpose,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
      <label>Start Time</label>
        <select
          name="timeStart"
          style={{ width: 100 }}
          className="m-2"
          onChange={(value) => setValues({ ...values, timeStart: value })}
          >
          {startTimeSelectOptions.map(option => {
            return option
          })}
        </select>

        <label>End Time</label>
        <select
          name="timeEnd"
          style={{ width: 100 }}
          className="m-2"
          onChange={(value) => setValues({ ...values, timeEnd: value })}
          >
          {endTimeSelectOptions.map(option => {
            return option
          })}
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
        <label>Position</label>
        <br />
        <Radio.Group 
        name="position" 
        className="form" 
        onChange={handleChange.this}
        >
          {position.map((position) => (
            <Radio key={position} value={position}>
              {position}
            </Radio>
          ))}
        </Radio.Group>
      </div>

      <div className="form-group">
        <label>Purpose</label>
        <br />
        <Radio.Group 
        name="purpose" 
        className="form"
        onChange={handleChange.this}  
        >
          {purpose.map((purpose) => (
            <Radio key={purpose} value={purpose}>
              {purpose}
            </Radio>
          ))}
        </Radio.Group>
      </div>

      <div className="form-group">
        <label>Description</label>
        <Input
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