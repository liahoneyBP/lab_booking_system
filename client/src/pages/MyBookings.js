import React, { useEffect, useState } from "react";
import { Space, Table } from 'antd';

import { useSelector } from "react-redux";
import { getUserBookings } from "../functions/bookings";

import {  DeleteOutlined } from '@ant-design/icons';

import { toast } from "react-toastify";

import moment from "moment";




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
        render: (_, record) => (
            <Space size="middle">
                <DeleteOutlined className='text-danger m-3' />
            </Space>
        ),
    },


];


const MyBookings = () => {

    const [userBookings, setUserBookings] = useState([]);
    let { user } = useSelector((state) => ({ ...state }));


    const data = userBookings.map((item) => ({
        ...item,
        age: Math.floor(Math.random() * 6) + 20,

    }))

    const modifiedData = data.map(({ description, ...item }) => ({
        ...item,
        id: item.bookings._id,
        bookedBy: item.bookings.bookedBy,
        dateStart : moment(item.bookings.dateStart).format('LL'),
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
    
    }))


    console.log("User Email in State  ===>", user.email);

    


    useEffect(() => {
        getUserBook()
        
    }, [])


    const getUserBook = () => {
        getUserBookings(user.email).then(userBokingsData => {
            console.log("USER Email from front is ==>", user.email);
            console.log("User Bookings data.bookings",userBokingsData.data);
            setUserBookings(userBokingsData.data);
        });
    };


    return (

        <div className="container-fluid">
            <div className="row">
                <div className="col-md-1">

                </div>

                <div className="col-md-9 m-3">
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