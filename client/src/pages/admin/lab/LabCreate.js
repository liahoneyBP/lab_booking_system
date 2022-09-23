import React, { useState } from "react";
import AdminNav from "../../../components/Navbar/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createLab} from "../../../functions/lab";

const initialState = {
    labName: "15201QQ",
    building: "5",
    details: "ห้องแล็บ Test",
    floor: "5",
    capacity: "50",
    images: [],
    equipment: {},
    bookings: [],
}

const LabCreate = () => {
  const [values, setValues] = useState(initialState)

  // redux
  const { user } = useSelector((state) => ({...state}));

  // destructure
  const {labName, building, details, floor, capacity, images, equipment, bookings} = values;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    createLab(values, user.token)
      .then((response) => {
        console.log(response);
        window.alert(`${response.data.labName} is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    //console.log(e.target.name, " ----- ", e.target.value);
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
