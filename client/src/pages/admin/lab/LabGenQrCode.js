import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/Navbar/AdminNav"

import ButtonRB from '@mui/material/Button';

import QRCode from "qrcode";


const LabGenQrCode = () => {

    const [url, setUrl] = useState(`https://vbi-utcc-lab.netlify.app/lab/booking/lists/`)
    const [qrcode, setQrcode] = useState()

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


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col">

                    <div className="row">

                        <div className="col-md-4 pb-3 m-3">

                            <h1>QR Code Generator</h1>
                            <h4>Enter Lab Name</h4>
                            <input
                                type="text"
                                placeholder=''
                                className="inputQRCode"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                            <div className="m-5">
                                <ButtonRB variant="contained" color="success" onClick={GenerateQRCode} >
                                    Generate
                                </ButtonRB>
                            </div>
                            {/* <button onClick={GenerateQRCode} className="buttonGenerateQRCode">Generate</button> */}
                            {qrcode && <>
                                <div className="m-5">
                                    <img src={qrcode} style={{ width: '500px', height: '500px', marginTop: '5' }} />
                                </div>

                                <a href={qrcode} download="qrcode.png" className="aQRCode" >
                                    <ButtonRB variant="contained" color="success">
                                    Download
                                </ButtonRB>
                                </a>
                            </>
                            }


                        </div>


                    </div>

                </div>
            </div>
        </div>
    );
};

export default LabGenQrCode;
