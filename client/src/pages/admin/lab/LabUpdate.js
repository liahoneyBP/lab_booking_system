import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/Navbar/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getLab } from "../../../functions/lab";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

import { useParams } from 'react-router-dom';


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


const LabUpdate = () => {

  const [values, setValues] = useState(initialState);
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

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Product update</h4>
          {JSON.stringify(values)}
          <hr />
        </div>
      </div>
    </div>
  );
};

export default LabUpdate;
