import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/Navbar/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createLab} from "../../../functions/lab";

const initialState = {
    labName: '',
    building: '',
    details: '',
    floor: '',
    capacity: '',
    images: [],
    equipment: {},
    bookings: [],
}

const LabCreate = () => {
  const [values, setValues] = useState(initialState)

  // destructure
  const {labName, building, details, floor, capacity, images, equipment, bookings} = values;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    //
  }

  const handleChange = (e) => {
    e.preventDefault();
    //
  }
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Lab create</h4>
          <hr />

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
              <label>Details</label>
              <input
                type="text"
                name="details"
                className="form-control"
                value={details}
                onChange={handleChange}
              />
            </div>

            

            <button className="btn btn-outline-info">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LabCreate;
