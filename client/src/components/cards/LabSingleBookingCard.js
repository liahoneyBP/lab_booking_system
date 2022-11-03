/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "antd/lib/card/Card";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from "react-router-dom";
import LabImgDefault from "../../images/LabUtcc_Default.jpg"
import LabBookingForm from "../forms/LabBookingForm";
import { makeBooking } from "../../functions/bookings";
import { getLabBookings } from "../../functions/bookings";
import { toast } from 'react-toastify';
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";

import { useParams } from 'react-router-dom';



import cryptoRandomString from 'crypto-random-string';


var initialState = {
  timeStart: "",
  timeEnd: "",
  title: "",
  bookedBy: "",
  description: "",
  position: "",
  purpose: "",
  dateStart: "",
  dateEnd: "",
  pin: `${cryptoRandomString({ length: 6, type: 'numeric' })}`,

};




const SingleBookingCard = ({ lab }) => {

  // router
  // eslint-disable-next-line no-undef
  const { slug } = useParams()

  const navigate = useNavigate();

  const { images, labName, details, capacity, _id } = lab;
  const [values, setValues] = useState(initialState)

  const [allUserBookings, setAllUserBookings] = useState([]);

  


  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    return () => {
      setValues();
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Values Data ===>", values);
    const newBookingStartTime = parseInt(values.timeStart);
    const newBookingEndTime = parseInt(values.timeEnd);
    const newBookingsDateStart = values.dateStart;


    let bookingTimeClash = false;
    let bookingSameDate = false;
    let firstBooking = false;

      

    if (values) {
      // check values from user timeStart can't over than timeEnd
      if (newBookingStartTime < newBookingEndTime) {
        console.log("newBookingStart time in new bookings ===>", newBookingStartTime);
        console.log("newBookingEnd time in new bookings ===>", newBookingEndTime);

        console.log("dateStart  in new bookings ===>", newBookingsDateStart);

        console.log("Ok Right ! very good timeStart < timeEnd ")



        getLabBookings(lab._id, user.token).then(labBookingsData => {
          console.log("Lab ID from front is ==>", lab._id);
          console.log("Lab Bookings data API (Existing Data)", labBookingsData.data);

          console.log("Values current ===>", values);


          labBookingsData.data.forEach(booking => {


            // Convert existing booking Date objects into number values
            let existingBookingStart = booking.timeStart
            let existingBookingEnd = booking.timeEnd

            let existingDateStart = moment(booking.dateStart).format('YYYY-MM-DD');

            console.log("Existing timeStart - timeEnd ===>", existingBookingStart, " - " , existingBookingEnd)
           
            console.log("Existing dateStart ===>", existingDateStart);

            // Check whether there is a clash between the new booking and the existing booking
                   
            // eslint-disable-next-line no-mixed-operators
            // ex. new ===> 10.10 - 12.20 , exis ===> 8.30 - 13.30
            if (newBookingStartTime >= existingBookingStart && newBookingStartTime < existingBookingEnd ||
              // eslint-disable-next-line no-mixed-operators
             
              existingBookingStart >= newBookingStartTime && existingBookingStart < newBookingEndTime 
      
              ) {
              // Switch the bookingClash variable if there is a clash
              return bookingTimeClash = true
              }
            

            if (newBookingsDateStart === existingDateStart) {
              return bookingSameDate = true

            }

            if ( !existingDateStart) {
              return firstBooking = true
            }


          })

         /*
          if (firstBooking ) {
            toast.success(`This is First Booking`, {
              position: toast.POSITION.TOP_CENTER
            });
            makeBooking(slug, values, user.token)
              .then((response) => {
                console.log("Data After submit form ===>", response.data);
                //   navigate(0)
                toast.success(`Booked Success`, {
                  position: toast.POSITION.TOP_CENTER
                });

                navigate(0);

              })
              .catch((err) => {
                console.log(err);
                if (err.response.status === 400) toast.error(err.response.data);
                toast.error(err.response.data.err);
              })

          }
          */

          // new book date
          if ( !bookingSameDate ) {
            toast.success(`This is First Booking of Room at the day ${values.dateStart}`, {
              position: toast.POSITION.TOP_CENTER
            });
            makeBooking(slug, values, user.token)
              .then((response) => {
                console.log("Data After submit form ===>", response.data);
                //   navigate(0)
                toast.success(`Booked Success`, {
                  position: toast.POSITION.TOP_CENTER
                });

                navigate(0);

              })
              .catch((err) => {
                console.log(err);
                if (err.response.status === 400) toast.error(err.response.data);
                toast.error(err.response.data.err);
              })

          }

          // book same date and Check time clash
          if (bookingSameDate && !bookingTimeClash) {
            toast.success(`This is Book the same Date and No time clash`, {
              position: toast.POSITION.TOP_CENTER
            });

            makeBooking(slug, values, user.token)
              .then((response) => {
                console.log("Data After submit form ===>", response.data);
                //   navigate(0)
                toast.success(`Booked Success`, {
                  position: toast.POSITION.TOP_CENTER
                });

                navigate(0);

              })
              .catch((err) => {
                console.log(err);
                if (err.response.status === 400) toast.error(err.response.data);
                toast.error(err.response.data.err);
              })

          } 

          // book same date and existing book
          if (bookingSameDate && bookingTimeClash) {
            toast.error(`เวลาทับกัน กรุณาจองใหม่`, {
              position: toast.POSITION.TOP_CENTER
            });
          } 



        });

      }

      // invalid time when user enter timeStart > timeEnd
      if (newBookingStartTime > newBookingEndTime) {
        toast.error("Start Time can't over than End Time, Please Try again... !", {
          position: toast.POSITION.TOP_CENTER
        });
      }

    }


    // navigate('/mybookings');
   // window.location.reload();
    // toast.success(`Booked Success`);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target.name, " ----- ", e.target.value);
    console.log("Values ==>", values);
  };



  

  return (
    <>

      {/* <div className="col-md-7">
        { {images && images.length ? (<Carousel showArrows={true} autoPlay infiniteLoop>
          {images && images.map((i) =>
            <img
              src={i.url}
              key={i.public_id} />)}
        </Carousel>) : (
          <Card cover={<img src={LabImgDefault} className="mb-3" />}></Card>
        )} 
  
      </div> */}

      <div className="">
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


      {/* <div>
        <p>TEST ALL BOOKINGS IN THIS LAB</p>
        {JSON.stringify(labBookings)}
      </div> */}



    </>
  );
}
  ;

export default SingleBookingCard;
