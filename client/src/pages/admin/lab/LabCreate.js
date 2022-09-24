import React, { useState } from "react";
import AdminNav from "../../../components/Navbar/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createLab} from "../../../functions/lab";
import LabCreateForm from "../../../components/forms/LabCreateForm"

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

          <LabCreateForm 
          handleSubmit={handleSubmit} 
          handleChange={handleChange} 
          values={values}
          />

          
        </div>
      </div>
    </div>
  );
};

export default LabCreate;
