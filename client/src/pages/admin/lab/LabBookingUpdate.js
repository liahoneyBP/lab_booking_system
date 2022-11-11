import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/Navbar/AdminNav";

import { useSelector } from "react-redux";


import { useNavigate } from "react-router-dom";

import LabBookingForm from "../../../components/forms/LabBookingForm";
import { getLabBookingsIDparams } from "../../../functions/bookings";
import { getLabBookings } from "../../../functions/bookings";
import { UpdateBookingId } from "../../../functions/bookings";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ButtonRB from 'react-bootstrap/Button';

import moment from "moment"
import { toast } from "react-toastify";

import { CalendarOutlined, FieldTimeOutlined } from "@ant-design/icons"


import { useParams } from 'react-router-dom';


var initialState = {
    timeStart: "",
    timeEnd: "",
    title: "",
    bookedBy: "",
    description: "",
    position: "",
    purpose: "",
    dateStart: "",
};


const LabBookingUpdate = () => {

    const navigate = useNavigate();

    const [values, setValues] = useState(initialState);
    const [getBooking, setGetBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    // router
    const { slug } = useParams()
    const { labId } = useParams()
    const { bookingId } = useParams()




    useEffect(() => {
        console.log("labId ===>", labId);
        console.log("bookingId ===>", bookingId);
        getBookingIdbyparams();
    }, [])

    const getBookingIdbyparams = () => {
        getLabBookingsIDparams(labId, bookingId, user.token).then(res => {
            console.log("labId from front is ==>", labId);
            console.log("booking from front is ==>", bookingId);
            console.log("GET Bookings Id by params data from API ===>", res.data);
            setGetBookings(res.data);

        });
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        // do API
        console.log("Values Data ===>", values);
        const newTimeStart = parseInt(values.timeStart);
        const newTimeEnd = parseInt(values.timeEnd);
        const newDateStart = values.dateStart;


        let bookingTimeClash = false;
        let bookingSameDate = false;
        let wrongTime = false;
        let behindTime = false;
        let sameDateAndTimeClash = false;
        let sameDateAndNotimeClash = false;


        if (values) {
            console.log("Slug ===>", slug);
                // check values from user timeStart can't over than timeEnd
                if (newTimeStart < newTimeEnd) {
                    console.log("newTimeStart ===>", newTimeStart);
                    console.log("newTimeEnd ===>", newTimeEnd);

                    console.log("newDateStart ===>", newDateStart);

                    console.log("Ok Right ! very good timeStart < timeEnd ")


                    getLabBookings(labId, user.token).then(labBookingsData => {
                        console.log("Lab ID from front is ==>", labId);
                        console.log("Lab Bookings data API (Existing Data)", labBookingsData.data);

                        console.log("Values current ===>", values);

                        labBookingsData.data.forEach(function (value, index) {
                            console.log('forEach with Index ===>', '%d: %s', index, value);
                            const ExisDateStart = moment(value.dateStart).format('YYYY-MM-DD');
                            const ExisTimeStart = value.timeStart;
                            const ExisTimeEnd = value.timeEnd;
                            console.log("exisDateStart ===>", ExisDateStart);
                            if (ExisDateStart === newDateStart) {
                                console.log(`Oh Wow Found ExisDateStart index at ${index} === newDateStart`)
                                console.log("Value at index ====>", value);
                                bookingSameDate = true;
                                if (
                                    newTimeStart >= ExisTimeStart && newTimeStart < ExisTimeEnd ||
                                    ExisTimeStart >= newTimeStart && ExisTimeStart < newTimeEnd) {
                                    console.log("Hey !! We Found Booking SameDate and TimeClash !! Noooo");
                                    console.log(`And index at ${index} We have Time Clash`)
                                    sameDateAndTimeClash = true

                                }

                            }
                        });

                        if (sameDateAndTimeClash) {
                            toast.error(`SameDate And Time Clash, Please Select a new time...`, {
                                position: toast.POSITION.TOP_CENTER
                            });

                        } else {

                            UpdateBookingId(labId, bookingId, values, user.token)
                                .then((response) => {
                                    console.log("Data After submit form ===>", response.data);
                                    //   navigate(0)
                                    toast.success(`Updated Success`, {
                                        position: toast.POSITION.TOP_CENTER
                                    });

                                    navigate('/admin/dashboard');

                                })
                                .catch((err) => {
                                    console.log(err);
                                    if (err.response.status === 400) toast.error(err.response.data);
                                    toast.error(err.response.data.err);
                                })
                                

                        }

                    });

                }

                // invalid time when user enter timeStart > timeEnd
                if (newTimeStart > newTimeEnd) {
                    toast.error("Start Time can't over than End Time, Please Try again... !", {
                        position: toast.POSITION.TOP_CENTER
                    });
                }

            

        }


    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        console.log(e.target.name, " ----- ", e.target.value);
    };



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    
                    {/* {JSON.stringify(getBooking)} */}
                    {
                        getBooking.map((a) => {
                            return (
                                <>
                                <h3>Edit Booked Time {a.bookings[0].description}</h3>

                                <Card sx={{ minWidth: 275, mb: 2 }}>
                                    <CardContent >
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            Check-In status - {a.bookings[0].isCheckin} <br />
                                            {a.bookings[0].bookedBy}
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {a.bookings[0].description}

                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {slug.toUpperCase()}

                                        </Typography>
                                        <Typography variant="body2">
                                            {moment(a.bookings[0].dateStart).format('YYYY-MM-DD')} { } { } <CalendarOutlined />
                                            <br />
                                            {a.bookings[0].timeStart.toString().slice(0, -2) + ":" + a.bookings[0].timeStart.toString().slice(-2)} - { }
                                            {a.bookings[0].timeEnd.toString().slice(0, -2) + ":" + a.bookings[0].timeEnd.toString().slice(-2)} { } <FieldTimeOutlined />

                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <ButtonRB variant="primary">
                                            Test

                                        </ButtonRB>

                                    </CardActions>
                                </Card>
                                </>

                            )

                        })
                    }



                    { /*JSON.stringify(values) */}
                    <LabBookingForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        values={values}
                        setValues={setValues}
                        user={user}
                    />
                </div>
            </div>
        </div>
    );
};

export default LabBookingUpdate;
