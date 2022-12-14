import React, { useState } from "react";
import AdminNav from "../../../components/Navbar/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createLab } from "../../../functions/lab";
import LabCreateForm from "../../../components/forms/LabCreateForm"
import FileUpload from "../../../components/forms/FileUpload"
import { LoadingOutlined } from "@ant-design/icons"
import { useParams } from 'react-router-dom';



const initialState = {
  labName: "15201C",
  building: "15",
  details: "ห้องแล็บใหม่",
  floor: "2",
  capacity: "50",
  images: [],
  qrcode: ``,
  equipment: [],
  bookings: [],
}

const LabCreate = () => {
  const { slug } = useParams()
  
  const [values, setValues] = useState(initialState)
  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

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
    
    console.log(e.target.name, " ----- ", e.target.value);
    console.log("Values ==>", values);
    
  }

  

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? <LoadingOutlined className="text-danger h1" /> : <h4>Lab create</h4>}
          <hr />

          {JSON.stringify(values.images)}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <LabCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
          />

        </div>



      </div>
    </div>
  );
};

export default LabCreate;
