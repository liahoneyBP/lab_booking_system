/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useNavigate } from "react-router-dom";
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
  pin: `${cryptoRandomString({ length: 6, type: 'numeric' })}`,

};




const SingleBookingCard = ({ lab }) => {

  // router
  // eslint-disable-next-line no-undef
  const { slug } = useParams()

  const navigate = useNavigate();

  const {  labName } = lab;
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


    if (values) {
      console.log("Pin . length ===> ", values.pin.length);
      const pinCode = values.pin;
      // check PinCode.length === 6 then can make api
      if (pinCode.length === 6) {

        // check values from user timeStart can't over than timeEnd
        if (newTimeStart < newTimeEnd) {
          console.log("newTimeStart ===>", newTimeStart);
          console.log("newTimeEnd ===>", newTimeEnd);

          console.log("newDateStart ===>", newDateStart);

          console.log("Ok Right ! very good timeStart < timeEnd ")


          getLabBookings(lab._id, user.token).then(labBookingsData => {
            console.log("Lab ID from front is ==>", lab._id);
            console.log("Lab Bookings data API (Existing Data)", labBookingsData.data);

            console.log("Values current ===>", values);

            labBookingsData.data.forEach(function (value, index) {
              console.log('forEach with Index ===>', '%d: %s', index, value);
              const ExisDateStart = moment(value.dateStart).format('YYYY-MM-DD');
              const ExisTimeStart = value.timeStart;
              const ExisTimeEnd = value.timeEnd;
              console.log("exisDateStart ===>", ExisDateStart);
              if (ExisDateStart === newDateStart) {
                console.log(`Oh Wow Found ExisDateStart index at ${index} === newDateStart`)
                console.log("Value at index ====>", value);
                bookingSameDate = true;
                if (
                  newTimeStart >= ExisTimeStart && newTimeStart < ExisTimeEnd ||
                  ExisTimeStart >= newTimeStart && ExisTimeStart < newTimeEnd) {
                  console.log("Hey !! We Found Booking SameDate and TimeClash !! Noooo");
                  console.log(`And index at ${index} We have Time Clash`)
                  sameDateAndTimeClash = true

                }

              }
            });

            if (sameDateAndTimeClash) {
              toast.error(`SameDate And Time Clash, Please Select a new time...`, {
                position: toast.POSITION.TOP_CENTER
              });

            } else {

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
          
          });

        }

        // invalid time when user enter timeStart > timeEnd
        if (newTimeStart > newTimeEnd) {
          toast.error("Start Time can't over than End Time, Please Try again... !", {
            position: toast.POSITION.TOP_CENTER
          });
        }

      } else {
        window.alert("Something wrong when generate pinCode, Please Book Again");

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
