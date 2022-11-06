const express = require("express");
const router = express.Router();
const Lab = require("../models/lab");

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




router.get("/lab/booking/lists/:slug", labBookingLists);





// Function to calculate the duration of the hours between the start and end of the booking
/*const durationHours = (bookingStart, bookingEnd) => {
  // convert the UTC Date objects to Moment.js objeccts
  let startDateLocal = dateAEST(bookingStart)
  let endDateLocal = dateAEST(bookingEnd)
  // calculate the duration of the difference between the two times
  let difference = moment.duration(endDateLocal.diff(startDateLocal))
  // return the difference in decimal format
  return difference.hours() + difference.minutes() / 60
}
*/


// Function to convert UTC JS Date object to a Moment.js object in AEST
/*const dateAEST = date => {
  return momentTimezone(date).tz('Australia/Sydney')
} */


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
