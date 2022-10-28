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
    }
  ])
  res.json(getBookings);
  console.log("User Email in Backend ===>", req.body.currentUserEmail);
  console.log("get user bookings MyBookings Page ==>", getBookings);
}


// 
exports.getAllUserBookings = async (req, res) => {
  let getAllBookings = await Lab.find({
    bookings: {
      $all: [
        { "$elemMatch": { email: "@", } },
      ]
    }
  }).select('-bookings.pin')
  
  res.json(getAllBookings);
  console.log("get All bookings krubbb ==>", getAllBookings);
}





