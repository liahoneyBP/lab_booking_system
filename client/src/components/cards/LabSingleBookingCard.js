/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "antd/lib/card/Card";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from "react-router-dom";
import LabImgDefault from "../../images/LabUtcc_Default.jpg"
import LabBookingForm from "../forms/LabBookingForm";
import { formatTime } from "../../helpers/timeSelections";

import { makeBooking } from "../../functions/bookings";
import { toast } from "react-toastify";

import {  useParams } from 'react-router-dom';


const initialState = {
  timeStart: "",
  timeEnd: "",
  title: "",
  bookedBy: "",
  description: "",
  position: "",
  purpose: "",
  dateStart: "",
  dateEnd: "",

};


const SingleBookingCard = ({ lab }) => {
   // router
   // eslint-disable-next-line no-undef
   const { slug } = useParams()
  
  const navigate = useNavigate();

  const { images, labName, details, capacity, _id } = lab;


  const [values, setValues] = useState(initialState)
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));


  const handleSubmit = (e) => {
    e.preventDefault();
    makeBooking(slug, values, user.token)
      .then((response) => {
        console.log(response);
        window.alert(`You already booked Lab ${response.data.labName} ! `);
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
    

    navigate("/mybookings")
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target.name, " ----- ", e.target.value);
    console.log("Values ==>", values);
  };

  return (
    <>

      <div className="col-md-7">
        {images && images.length ? (<Carousel showArrows={true} autoPlay infiniteLoop>
          {images && images.map((i) =>
            <img
              src={i.url}
              key={i.public_id} />)}
        </Carousel>) : (
          <Card cover={<img src={LabImgDefault} className="mb-3" />}></Card>
        )}
      </div>

      <div className="col-md-5">
        <h1 className="bg-dark p-3 text-white">BOOKING {labName}</h1>
        <LabBookingForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          values={values}
          setValues={setValues}
          lab={lab}
          user={user}
        />
      </div>
    </>
  );
};

export default SingleBookingCard;
