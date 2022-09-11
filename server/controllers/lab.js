const Lab = require("../models/lab");

exports.create = async (req, res) => {

}

exports.getlabs = async (req, res) => {
  // let all = await Hotel.find({ from: {$gte: new Date()} })
  let all = await Lab.find({ })
   .limit(24)
   .select('-image.data').populate('createdBy')
   .exec();
  // console.log(all);
   res.json(all);
}

exports.read = async (req,res) => {

}

exports.remove = async (req,res) => {

}

exports.update = async (req,res) => {

}

exports.image = async (req,res) => {

}






/*
   create,
   getlabs,
   read,
   remove,
   update,
   image,

   */