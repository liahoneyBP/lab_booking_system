import React from 'react'

import { startTimeSelectOptions, endTimeSelectOptions } from '../../helpers/timeSelections';
import { Select } from 'antd';
import { DatePicker, Space } from 'antd';
import { Input } from 'antd';
const { Option } = Select;



const LabBookingForm = ({handleSubmit, handleChange, values}) => 
{

  
return (
    <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Start Time</label>
              <Select name="startTime" style={{ width:100}} className="m-2">
                {startTimeSelectOptions.map(option => {
                  return option
                })}
              </Select>
            
              <label>End Time</label>
              <Select name="startTime" style={{ width:100}} className="m-2">
                {endTimeSelectOptions.map(option => {
                  return option
                })}
              </Select>
            </div>

            <div className="form-group">
            <label>Date</label> <br/>
              <Space direction="vertical" size={12}>
                <DatePicker showTime />
    
              </Space>
            </div>

            <div className="form-group">
               <label>Title</label>
                <Input
                    type="text"
                    name="title"
                    className="form-control"
                      
                   />
                </div>

                <div className="form-group">
               <label>Description</label>
                <Input
                    type="text"
                    name="description"
                    className="form-control"
                      
                   />
                </div>



            <button className="btn btn-outline-info">BOOK</button>
          </form>

)
}

export default LabBookingForm ;