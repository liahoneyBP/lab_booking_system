import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { getUserBookings } from "../functions/bookings";
import { removeBooking } from "../functions/bookings";
import { reduceBooked } from "../functions/bookings";

import moment from "moment";

import { Table, Popconfirm, Button } from 'antd';
import { toast } from "react-toastify";
import ButtonRB from 'react-bootstrap/Button';


const MyBookings = () => {
    const navigate = useNavigate();

    const [userBookings, setUserBookings] = useState([]);
    const [show, setShow] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        getUserBook()
    }, [])


    const getUserBook = () => {
        getUserBookings(user.email).then(userBokingsData => {
         /*   console.log("USER Email from front is ==>", user.email);
            console.log("User Bookings data from API", userBokingsData.data); */
            setUserBookings(userBokingsData.data);
        });
    };

    const data = userBookings.map((item) => ({
        ...item,
     

    }))

    const modifiedData = data.map(({ ...item }) => ({
        ...item,
        labId: item._id,
        id: item.bookings._id,
        bookedBy: item.bookings.bookedBy,
        dateStart: moment(item.bookings.dateStart).format('LL'),
        timeStart: item.bookings.timeStart.toString().slice(0, -2) + ":" + item.bookings.timeStart.toString().slice(-2),
        timeEnd: item.bookings.timeEnd.toString().slice(0, -2) + ":" + item.bookings.timeStart.toString().slice(-2),
        _id: item.labName,
        position: item.bookings.position,
        description: item.bookings.description,
        purpose: item.bookings.purpose,
        tel: item.bookings.tel,
        isCheckin: item.bookings.isCheckin,
        pin: item.bookings.pin,
        userEmail: item.bookings.user.email,
        createdAt: moment(item.bookings.createdAt).format('LLL'),
        //  updatedAt: moment(item.bookings.createdAt).format('LLLL'),

    }
    ))


    // format for date console.log("data.map dateStart ===>", moment(item.bookings.dateStart).format(`YYYY,MM,DD,`)
    // console.log("data.map dateStart ===>", moment(item.bookings.dateStart).month())
    console.log("User Email in State  ===>", user.email);


    const handleDelete = (value) => {
        const dataSource = [...modifiedData];
        const filteredData = dataSource.filter((item) => item.id !== value.id);

      /*  console.log("value.id in front is ===>", value.id);
        console.log("value.labId in front is ===>", value.labId); */

        let answer = window.confirm(`Cancel This Booking (${value.description}, bookedBy ${value.bookedBy}) ?`)
        if (answer) {
          //  console.log('send delete request', value.id, value.labId);
          reduceBooked(user._id, user.token)
          .then((reduceBook) => {
            console.log("Reduce book =>", reduceBook);
          })
            removeBooking(value, user.token)
                .then((dataRemove) => {
                  /*  console.log("Booking Id from front is ==>", value.id);
                    console.log("Lab Id from front is ==>", value.labId);
                    console.log("After hit API Remove Booking", dataRemove.data); */
                    toast.error(`Deleted Book and Send Notification to user email`, {
                        position: toast.POSITION.TOP_CENTER
                    });

                    navigate(0);
                })
                .catch(err => {
                    if (err.response.status === 400) toast.error(err.response.data);
                    console.log(err)
                })
        }
    }

    const columns = [

        {
            title: 'Bookings ID',
            dataIndex: 'id',
        },
        {
            title: 'Title of Event',
            key: 'description',
            dataIndex: "description",

            render: (text) => (
                <>
                    <Button color="secondary">{text}</Button>

                </>
            )
        },
        {
            title: 'User Booked By',
            key: 'bookedBy',
            dataIndex: "bookedBy",

            render: (text) => (
                <>
                    <ButtonRB variant="text" onClick={handleShow}>
                        {text}
                    </ButtonRB>

                </>
            )
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
            title: 'Purpose',
            dataIndex: 'purpose',
        },
        {
            title: 'Tel',
            dataIndex: 'tel',
        },
        {
            title: "CheckIn",
            dataIndex: "isCheckin",
            render(text, record) {
                return {
                    props: {
                        style: { color: text === "Unconfirmed" ? "red" : "green" },
                    },
                    children:
                            <Button style={{ color: text === "Unconfirmed" ? "red" : "green" }}>
                                {text}
                            </Button>
                       
                };
            }
        },
        {
            title: 'PinCode',
            key: 'pin',
            dataIndex: "pin",

            render: (text) => (
                <>
                    <ButtonRB variant="dark" onClick={handleShow}>
                        {text}
                    </ButtonRB>

                </>
            )
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
        <>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-1">

                    </div>

                    <div className="col-md-8 m-3">
                        <h2 className="m-5">My Bookings</h2>
                        <div class="table-responsive">
                            <Table

                                columns={columns}
                                dataSource={modifiedData} />
                        </div>
                    </div>
                    {/* <div>
                    <p>test user bookings</p>
                    {JSON.stringify(userBookings)}
                </div> */}
                </div>


            </div>
        </>
    )
}

export default MyBookings;