/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useNavigate } from "react-router-dom";
import LabBookingForm from "../forms/LabBookingForm";

import { makeBooking } from "../../functions/bookings";
import { getLabBookings } from "../../functions/bookings";
import { readUser } from "../../functions/bookings";
import { incrementBooked } from "../../functions/bookings";

import { toast } from 'react-toastify';
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";

import { useParams } from 'react-router-dom';
import cryptoRandomString from 'crypto-random-string';


var initialState = {
  timeStart: "",
  timeEnd: "",
  title: "",
  bookedBy: "Tanawut M",
  description: "Open House Event",
  position: "",
  purpose: "",
  dateStart: "",
  tel: "",
  pin: `${cryptoRandomString({ length: 6, type: 'numeric' })}`,

};


const SingleBookingCard = ({ lab }) => {

  // router
  const { slug } = useParams()

  const navigate = useNavigate();

  const { labName } = lab;
  const [values, setValues] = useState(initialState)

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    return () => {
      setValues();
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Values Data ===>", values);
    const newTimeStart = parseInt(values.timeStart);
    const newTimeEnd = parseInt(values.timeEnd);
    const newDateStart = values.dateStart;


    let bookingTimeClash = false;
    let bookingSameDate = false;
    let wrongTime = false;
    let behindTime = false;
    let sameDateAndTimeClash = false;
    let sameDateAndNotimeClash = false;
    let maxBookedUser = false;
    let datePast = false;
    let userNotAdmin = false;
    let roleUser = false;

    if (!values.dateStart) {
      window.alert('Please Select Date')
      navigate(0)
    }

    if (values.dateStart) {
      console.log("dateStart ===>", values.dateStart)
      var c = new Date();
      var cr = c.toISOString().substring(0, 10);
      console.log("Current ===>", cr)

      var dateInput = new Date(`${values.dateStart}`);
      var currentDate = new Date(`${cr}`)

      if (dateInput < currentDate) {
        datePast = true
      }
    }

    if (values) {

      readUser(user._id).then(res => {
        const max = res.data.maxBooked;
        console.log("Get Check User Bookings Amount ===>", max);
        if ( user.role === "user") {
         // window.alert("Role User")
          roleUser = true;

        }
        if ( roleUser && max >= 3) {
          maxBookedUser = true;
        }

      })

      const pinCode = values.pin;
      const valuesDateCurrent = new Date();
      const valuesFromUser = values.dateStart;

      if (pinCode.length === 6) {

        if (values.position === 'Admin' && user.role !== 'admin') {

          userNotAdmin = true;
        }
        // check values from user timeStart can't over than timeEnd
        if (newTimeStart < newTimeEnd) {


          getLabBookings(lab._id, user.token).then(labBookingsData => {

            labBookingsData.data.forEach(function (value, index) {
              //    console.log('forEach with Index ===>', '%d: %s', index, value);
              const ExisDateStart = moment(value.dateStart).format('YYYY-MM-DD');
              const ExisTimeStart = value.timeStart;
              const ExisTimeEnd = value.timeEnd;
              console.log("exisDateStart ===>", ExisDateStart);
              if (ExisDateStart === newDateStart) {
                /*       console.log(`Oh Wow Found ExisDateStart index at ${index} === newDateStart`)
                       console.log("Value at index ====>", value);                                        */
                bookingSameDate = true;
                if (
                  // eg. newTime-endTime 10:00 - 12:00 , exisTime-endTime 8:00 - 13:00
                  newTimeStart >= ExisTimeStart && newTimeStart < ExisTimeEnd ||
                  // eg. exitsTime-endTime 11:00 - 15:00 , 11:00 - 14:00
                  ExisTimeStart >= newTimeStart && ExisTimeStart < newTimeEnd) {
                  /*    console.log("Hey !! We Found Booking SameDate and TimeClash !! Noooo");
                        console.log(`And index at ${index} We have Time Clash`)                        */
                  sameDateAndTimeClash = true

                }

              }
            });

            if (sameDateAndTimeClash) {
              toast.error(`SameDate And Time Clash, Please Select a new time...`, {
                position: toast.POSITION.TOP_CENTER
              });

            }

            if (maxBookedUser) {
              toast.error(`Out Of Limit Bookings (3)`, {
                position: toast.POSITION.TOP_CENTER
              });
            }

            if (datePast) {
              toast.error(`Invalid Date, Date entered can't be less than current date.`, {
                position: toast.POSITION.TOP_CENTER
              });
            }

            if (userNotAdmin) {
              toast.error(`You Are Not Admin.`, {
                position: toast.POSITION.TOP_CENTER
              });
            }

            if (!sameDateAndNotimeClash && !maxBookedUser && !datePast && !userNotAdmin) {
              console.log("User ID When Booking ===>", user._id);

              incrementBooked(user._id, user.token).then(res => {
                console.log("Increment Booked User", res.data)
              })

              makeBooking(slug, values, user.token)
                .then((response) => {
                  console.log("Data After submit form ===>", response.data);
                  //   navigate(0)
                  toast.success(`Booked Success, You Can Check PIN in E-mail`, {
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

            /* else {
               console.log("User ID When Booking ===>", user._id);
 
               incrementBooked(user._id, user.token).then(res => {
                 console.log("Increment Booked User", res.data)
               })
 
               makeBooking(slug, values, user.token)
                 .then((response) => {
                   console.log("Data After submit form ===>", response.data);
                   //   navigate(0)
                   toast.success(`Booked Success, You Can Check PIN in E-mail`, {
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

          });

        }

        // invalid time when user enter timeStart > timeEnd
        if (newTimeStart > newTimeEnd) {
          toast.error("Start Time can't over than End Time, Please Try again... !", {
            position: toast.POSITION.TOP_CENTER
          });
        }

        if (newTimeStart === newTimeEnd) {
          toast.error("Start Time can't Equal End Time, Please Try again... !", {
            position: toast.POSITION.TOP_CENTER
          });
        }

      } else {
        window.alert("Something wrong when generate pinCode, Please Book Again");

      }

    }

  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target.name, " ----- ", e.target.value);
    console.log("Values ==>", values);
  };


  return (
    <>
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
