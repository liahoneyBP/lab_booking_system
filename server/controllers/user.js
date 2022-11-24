const User = require("../models/user");
const fs = require("fs");
const slugify = require("slugify");
const nodemailer = require('nodemailer');



exports.readUser = async (req, res) => {
    const userId = req.body.userIdBody;
    let user = await User.findById(userId)
        .select('-image.data')
        .exec();
    console.log('SINGLE USER', user);
    res.json(user);

}


exports.incrementBooked = async (req, res) => {
    const userId = req.body.userIdBody;
    console.log("User ID in Backend ===>", userId);
    let increment = await User.updateOne(
        {_id: userId},
        { $inc: { maxBooked: 1 } }
    )
    console.log('increment booked', increment);
    res.json(increment);

}




    