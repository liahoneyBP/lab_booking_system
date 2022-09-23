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
    res.status(400).send("Create Lab Failed");
  }

}


exports.image = async (req,res) => {
   
}


exports.getlabs = async (req, res) => {
  // let all = await Lab.find({ from: {$gte: new Date()} })
  let all = await Lab.find({ })
   .limit(24)
   .select('-image.data')
   .exec();
  // console.log(all);
   res.json(all);
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







/*
   create,
   getlabs,
   read,
   remove,
   update,
   image,

   */