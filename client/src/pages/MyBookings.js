import React, { useEffect, useState } from "react";
import { Space, Table, Popconfirm, Button } from 'antd';

import { useSelector } from "react-redux";
import { getUserBookings } from "../functions/bookings";

import { toast } from "react-toastify";

import moment from "moment";

import { removeBooking } from "../functions/bookings";

import { useNavigate } from "react-router-dom";






const MyBookings = () => {

    const navigate = useNavigate();

    const [userBookings, setUserBookings] = useState([]);
    let { user } = useSelector((state) => ({ ...state }));


    useEffect(() => {
        getUserBook()

    }, [])


    const getUserBook = () => {
        getUserBookings(user.email).then(userBokingsData => {
            console.log("USER Email from front is ==>", user.email);
            console.log("User Bookings data from API", userBokingsData.data);
            setUserBookings(userBokingsData.data);
        });
    };


    const data = userBookings.map((item) => ({
        ...item,
        age: Math.floor(Math.random() * 6) + 20,

    }))

    const modifiedData = data.map(({ ...item }) => ({
        ...item,
        labId: item._id,
        id: item.bookings._id,
        bookedBy: item.bookings.bookedBy,
        dateStart: moment(item.bookings.dateStart).format('LL'),
        timeStart: item.bookings.timeStart,
        timeEnd: item.bookings.timeEnd,
        _id: item.labName,
        position: item.bookings.position,
        description: item.bookings.description,
        purpose: item.bookings.purpose,
        isCheckin: item.bookings.isCheckin,
        pin: item.bookings.pin,
        userEmail: item.bookings.user.email,
        createdAt: moment(item.bookings.createdAt).fromNow(),

    }
    ))


    // format for date console.log("data.map dateStart ===>", moment(item.bookings.dateStart).format(`YYYY,MM,DD,`)
    // console.log("data.map dateStart ===>", moment(item.bookings.dateStart).month())
    console.log("User Email in State  ===>", user.email);


    const handleDelete = (value) => {
        const dataSource = [...modifiedData];
        const filteredData = dataSource.filter((item) => item.id !== value.id);

        console.log("value.id in front is ===>", value.id);
        console.log("value.labId in front is ===>", value.labId);

        let answer = window.confirm(`Cancel This Booking (${value.description}, bookedBy ${value.bookedBy}) ?`)
        if (answer) {
            console.log('send delete request', value.id, value.labId);
            removeBooking(value.id, value.labId, user.token)
                .then((dataRemove) => {
                    console.log("Booking Id from front is ==>", value.id);
                    console.log("Lab Id from front is ==>", value.labId);
                    console.log("After hit API Remove Booking", dataRemove.data);
                    toast.error(`${value.description}, By ${value.bookedBy} is deleted `);
                })
                .catch(err => {
                    if (err.response.status === 400) toast.error(err.response.data);
                    console.log(err)
                })
        }


         navigate(0);
    }

    const columns = [
        {
            title: 'Bookings ID',
            dataIndex: 'id',
        },
        {
            title: 'User Booked By',
            dataIndex: 'bookedBy',
        },
        {
            title: 'User Email',
            dataIndex: 'userEmail',
        },
        {
            title: 'Date',
            dataIndex: 'dateStart',
        },
        {
            title: 'Time Start',
            dataIndex: 'timeStart',
        },
        {
            title: 'Time End',
            dataIndex: 'timeEnd',
        },
        {
            title: 'Lab',
            dataIndex: '_id',
        },
        {
            title: 'Position',
            dataIndex: 'position',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Purpose',
            dataIndex: 'purpose',
        },
        {
            title: 'Check In',
            key: 'isCheckin',
            dataIndex: 'isCheckin',

        },
        {
            title: 'PinCode',
            key: 'pin',
            dataIndex: 'pin',

        },
        {
            title: 'Booked At',
            dataIndex: 'createdAt',

        },
        {
            title: 'Cancel',
            key: 'action',
            render: (_, record) =>
                modifiedData.length >= 1 ? (
                    <Popconfirm
                        title="Are you sure want to Cancel this booking ?"
                        onConfirm={() => handleDelete(record)}
                    >
                        <Button danger type="primary">Cancel</Button>

                    </Popconfirm>
                ) : null,
        },

    ];

    return (

        <div className="container-fluid">
            <div className="row">
                <div className="col-md-1">

                </div>

                <div className="col-md-8 m-3">
                    <h2 className="m-5">My Bookings</h2>
                    <Table
                        columns={columns}
                        dataSource={modifiedData} />
                </div>
                {/* <div>
                    <p>test user bookings</p>
                    {JSON.stringify(userBookings)}
                </div> */}
            </div>


        </div>
    )
}

export default MyBookings;