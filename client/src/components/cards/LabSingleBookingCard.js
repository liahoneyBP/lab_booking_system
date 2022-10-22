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


const initialState = {
  startTime: "",
  endTime: "",
  title: "",
  description: "",
  position: ["Lecturer", "Student"],
  purpose: ["Schedule Class", "Special Event"],
  date: "",

};


const SingleBookingCard = ({ lab }) => {
  const navigate = useNavigate();

  const { images, labName, details, slug, capacity } = lab;

  const [values, setValues] = useState(initialState)
  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  const { labId, userId, timeStart, timeEnd, dateStart, dateEnd, purpose, position, description } = values;


  const handleSubmit = (e) => {
    e.preventDefault();
    // Data from input
    const formData = e.target.elements
    const labId = lab._id
    const userId = user._id
    // startDate data
    const timeStart = formatTime(formData.timeStart.value)
    const startDate = [...timeStart]
    // endDate data
    const timeEnd = formatTime(formData.timeEnd.value)
    const endDate = [...timeEnd]
    // Booking specifics
    const purpose = formData.purpose.value
    const position = formData.position.value
    const description = formData.description.value
    // onMakeBooking({ startDate, endDate, businessUnit, position, labId, userId, description })

    navigate("/mybookings")
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target.name, " ----- ", e.target.value);
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
        />
      </div>
    </>
  );
};

export default SingleBookingCard;
