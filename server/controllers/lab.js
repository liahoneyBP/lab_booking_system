const Lab = require("../models/lab");
const fs = require("fs");
const slugify = require("slugify");
const nodemailer = require('nodemailer');


exports.create = async (req, res) => {

  try {
    console.log("Req.body ===>", req.body);
    req.body.slug = slugify(req.body.labName);
    const newLab = await new Lab(req.body).save();
    res.json(newLab);
    
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create product failed");
    res.status(400).json({
      err: err.message,
    });
  }

}

exports.image = async (req, res) => {

}

// listAll labs
exports.listAll = async (req, res) => {
  let labs = await Lab.find({})
    .limit(parseInt(req.params.count))
    .sort([["createdAt"]])
    .exec();
  res.json(labs);
}

exports.read = async (req, res) => {
  let lab = await Lab.findById(req.params.labId)
    .select('-image.data')
    .exec();
  console.log('SINGLE LAB', lab);
  res.json(lab);

}

exports.readSlug = async (req, res) => {
  const lab = await Lab.findOne({ slug: req.params.slug })
    .exec();
  res.json(lab);
}

exports.remove = async (req, res) => {
  try {
    const deleted = await Lab.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Lab delete failed");
  }

}

exports.update = async (req, res) => {
  try {
    if (req.body.labName) {
      req.body.slug = slugify(req.body.labName);
    }
    const updated = await Lab.findOneAndUpdate(
      { slug: req.params.slug }, req.body, { new: true }
    ).exec();
    res.json(updated)
  } catch (err) {
    console.log('LAB UPDATE ERROR ---->', err)
    // return res.status(400).send('Lab Update Failed')
    res.status(400).json({
      err: err.message,
    });
  }

}

const handleQuery = async (req, res, query) => {
  const labs = await Lab.find({ $text: { $search: query } })

  res.json(labs);
}

/*
const handleCapacity = async (req, res, capacity) => {
  try {
    let labs = await Lab.find({
      capacity: {
        $gte: capacity[0],
        $lte: capacity[1],
      }
    })
      .exec();

    res.json(labs);

  } catch (err) {
    console.log(err);
  }
}
*/

const handleCapacity = async (req, res, capacity) => {
  const labs = await Lab.find({ capacity })
    .exec();

  res.json(labs);
}

const handleBuilding = async (req, res, building) => {
  const labs = await Lab.find({ building })
    .exec();

  res.json(labs);
}

const handleFloor = async (req, res, floor) => {
  const labs = await Lab.find({ floor })
    .exec();

  res.json(labs);
}

const handleEquipment = async (req, res, equipment) => {
  const labs = await Lab.aggregate([
    {
      "$match": {
        "equipment.value": equipment
      }
    },
    { $sort: { "bookings.updateddAt": -1 } }

  ])
  console.log('Equipment Filter BACKEND ===>', labs);

  res.json(labs);
}

// Search / Filter
exports.searchFilters = async (req, res) => {
  const { query, capacity, building, floor, equipment } = req.body

  if (query) {
    console.log('query --->', query)
    await handleQuery(req, res, query);
  }

  // capcacity [30, 40, 50]
 /* if (capacity !== undefined) {
    console.log('capacity --->', capacity)
    await handleCapacity(req, res, capacity);
  }
  */

  if (capacity) {
    console.log("capacity --->", capacity);
    await handleCapacity(req, res, capacity);
  }

  if (building) {
    console.log("building --->", building);
    await handleBuilding(req, res, building);
  }

  if (floor) {
    console.log("floor --->", floor);
    await handleFloor(req, res, floor);
  }

  if (equipment) {
    console.log("equipment --->", equipment);
    await handleEquipment(req, res, equipment);
  }

}


const handleQueryUserBookings = async (req, res, query) => {
  const labs = await Lab.find(
    { $text: { $search: query } }
  )

  res.json(labs);
}

const handleLabName = async (req, res, labName) => {
  const labs = await Lab.aggregate([
    {
      $match: {
        labName: labName
      }
    },
    {
      "$unwind": "$bookings"
    },

    { $sort: { "bookings.createdAt": -1 } }

  ])
    .exec();

  res.json(labs);
  console.log("LABNAME FILTER AFTER API ==>",labs);
}


const handleCheckInStatus = async (req, res, isCheckin) => {
  const labs = await Lab.aggregate([
    {
      "$unwind": "$bookings"
    },
    {
      "$match": {
        "bookings.isCheckin": isCheckin
      }
    },
    { $sort: { "bookings.updateddAt": -1 } }

  ])
  res.json(labs);
  console.log('isCheckin API ===>',labs )
}



const handlePosition = async (req, res, position) => {
  const labs = await Lab.aggregate([
    {
      "$unwind": "$bookings"
    },
    {
      "$match": {
        "bookings.position": position
      }
    },
    { $sort: { "bookings.createdAt": -1 } }

  ])
  res.json(labs);
  console.log('POSITION API ===>',labs )
}

