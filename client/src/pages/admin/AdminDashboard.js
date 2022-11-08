import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminNav from "../../components/Navbar/AdminNav"
import { Table, Popconfirm, Button } from 'antd';
import { useDispatch } from "react-redux";


import { getAllUserBookings } from "../../functions/bookings";
import { removeBooking } from "../../functions/bookings";
import { fetchUserBookingsbyFilter } from "../../functions/lab";

import moment from "moment";
import { toast } from "react-toastify";
import { Menu, Slider, Radio } from "antd"
import { DesktopOutlined, DownSquareOutlined  } from "@ant-design/icons";
import Search from "../../components/forms/Search";

import { useNavigate } from "react-router-dom";

import ButtonRB from 'react-bootstrap/Button';

const {SubMenu} = Menu;


const AdminDashboard = () => {
  const navigate = useNavigate();

  const [allUserBookings, setAllUserBookings] = useState([]);
  const [labs, setLabs] = useState([]);

  let { user } = useSelector((state) => ({ ...state }));

  const [show, setShow] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [ok, setOk] = useState(false);
  const [capacity, setCapacity] = useState([0, 0]);
  

  const [labsName, setLabsName] = useState([
    "15201A",
    "15201B",
    "1305A",
    "1305B",
    "1205A",
    "1205B",
    "LAB5",
    "LAB6",
  ]);
  const [labName, setLabName] = useState('')

  const [checkins, setCheckins] = useState([
    "Unconfirm",
    "Confirm",
  ]);
  const [checkin, setCheckin] = useState('')

  const [positions, setPositions] = useState([
    "Lecturer",
    "Student",
  ]);
  const [position, setPosition] = useState('')


  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;


  const fetchUserBookings = (arg) => {
    fetchUserBookingsbyFilter(arg).then((res) => {
      setAllUserBookings(res.data);
    });
  }

  // 2. load labs on user search input
  useEffect(() => {
    // console.log('load labs on user search input', text);
    const delayed = setTimeout(() => {
      if (!text) {
        return getAllBook();
      }
      fetchUserBookings({ query: text });
    }, 300)
    return () => clearTimeout(delayed);

  }, [text])

  // 3. load labs based on capacity range
  useEffect(() => {
    console.log('ok to request')
    fetchUserBookings({ capacity });
  }, [ok])


  // 4. load labs based on building
  const showLabName = () =>
  labsName.map((l) => (
      <Radio
        value={l}
        name={l}
        checked={l === labName}
        onChange={handleLabName}
        className="pb-1 pl-4 pr-4"
      >
        {l}
      </Radio>
    ))

  const handleLabName = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setLabName(e.target.value)
    fetchUserBookings({ labName: e.target.value });
  }


  // 4. load labs based on building
  const showCheckin = () =>
  checkins.map((c) => (
      <Radio
        value={c}
        name={c}
        checked={c === checkin}
        onChange={handleshowCheckin}
        className="pb-1 pl-4 pr-4"
      >
        {c}
      </Radio>
    ))

  const handleshowCheckin = (e) => {
   
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCheckin(e.target.value)
    fetchUserBookings({ isCheckin: e.target.value });
  }


  // 4. load labs based on building
  const showPosition = () =>
  positions.map((p) => (
      <Radio
        value={p}
        name={p}
        checked={p === position}
        onChange={handleshowPosition}
        className="pb-1 pl-4 pr-4"
      >
        {p}
      </Radio>
    ))

  const handleshowPosition = (e) => {
    
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPosition(e.target.value)
    fetchUserBookings({ position: e.target.value });
  }




  const data = allUserBookings.map((item) => ({
    ...item,
    age: Math.floor(Math.random() * 6) + 20,

  }))

  // format time to use in Scheduler UI
  // way 1 ==> new Date(2018, 5, 25, 9, 35)
  // format for date console.log("data.map dateStart ===>", moment(item.bookings.dateStart).format(`YYYY,MM,DD,`)
  // format for time console.log( " get all elements, except last 2 elements ====>", item.bookings.timeStart.toString().slice(0,-2),
  // "get last 2 elements  ===>", item.bookings.timeStart.toString().slice(-2), )

  // way 2 ==> 22-10-31T08:45
  // arr.slice(Math.max(arr.length - 2, 0)) for last 2 elements
  // `${moment(item.bookings.dateStart).format('YYYY-MM-DD')}` for 2022-10-31T00:00:00.000+00:00 to 2022-10-31
  // `${item.bookings[0].timeStart.toString().split('',[2]).toString().replace(',','')}` for timeStart in database 830 use .toString().split() to ['10','20'] 11 50 
  //  and convert back to sting (08,30) and replace , by '' ===> 8 30 and then can user in my scheduler UI library

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
    isCheckin: item.bookings.isCheckin,
    pin: item.bookings.pin,
    userEmail: item.bookings.user.email,
    createdAt: moment(item.bookings.createdAt).fromNow(),

  }
  ))

  useEffect(() => {
    getAllBook()
  }, [])



  const getAllBook = () => {
    getAllUserBookings().then(userAllBokingsData => {
      // get Api All bookings in database and store in state
      setAllUserBookings(userAllBokingsData.data);
      console.log("ALL USER BOOKINGS Admin Dashboard Page ===>", userAllBokingsData.data);

    });
  };


  const handleDelete = (value) => {
    const dataSource = [...modifiedData];
   // const filteredData = dataSource.filter((item) => item.id !== value.id);

    console.log("value.id in front is ===>", value.id);
    console.log("value.labId in front is ===>", value.labId);
    console.log("value.userEmail from dynamic data is ===>", value.userEmail);

    let answer = window.confirm(`Reject This Booking (${value.description}, bookedBy ${value.bookedBy}) ?`)
    if (answer) {
      console.log('send delete request', value.id, value.labId);
      removeBooking(value.id, value.labId, value.userEmail, user.token)
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
      title: "CheckIn",
      dataIndex: "isCheckin",
      render(text, record) {
        return {
          props: {
            style: { color: text === "Unconfirm" ? "red" : "green" },
          },
          children:
            <Button style={{ color: text === "Unconfirm" ? "red" : "green" }}>
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
      title: 'Approval',
      key: 'action',
      render: (_, record) =>
        modifiedData.length >= 1 ? (
          <Popconfirm
            title="Are you sure want to Reject this booking ?"
            onConfirm={() => handleDelete(record)}
          >
            <Button danger type="primary">Reject</Button>

          </Popconfirm>
        ) : null,
    },

  ];



  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-1 m-2">
          <AdminNav />
          <h4 className="text-dark p-3">Filter</h4>
          <hr />
          <Menu defaultOpenKeys={['1', '2', '3']} mode="inline">
            <SubMenu
              key="1"
              title={
                <span className="h6"><DownSquareOutlined /> Lab
                </span>}>
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showLabName()}
              </div>
            </SubMenu>

            <SubMenu
              key="2"
              title={
                <span className="h6"><DownSquareOutlined /> Check-In Status
                </span>}>
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showCheckin()}
              </div>
            </SubMenu>

            <SubMenu
              key="3"
              title={
                <span className="h6"><DownSquareOutlined /> Position
                </span>}>
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showPosition()}
              </div>
            </SubMenu>


    
          </Menu>
        </div>

        <div className="col-md-9 m-2">
        <h3>ALL USER BOOKINGS</h3>
        <hr />
          {/* <h5 className="text-dark p-3">Search/Filter</h5>
          <Search /> */}
        

        
          <div className="mt-3">
          <Table
            columns={columns}
            dataSource={modifiedData} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
