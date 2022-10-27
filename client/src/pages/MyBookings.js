import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from 'antd';

import { useSelector, useDispatch } from "react-redux";
import { getUserBookings } from "../functions/bookings";

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { useParams } from 'react-router-dom';

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
        dataIndex: '',
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
        title: 'Cancel',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <DeleteOutlined  className='text-danger m-3'/>
          </Space>
        ),
      },
    

];


const MyBookings = () => {


    const [userBookings, setUserBookings] = useState([]);

    let { user } = useSelector((state) => ({ ...state }));


    const dataWithAge = userBookings.map((item) => ({
        ...item,
        age: Math.floor(Math.random() * 6) + 20,
    }))

    const modifiedData = dataWithAge.map(({ description, ...item }) => ({
        ...item,
        id: item._id,
        description: description,
    }))

    console.log("modifiedData =>", modifiedData);




    useEffect(() => {
        getUserBook()
    }, [])


    const getUserBook = () => {
        getUserBookings(user.email).then(userBokingsData => {
            console.log("USER Email from front is ==>", user.email);
            setUserBookings(userBokingsData.data);

        });
    };


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">

                </div>

                <div className="col-md-8 m-3">
                    <h2 className="m-5">My Bookings</h2>

                    <Table
                        columns={columns}
                        dataSource={modifiedData} />


                </div>

                <div>
                    <p>test user bookings</p>
                    {JSON.stringify(userBookings)}
                </div>

            </div>


        </div>
    )
}

export default MyBookings;