// Search / Filter / userBookings
exports.searchFiltersUserBookings = async (req, res) => {
  const { query, labName, isCheckin, position } = req.body

  /* if (query) {
     console.log('query --->', query)
     await handleQueryUserBookings(req, res, query);
   } */

  if (labName !== undefined) {
    console.log('labName --->', labName)
    await handleLabName(req, res, labName);
  }

  if (isCheckin !== undefined) {
    console.log('isCheckin --->', isCheckin)
    await handleCheckInStatus(req, res, isCheckin);
  }

  if (position !== undefined) {
    console.log('position --->', position)
    await handlePosition(req, res, position);
    
  }


}





// get user bookings data to display my bookings page
exports.getUserBookings = async (req, res) => {

  let getBookings = await Lab.aggregate([
    {
      "$unwind": "$bookings"
    },
    {
      "$match": {
        "bookings.user.email": req.body.currentUserEmail
      }
    },
    { $sort: { "bookings.createdAt": -1 } }

  ])

  res.json(getBookings);
  console.log("User Email in Backend ===>", req.body.currentUserEmail);
  console.log("get user bookings MyBookings Page ==>", getBookings);
}


// get All user bookings in all room in database to display Schedule Page
exports.getAllUserBookings = async (req, res) => {
  let getAllBookings = await Lab.aggregate([
    {
      "$unwind": "$bookings"
    },
    { $sort: { "bookings.createdAt": -1 } }
  ])
  res.json(getAllBookings);
  console.log("get All bookings krubbb ==>", getAllBookings);
}


// get Bookings of current Lab when user submit form for check time exists...
exports.getLabBookings = async (req, res) => {

  let getLabBookings = await Lab.findById(
    { _id: req.body.currentlabId }
  )
  res.json(getLabBookings.bookings);
  console.log("LAB ID in Backend is ===>", req.body.currentlabId);
  console.log("get lab bookings when user submit in BACKEND ==>", getLabBookings.bookings);
}


// get bookings data specific room by slug params in url to display specific bookings data in that room
exports.getLabBookingsBySlug = async (req, res) => {
  const labBooks = await Lab.findOne(
    { slug: req.params.slug }
  )
    .exec();
  res.json(labBooks.bookings);
  console.log("getLabBookings by slug in Backend ===>", labBooks.bookings);
}




exports.removeBooking = async (req, res) => {

 /* console.log("BOOKING ID in Backend is ===>", req.body.bodyBookingId);
  console.log("LAB ID in Backend is ===>", req.body.bodyLabId);
  console.log("userEmailinTable in Backend ===>", req.body.userEmailinTable);
  */

  console.log("All Value after user hit api Remove ===>", req.body);

  console.log("booking id backend ===>", req.body.id);
  console.log("lab id backend ===>", req.body.labId);
  console.log("BookedBy backend ===>", req.body.bookedBy);

  const bookingId = req.body.id;
  const labId = req.body.labId;
  const bookedBy = req.body.bookedBy;
  const labName = req.body.labName;
  const dateStart = req.body.dateStart;
  const timeStart = req.body.timeStart;
  const timeEnd = req.body.timeEnd;
  const description = req.body.description;
  const userEmail = req.body.userEmail;


  let deleted = await Lab.findOneAndUpdate({ _id: labId },
    {
      $pull: {
        bookings: {
          _id: bookingId
        }
      }
    },
    { safe: true, new: true },
  );

  // for send pinCode to user email
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "labbook022@gmail.com",
      pass: "xoffjnnwcsgfhhkz"
    }
  })

  let details = {
    from: "labbook022@gmail.com",
    to: userEmail,
    subject: `Hi ${bookedBy} Your Bookings ID => ${bookingId} at ${labName} has been cancelled.`,
    text: `Your Bookings ID => ${bookingId} has been cancelled.
          Title Of Meeting => ${description}
          At => ${labName}
          Date => ${dateStart}
          Time => ${timeStart.toString().slice(0, -2)} : ${timeStart.toString().slice(-2)} - ${timeEnd.toString().slice(0, -2)} : ${timeEnd.toString().slice(-2)}
       Cancelled.
          `
  }

  mailTransporter.sendMail(details, (err)=> {
    if (err) {
      console.log("nodemailer error", err)
    } else {
      console.log(`Email has send PIN to ==> ${req.user.email} `);
    }
  })


  res.json(deleted)
  // console.log("LAB ID in Backend is ===>", req.body.bodyLabId);
  console.log("After Backend response ===>", deleted);
}

