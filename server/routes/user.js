const express = require("express");
const router = express.Router();
const Lab = require("../models/lab");
const nodemailer = require('nodemailer');

const momentTimezone = require('moment-timezone')

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  readUser,
  incrementBooked,
  reduceBooked,
} = require("../controllers/user");
const { default: slugify } = require("slugify");

router.get("/user", (req, res) => {
  res.json({
    data: "hey you hit user API endpoint",
  });
});

// read User id 
router.post("/readUser", readUser);

// incrementBooked
router.put("/incrementBooked", authCheck, incrementBooked);

// reduceBooked
router.put("/reduceBooked", authCheck, reduceBooked);



module.exports = router;
