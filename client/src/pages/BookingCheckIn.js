import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useParams } from 'react-router-dom';


import { checkIn } from "../functions/checkin";
import { getBookingsById } from "../functions/bookings";

import { Space } from "antd";
import moment from "moment";

import { toast } from "react-toastify";


import Button from '@mui/material/Button';



import ButtonRB from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useNavigate } from "react-router-dom";

import { usePinInput } from 'react-pin-input-hook'





const BookingCheckIn = () => {

    const navigate = useNavigate();

    let { user } = useSelector((state) => ({ ...state }));
    const { slug } = useParams()
    const { bookingId } = useParams()



    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // for Pin Input
    const [values, setValues] = React.useState(['', '', '', '', '', ''])
    const [error, setError] = React.useState(false)

    const { fields } = usePinInput({
        values,
        onChange: setValues,
        error,

    })

    const handleSubmit = () => {
        // Check if there is at least one empty field. If there is, the input is considered empty.
        if (values.includes('')) {
            // Setting the error.
            setError(true)
            // We set the focus on the first empty field if `error: true` was passed as a parameter in `options`.
        }
        const pinInput = values.join("");
        const pinCode = pinInput.toString();
        console.log("Values ===>", values);
        console.log("This Lab  ===>", slug);
        console.log("This Booking Id ===>", bookingId);
        console.log("This pinCode send ===>", pinCode);

        getBookingsById(slug, bookingId)
        .then((res) => {
            console.log("Get Bookings By Id in front ==>", res.data);
            const getPinCode = res.data[0].bookings[0].pin;
            console.log("Pin Code From User Input ===>", pinCode);
            console.log("Pin Code For Check ===>", getPinCode);

           if ( getPinCode === pinCode) {
                console.log("PinCode match !")
                checkIn(pinCode, slug, bookingId, user.token)
                .then((res) => {
                    console.log("After Hit Api CHECK IN ===>", res.data);
                    //window.alert('Check-In Success')
                    toast.success(`Check In Success`, {
                        position: toast.POSITION.TOP_CENTER
                      });

                    navigate('/mybookings');
                })
            
            } else {
                toast.error(`PinCode for check in is invalid, Please Try Again...`, {
                    position: toast.POSITION.TOP_CENTER
                  });
            } 
            
        })
                
    }
    


    

    useEffect(() => {
    });
  
    return (

        <>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-1">

                    </div>

                    <div className="col-md-8 m-3">
                        
                         <h1>Hello Check-in this booking</h1>
                         <Modal show={show} onHide={handleClose} dialogClassName="my-modal">
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Enter Your Code...</Modal.Title>
                                                </Modal.Header>

                                                <Modal.Body>
                                                    <div class="d-flex justify-content-center">
                                                        <form >
                                                            <div>
                                                                <Space >
                                                                    {fields.map((propsField, index) => (
                                                                        <input type="text" key={index} {...propsField} />
                                                                    ))}
                                                                </Space>
                                                            </div>

                                                            <ButtonRB onClick={handleSubmit} type='button'>Send Check-In </ButtonRB>
                                                        </form>
                                                    </div>

                                                </Modal.Body>

                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose}>
                                                        Close
                                                    </Button>
                                                    <Button variant="primary" onClick={handleClose}>
                                                        X
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                    </div>
                    {/* <div>
                    <p>test user bookings</p>
                    {JSON.stringify(userBookings)}
                </div> */}
                </div>

            </div>
        </>

    )
};

export default BookingCheckIn;
