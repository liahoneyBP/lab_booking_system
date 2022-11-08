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
  getBookingsID,
  getLabBookingsIDparams,
  updateBooking,
} = require("../controllers/lab");
const { default: slugify } = require("slugify");

// routes

// create lab
router.post("/create-lab", authCheck, adminCheck, create);

// get all labs
router.get("/labs/:count", listAll);

// read lab id
router.get("/lab/:labId", read);


router.get("/labslug/:slug", readSlug);


// search
router.post('/search/filters', searchFilters)
router.post('/search/filters/userbookings', searchFiltersUserBookings)

// image lab
router.get('/lab/image/:labId', image);


// update lab
router.put("/update-lab/:slug", authCheck, adminCheck, update);

// remove lab
router.delete("/remove-lab/:slug", authCheck, adminCheck, remove);



router.post('/getUserBookings', getUserBookings);

router.get('/getAllUserBookings', getAllUserBookings);

router.post('/getLabBookings', getLabBookings);

router.get('/getLabBookingsBySlug/:slug', getLabBookingsBySlug);


// remove booking
router.put("/removeBooking", authCheck, removeBooking);


router.post("/lab/booking/lists/:slug", labBookingLists);


// checkIn booking
router.put("/lab/booking/checkin/:slug/:bookingId", authCheck, checkIn);



router.get('/getBookingsID/:slug', getBookingsID);


// get Booking Id in Booking Update page By Admin
router.get('/getLabBookingsIDparams/:labId/:bookingId', authCheck, adminCheck, getLabBookingsIDparams)



// Update bookingId
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
        subject: `Your Pin => ${req.body.pin}`,
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
