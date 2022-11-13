import React from "react";
import { Select } from "antd";

import SelectR from 'react-select';
import makeAnimated from "react-select/animated";



const LabUpdateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
}) => {

  // destructure
  const {
    labName,
    building,
    details,
    floor,
    capacity,
  } = values;

  const optionsEquipment = [
    { value: 'PC', label: 'PC' },
    { value: 'PROJECTOR', label: 'PROJECTOR' },
    { value: 'WHITEBOARD', label: 'WHITEBOARD' },
    { value: 'MAC', label: 'MAC' },
    { value: 'TELEVISION', label: 'TELEVISION' },
  ]




  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Lab Name</label>
        <input
          type="text"
          name="labName"
          className="form-control"
          value={labName}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Building</label>
        <input
          type="number"
          name="building"
          className="form-control"
          value={building}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Details</label>
        <input
          type="text"
          name="details"
          className="form-control"
          value={details}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Floor</label>
        <input
          type="number"
          name="floor"
          className="form-control"
          value={floor}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Capacity</label>
        <input
          type="number"
          name="capacity"
          className="form-control"
          value={capacity}
          onChange={handleChange}
        />
      </div>

      
    
      <div className="form-group">
        <label>Equipment </label><span></span>
        <SelectR
          isMulti = {true}
          options={optionsEquipment}
          closeMenuOnSelect={false}
          onChange={(e) => setValues({ ...values, equipment: e })}
          />
      </div>

      <button className="btn btn-outline-info mt-5">Save</button>
    </form>
  );
};

export default LabUpdateForm;
