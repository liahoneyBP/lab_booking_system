import React from 'react'


import { DatePicker, Space } from 'antd';

import Button from '@mui/material/Button';

import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { Form, Segment } from 'semantic-ui-react'
import Select from 'react-select'

import 'semantic-ui-css/semantic.min.css'


const LabBookingForm = ({ handleSubmit, handleChange, values, setValues, user, lab}) => {

  // 
  const {
    description,
    bookedBy,
  } = values;

  const optionsTimeStart = [
    { value: '830', label: '8:30 AM' },
    { value: '920', label: '9:20 AM' },
    { value: '1010', label: '10:10 AM' },
    { value: '1100', label: '11:00 AM' },
    { value: '1130', label: '11:30 AM' },
    { value: '1220', label: '12:20 pm' },
    { value: '1310', label: '1:10 PM' },
    { value: '1400', label: '2:00 PM' },
    { value: '1430', label: '2:30 PM' },
    { value: '1520', label: '3:20 PM' },
    { value: '1610', label: '4:10 PM' },
    { value: '1700', label: '5:00 PM' },
    { value: '1730', label: '5:30 PM' },
    { value: '1820', label: '6:20 PM' },
  ]

  const optionsTimeEnd = [
    { value: '920', label: '9:20 AM' },
    { value: '1010', label: '10:10 AM' },
    { value: '1100', label: '11:00 AM' },
    { value: '1130', label: '11:30 AM' },
    { value: '1220', label: '12:20 pm' },
    { value: '1310', label: '1:10 PM' },
    { value: '1400', label: '2:00 PM' },
    { value: '1430', label: '2:30 PM' },
    { value: '1520', label: '3:20 PM' },
    { value: '1610', label: '4:10 PM' },
    { value: '1700', label: '5:00 PM' },
    { value: '1730', label: '5:30 PM' },
    { value: '1820', label: '6:20 PM' },
    { value: '1910', label: '7:10 PM' },
  ]

  const optionsPurpose = [
    { value: 'Schedule Class', label: 'Schedule Class' },
    { value: 'Special Event', label: 'Special Event' },
   
  ]

  const optionsPosition = [
    { value: 'Lecturer', label: 'Lecturer' },
    { value: 'Student', label: 'Student' },
    
  ]


  return (
    
    <Segment>
    <Form onSubmit={handleSubmit} >
      
      <div className="form-group">
        <label>Start Time </label><span><AccessTimeIcon/></span>
        <Select
          name="timeStart"
          className="form-control"
          onChange={(e) => setValues({ ...values, timeStart: e.value })}
          options={optionsTimeStart}
          required
          
        >
        </Select>
      </div>

      <div className="form-group">
        <label>End Time </label><span><AccessTimeIcon/></span>
        <Select
          name="timeEnd"
          className="form-control"
          onChange={(e) => setValues({ ...values, timeEnd: e.value })}
          options={optionsTimeEnd}
          required
          
        >
        </Select>
      </div>

      <div className="form-group">
        <label>Date</label> <br/>
        <Space direction="vertical">
          <DatePicker
           
            onChange={(date, dateString) =>
              setValues({ ...values, dateStart: dateString })
            }
          />

        </Space>
      </div>
      {/* <div className="form-group">
        <label>To Date</label> <br />
        <Space direction="vertical">
          <DatePicker
            onChange={(date, dateString) =>
              setValues({ ...values, dateEnd: dateString })
            }
          />

        </Space>
      </div> */}

      <div className="form-group">
        <label>Book By</label> 
        <input
          type="text"
          name="bookedBy"
          placeholder="Your Name"
          className="form-control"
          value={bookedBy}
          onChange={handleChange}
          required

        />
      </div>

      <div className="form-group">
        <label>Position</label>
        <Select
          name="position"
          className="form-control"
          options={optionsPosition}
          onChange={(e) => setValues({ ...values, position: e.value })}
          required
        >
          
        </Select>
      </div>

      <div className="form-group">
        <label>Purpose</label> 
        <Select
          name="purpose"
          className="form-control"
          options={optionsPurpose}
          onChange={(e) => setValues({ ...values, purpose: e.value })}
          required
        >

        </Select>
      </div>


      <div className="form-group">
        <label>Title of Event</label> 
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
          required

        />
      </div>


      <Button variant="contained" color="success" type="submit">
                 BOOK
              </Button>

             
    </Form>
    </Segment>

  )
}

export default LabBookingForm;