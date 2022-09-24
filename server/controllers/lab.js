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

exports.image = async (req,res) => {
   
}

// listAll labs
exports.listAll = async (req, res) => {
  let labs = await Lab.find({})
   .limit(parseInt(req.params.count))
   .sort([["createdAt"]])
   .exec();
  res.json(labs);
}

exports.read = async (req,res) => {
   let lab = await Lab.findById(req.params.labId)
  .select('-image.data')
  .exec();
  console.log('SINGLE LAB', lab);
  res.json(lab);

}

exports.remove = async (req,res) => {
  try {
    const deleted = await Lab.findOneAndRemove({
      labId: req.params.labId,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.staus(400).send("Lab delete failed");
  }

}

exports.update = async (req,res) => {
  Lab.findOneAndUpdate(req.body)
   .then(lab => {
     res.status(201).json(lab)
   })
   .catch(error => {
     res.status(400).json({ error })
   })


}

const handleQuery = async (req, res, query) => {
  const labs = await Lab.find({ $text : { $search : query}})

  res.json(labs);
}

// Search / Filter
exports.searchFilters = async(req, res) => {
  const {query} = req.body

  if (query) {
    console.log('query', query)
    await handleQuery(req, res, query);
  }
}







/*
   create,
   getlabs,
   read,
   remove,
   update,
   image,

   */