const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
    create,
    getlabs,
    read,
    remove,
    update,
    image,
  } = require("../controllers/lab");

// routes
// get all labs
router.get("/labs", getlabs);

// read lab id
router.get("/lab/:labId", read);

// image lab
router.get('/lab/image/:labId', image);

// create lab
router.post("/create-lab", authCheck, adminCheck, create);

// update lab
router.put("/update-lab/:labId", authCheck, adminCheck, update);

// remove lab
router.delete("/lab/:labId", authCheck, adminCheck, remove);


module.exports = router;
