const Lab = require("../models/lab");
const fs = require("fs");
const slugify = require("slugify");


exports.create = async (req, res) => {

  try {
    console.log(req.body);
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

const handleType = async (req, res, type) => {
  const labs = await Lab.find({ type })
    .exec();

  res.json(labs);
}

// Search / Filter
exports.searchFilters = async (req, res) => {
  const { query, capacity, building, floor, type } = req.body

  if (query) {
    console.log('query --->', query)
    await handleQuery(req, res, query);
  }

  // capcacity [30, 40, 50]
  if (capacity !== undefined) {
    console.log('capacity --->', capacity)
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

  if (type) {
    console.log("type --->", type);
    await handleType(req, res, type);
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
}


const handleCheckInStatus = async (req, res, isCheckin) => {
  const labs = await Lab.aggregate([
    {
      $match: {
        "bookings.isCheckin": isCheckin
      }
    },
    {
      "$unwind": "$bookings"
    },
    
    { $sort: { "bookings.createdAt": -1 } }

  ])
    .exec();

  res.json(labs);
}


const handlePosition = async (req, res, position) => {
  const labs = await Lab.aggregate([
    {
      $match: {
        "bookings.position": position
      }
    },
    {
      "$unwind": "$bookings"
    },
    
    { $sort: { "bookings.createdAt": -1 } }

  ])
    .exec();

  res.json(labs);
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





// 
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


// 
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


exports.getLabBookingsBySlug = async (req, res) => {
  const labBooks = await Lab.findOne(
    { slug: req.params.slug }
  )
    .exec();
  res.json(labBooks.bookings);
  console.log("getLabBookings by slug in Backend ===>", labBooks.bookings);
}




exports.removeBooking = async (req, res) => {

  console.log("BOOKING ID in Backend is ===>", req.body.bodyBookingId);
  console.log("LAB ID in Backend is ===>", req.body.bodyLabId);

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
  )
  res.json(deleted)
  // console.log("LAB ID in Backend is ===>", req.body.bodyLabId);
  console.log("After Backend response ===>", deleted);
}





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



exports.checkIn = async (req, res) => {
  try {
    const labSlug = req.params.slug;
    const bookingId = req.params.bookingId;

    console.log("labSlug in Backend is ===>", labSlug);
    console.log("BOOKING ID Slug in Backend is ===>", bookingId);
    console.log("Req.body.pinCode in Backind ===>", req.body.pinbody);

    const checkInConfirm = await Lab.findOneAndUpdate(
      { slug: labSlug },
      { $set: { "bookings.$[el].isCheckin": 'Confirm' } },
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




