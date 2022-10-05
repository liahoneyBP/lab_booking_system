import React, { useState } from "react";
import AdminNav from "../../../components/Navbar/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createLab} from "../../../functions/lab";
import LabCreateForm from "../../../components/forms/LabCreateForm"
import FileUpload from "../../../components/forms/FileUpload"
import { LoadingOutlined } from "@ant-design/icons"



const LabUpdate = () => {

  // redux
  const { user } = useSelector((state) => ({...state}));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
            <h4> Lab Update</h4>
          
        </div>
      </div>
    </div>
  );
};

export default LabUpdate;
