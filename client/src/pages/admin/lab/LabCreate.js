import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/Navbar/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createLab} from "../../../functions/lab";


const LabCreate = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">Lab create form</div>
      </div>
    </div>
  );
};

export default LabCreate;
