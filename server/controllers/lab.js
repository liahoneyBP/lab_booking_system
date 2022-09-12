const Lab = require("../models/lab");
const fs = require("fs");

exports.create = async (req, res) => {
   Lab.create(req.body)
   .then(lab => {
     res.status(201).json(lab)
   })
   .catch(error => {
     res.status(400).json({ error })
   })
   

}

exports.image = async (req,res) => {
   
}


exports.getlabs = async (req, res) => {
  // let all = await Hotel.find({ from: {$gte: new Date()} })
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
  res.json(hotel);

}

exports.remove = async (req,res) => {

}

exports.update = async (req,res) => {

}







/*
   create,
   getlabs,
   read,
   remove,
   update,
   image,

   */