import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLabBookingLists } from "../functions/bookings";
import { useParams } from 'react-router-dom';

const LabBookingsLists = () => {

    const [listBookings, setListBookings] = useState({});

    let { user } = useSelector((state) => ({ ...state }));

    const { slug } = useParams()

    //const { slug } = match.params;

    useEffect(() => {
        loadAllListsBookings();
        console.log("slug ==>", slug)
    }, [slug]);

    const loadAllListsBookings = () =>
        getLabBookingLists(slug).then((res) => setListBookings(res.data));



    return (

        <div className="container-fluid">
            <div className="row">
                <div className="col md-7 m-3">
                    <h1> Hello !! Lab Bookings Lists Page krubb !!!</h1>

                </div>

                <div className="col md-5 m-3">
                    <div>
                    <p>test user bookings</p>
                    {JSON.stringify(listBookings)}
                </div>

                </div>

            </div>

        </div>
    )
};

export default LabBookingsLists;
