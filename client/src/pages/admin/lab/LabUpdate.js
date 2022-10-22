import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/Navbar/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getLab, updateLab } from "../../../functions/lab";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import LabUpdateForm from "../../../components/forms/LabUpdateForm";
import { useNavigate } from "react-router-dom";

import {  useParams } from 'react-router-dom';


const initialState = {
  labName: "",
  building: "",
  details: "",
  floor: "",
  capacity: "",
  images: [],
  equipment: [],
  bookings: [],
}


const LabUpdate = () => {

  const navigate = useNavigate();

  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  // router
  const { slug } = useParams()

  useEffect(() => {
    loadLab()
  }, [])

  const loadLab = () => {
    getLab(slug)
    .then(lab => {
    //   console.log('single lab', lab);
     setValues({...values, ...lab.data});  
  })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)

    updateLab(slug, values, user.token)
    .then((res) => {
      setLoading(false)
      toast.success(`${res.data.labName} is updated`);
      navigate("/admin/labs")
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
      toast.error(err.response.data.err);
    })

    //
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
        {loading ? <LoadingOutlined className="text-danger h1" /> : <h4>Lab Update</h4> }
          { /*JSON.stringify(values) */}

          <div className="p-3">
            <FileUpload
            values={values}
            setValues={setValues}
            setLoading={setLoading}
            />
          </div>


          <LabUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default LabUpdate;
