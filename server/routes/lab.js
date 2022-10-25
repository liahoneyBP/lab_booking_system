const express = require("express");
const router = express.Router();
const Lab = require("../models/lab");

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
    makeBooking,
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




// Make a booking
router.put('/makebooking/lab/:slug', authCheck, async(req, res) => {
  try {
    if (req.body.labName) {
      req.body.slug = slugify(req.body.labName);
    }
    const booked = await Lab.findOneAndUpdate(
      { slug: req.params.slug },
      {
        $addToSet: {
          bookings: {
            user: req.body.user,
           ...req.body
          }
        }
      }, { new: true }
    ).exec();
    res.json(booked)

  } catch (err) {
    console.log('LAB BOOKED ERROR ---->', err)
    // return res.status(400).send('Lab Update Failed')
    res.status(400).json({
      err: err.message,
    });
  }
})







module.exports = router;
