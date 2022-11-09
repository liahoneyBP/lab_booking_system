import React, { useState } from "react";
import AdminNav from "../../../components/Navbar/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createLab } from "../../../functions/lab";
import LabCreateForm from "../../../components/forms/LabCreateForm"
import FileUpload from "../../../components/forms/FileUpload"
import { LoadingOutlined } from "@ant-design/icons"
import { useParams } from 'react-router-dom';

import QRCode from "qrcode";

const initialState = {
  labName: "",
  building: "5",
  details: "ห้องแล็บ Test",
  floor: "5",
  capacity: "50",
  images: [],
  qrcode: ``,
  equipment: {},
  bookings: [],
}

const LabCreate = () => {
  const { slug } = useParams()
  


  const [values, setValues] = useState(initialState)
  const [loading, setLoading] = useState(false);

  const [url, setUrl] = useState(`http://localhost:3000/lab/booking/lists/${values.labName}`)
  const [qrcode, setQrcode] = useState()

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  const GenerateQRCode = () => {
    QRCode.toDataURL(url, {
      width: 800,
      margin: 1,
      color: {
        dark: '#ffffffff',
        light: '#000000ff'
      }
    }, (err, url) => {
      if (err) return console.error(err)

      console.log("URL ==>", url)
      setQrcode(url)
    })
  }


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
          />


           <div>
            <h1>QR Code Generator</h1>
            <input
              type="text"
              placeholder=''
              className="inputQRCode"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button onClick={GenerateQRCode} className="buttonGenerateQRCode">Generate</button>
            {qrcode && <>
              <img src={qrcode} />
              <a href={qrcode} download="qrcode.png" className="aQRCode" >Download</a>
            </>
            }

          </div> 


        </div>



      </div>
    </div>
  );
};

export default LabCreate;
