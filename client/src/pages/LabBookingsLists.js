import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLabBookingLists } from "../functions/bookings";
import { useParams } from 'react-router-dom';

import moment from "moment";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { CalendarOutlined, FieldTimeOutlined } from "@ant-design/icons"

import ButtonRB from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { usePinInput, PinInputActions } from 'react-pin-input-hook'

import { InputNumber, Space } from 'antd';

import { Link } from "react-router-dom";







const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const LabBookingsLists = () => {

    const [listBookings, setListBookings] = useState([]);

    let { user } = useSelector((state) => ({ ...state }));

    const { slug } = useParams()

    //const { slug } = match.params;

    

    useEffect(() => {
        loadAllListsBookings();
        console.log("slug ==>", slug)
    }, [slug]);

    const loadAllListsBookings = () => {
    console.log("User Email in Front ===>", user.email)
        getLabBookingLists(slug, user.email).then((res) => setListBookings(res.data));
    }


    return (

        <>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-1">

                    </div>

                    <div className="col-md-8 m-3">
                        <h2 className="m-5">Hello, {user.name}, Choose your booked for Check In</h2>
                        <h4 className="m-5">This is your booked in {slug.toUpperCase()} room</h4>
                        {
                            listBookings.map((a) => {

                                return (
                                    <Card sx={{ minWidth: 275, m: 5 }}>
                                        <CardContent >
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                Check-In status - {a.bookings.isCheckin} <br />
                                                 {a.bookings.bookedBy}
                                            </Typography>
                                            <Typography variant="h5" component="div">
                                                {a.bookings.description}
                                                {/* be{bull}nev{bull}o{bull}lent */}
                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                {a.labName}
                                            </Typography>
                                            <Typography variant="body2">
                                                {moment(a.bookings.dateStart).format('YYYY-MM-DD')} { } { } <CalendarOutlined />
                                                <br />
                                                {a.bookings.timeStart.toString().slice(0, -2) + ":" + a.bookings.timeStart.toString().slice(-2)} - { }
                                                {a.bookings.timeEnd.toString().slice(0, -2) + ":" + a.bookings.timeEnd.toString().slice(-2)} { } <FieldTimeOutlined />

                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <ButtonRB variant="primary">
                                                <Link to={`/lab/booking/lists/${slug}/${a.bookings._id}`}>
                                                    Check In
                                                </Link>

                                            </ButtonRB>
                                            
                                        </CardActions>
                                    </Card>
                                )
                            })
                        }
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

export default LabBookingsLists;
