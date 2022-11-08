const express = require("express");
const router = express.Router();
const Lab = require("../models/lab");
const nodemailer = require('nodemailer');

const momentTimezone = require('moment-timezone')

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  create,
  listAll,
  read,
  readSlug,
  remove,
  update,
  image,
  searchFilters,
  getUserBookings,
  getAllUserBookings,
  getLabBookings,
  getLabBookingsBySlug,
  removeBooking,
  labBookingLists,
  checkIn,
  searchFiltersUserBookings,
  getBookingsById,
  getLabBookingsIDparams,
  updateBooking,
} = require("../controllers/lab");
const { default: slugify } = require("slugify");

// routes

// create lab By Admin
router.post("/create-lab", authCheck, adminCheck, create);

// remove lab
router.delete("/remove-lab/:slug", authCheck, adminCheck, remove);

// update lab
router.put("/update-lab/:slug", authCheck, adminCheck, update);

// read lab id params
router.get("/lab/:labId", read);

// get all labs
router.get("/labs/:count", listAll);

// read lab by slug params
router.get("/labslug/:slug", readSlug);

// search
router.post('/search/filters', searchFilters)
router.post('/search/filters/userbookings', searchFiltersUserBookings)

// image lab
router.get('/lab/image/:labId', image);







// get user bookings data to display MyBookings page
router.post('/getUserBookings', getUserBookings);

// get All user bookings in all room in database to display Schedule Page
router.get('/getAllUserBookings', getAllUserBookings);

// get existing bookings data in that room to check Time Clash (When user submit form)
router.post('/getLabBookings', getLabBookings);

// get bookings data specific room by slug params in url to display specific bookings data in that room in Bookings Page
router.get('/getLabBookingsBySlug/:slug', getLabBookingsBySlug);

// remove booking (Cancel , Reject Book)
router.put("/removeBooking", authCheck, removeBooking);

// display booking list that room when user scan Check-in page
router.post("/lab/booking/lists/:slug", labBookingLists);

// checkIn booking (update status isCheckin in database when user enter valid pin)
router.put("/lab/booking/checkin/:slug/:bookingId", authCheck, checkIn);

// get booking data for check pinCode in current BookingId when user try to check-in
router.get('/getBookingsById/:slug/:bookingId', getBookingsById);

// get Booking Id in Booking Update page By Admin
router.get('/getLabBookingsIDparams/:labId/:bookingId', authCheck, adminCheck, getLabBookingsIDparams)

// Update booking (update in database when admin submit form) By Admin
router.put("/updateBooking/:labId/:bookingId", authCheck, adminCheck, updateBooking);



// Make a booking
router.put('/makebooking/lab/:slug', authCheck, async (req, res) => {
  try {
    if (req.body.labName) {
      req.body.slug = slugify(req.body.labName);

    }
    if (req.body) {
      console.log("Body data ===>", req.body);
     
      const booked = await Lab.findOneAndUpdate(
        { slug: req.params.slug },
        {
          $addToSet: {
            bookings: {
              user: req.user,
              labId: req.lab,
              //timeStart: dateAEST(req.body.timeStart).format('H.mm'),
              ...req.body
            }
          }
        }, { new: true, runValidators: true, context: 'query' }    
      ).exec();

      console.log("PinCode in Backend ===>", req.body.pin);
      console.log("userEmail in Backend ===>", req.user.email);
      
      // for send pinCode to user email
      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "labbook022@gmail.com",
          pass: "etlxmptqbswvujme"
        }
      })

      let details = {
        from: "labbook022@gmail.com",
        to: req.user.email,
        subject: `Hello ${req.body.bookedBy} ! This is Your Pin For Check-In => ${req.body.pin}`,
        text: `LAB UTCC Booked by ${req.body.bookedBy}
          Title Of Meeting => ${req.body.description}
          Pin => ${req.body.pin},
          Date => ${req.body.dateStart}
          Time => ${req.body.timeStart.toString().slice(0, -2)} : ${req.body.timeStart.toString().slice(-2)} - ${req.body.timeEnd.toString().slice(0, -2)} : ${req.body.timeEnd.toString().slice(-2)}
        `
      }

      mailTransporter.sendMail(details, (err)=> {
        if (err) {
          console.log("nodemailer error", err)
        } else {
          console.log(`Email has send PIN to ==> ${req.user.email} `);
        }
      })
      
      console.log("req.user ==>", req.user);
      res.json(booked)
      console.log("get Booked ===>", booked);

    }



  } catch (err) {
    console.log('LAB BOOKED ERROR ---->', err)
    // return res.status(400).send('Lab Update Failed')
    res.status(400).json({
      err: err.message,
    });
  }
})






module.exports = router;