/*
exports.userRemoveBooking = async (req, res) => {

  console.log("BOOKING ID in Backend is ===>", req.body.bodyBookingId);
  console.log("LAB ID in Backend is ===>", req.body.bodyLabId);
  console.log("userEmailinTable in Backend ===>", req.body.userEmailinTable);

  const bookingId = req.body.bodyBookingId;
  const labId = req.body.bodyLabId;


  let deleted = await Lab.findOneAndUpdate({ _id: labId },
    {
      $pull: {
        bookings: {
          _id: bookingId
        }
      }
    },
    { safe: true, new: true },
  );

  // for send pinCode to user email
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "labbook022@gmail.com",
      pass: "xoffjnnwcsgfhhkz"
    }
  })

  let details = {
    from: "labbook022@gmail.com",
    to: req.body.userEmailinTable,
    subject: `Your Bookings ID => ${req.body.bodyBookingId} has been cancelled.`,
    text: `Your Bookings ID => ${req.body.bodyBookingId} has been cancelled. `
  }

  mailTransporter.sendMail(details, (err)=> {
    if (err) {
      console.log("nodemailer error", err)
    } else {
      console.log(`Email has send PIN to ==> ${req.user.email} `);
    }
  })


  res.json(deleted)
  // console.log("LAB ID in Backend is ===>", req.body.bodyLabId);
  console.log("After Backend response ===>", deleted);
}
*/





// display booking list that room when user scan check-in page
exports.labBookingLists = async (req, res) => {
  console.log("User Email in Backend ===>", req.body.emailbody)
  const lists = await Lab.aggregate([
    {
      $match: {
        slug: req.params.slug
      }
    },
    {
      "$unwind": "$bookings"
    },
    {
      "$match": {
        "bookings.user.email": req.body.emailbody
      }
    },
    { $sort: { "bookings.createdAt": -1 } }

  ])

  res.json(lists);
  console.log("slug in Backend ===>", req.params.slug)
  console.log("lists  in Backend ===>", lists);
}


/*
.update(
  { _id: docId, "messages.senderId": friendId },
  {
    $set: { "messages.$[elem].read": true }
  },
  {
    multi: true,
    strict: false,
    arrayFilters: [{ "elem.senderId": friendId }]
  },
  (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Something error occured" + err })
    } else {
      return res.status(200).json({ message: "Successfully", result })
    }
  }
)
*/

/*
.findOneAndUpdate({slug: req.params.slug, bookings: {$elemMatch: {id: bookingId}}},
  {$set: {'bookings.$.pin': req.body.pinbody,
          }}, // list fields you like to change
  {'new': true, 'safe': true, 'upsert': true});
  */


// checkIn booking
exports.checkIn = async (req, res) => {
  try {
    const labSlug = req.params.slug;
    const bookingId = req.params.bookingId;

    console.log("labSlug in Backend is ===>", labSlug);
    console.log("BOOKING ID Slug in Backend is ===>", bookingId);
    console.log("Req.body.pinCode in Backind ===>", req.body.pinbody);

    const checkInConfirm = await Lab.findOneAndUpdate(
      { slug: labSlug },
      { $set: { "bookings.$[el].isCheckin": 'Confirmed' } },
      {
        arrayFilters: [{ "el.pin": req.body.pinbody }],
      },
    );
    console.log("After Backend response ===>", checkInConfirm);
    res.json(checkInConfirm);
    
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }

}

// get booking data for check pinCode in current BookingId when user try to check-in
exports.getBookingsById = async (req, res) => {
  
  const bookingsbyId = await Lab.find({
    slug: req.params.slug
  },
  {
    "bookings": {
      "$elemMatch": {
        "_id": req.params.bookingId
      }
    }
  })

  res.json(bookingsbyId);
  console.log("slug in Backend ===>", req.params.slug)
  console.log("get Bookings by Id  in Backend ===>", bookingsbyId);
}


// get Booking Id in Booking Update page By Admin
exports.getLabBookingsIDparams = async (req, res) => {
  const data = await Lab.find({
    "_id": req.params.labId
  },
  {
    "bookings": {
      "$elemMatch": {
        "_id": req.params.bookingId
      }
    }
  })
  res.json(data);
  console.log("LAB ID in Backend ===>", req.params.labId)
  console.log("Booking ID in Backend ===>", req.params.bookingId)
  console.log("get Bookings by Id  in Backend ===>", data);
}


// Update bookingId By Admin
exports.updateBooking = async (req, res) => {
  const labId = req.params.labId;
  const bookingId = req.params.bookingId;
  console.log("REQ.BODY ===>", req.body);
  console.log("REQ. USER ===>", req.user);
  try { 
    const updated = await Lab.findOneAndUpdate(
      { _id: labId, "bookings._id": bookingId },
      {$set: {
        "bookings.$.timeStart" : req.body.timeStart,
        "bookings.$.timeEnd": req.body.timeEnd,
        "bookings.$.bookedBy" : req.body.bookedBy,
        "bookings.$.description": req.body.description,
        "bookings.$.position" : req.body.position,
        "bookings.$.purpose": req.body.purpose,
        "bookings.$.dateStart" : req.body.dateStart,
        "bookings.$.user": req.user,
    }},
      {new: true}
    );
    res.json(updated)
    console.log("UPDATED BACKEND RESPONSE ===>", updated);
  } catch (err) {
    console.log('BOOKING UPDATE ERROR ---->', err)
    // return res.status(400).send('Lab Update Failed')
    res.status(400).json({
      err: err.message,
    });
  }

}




