const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
    create,
    listAll,
    read,
    remove,
    update,
    image,
    searchFilters,
  } = require("../controllers/lab");

// routes

// create lab
router.post("/create-lab", authCheck, adminCheck, create);

// get all labs
router.get("/labs/:count", listAll);

// read lab id
router.get("/lab/:labId", read);

// search
router.post('/search/filters', searchFilters)

// image lab
router.get('/lab/image/:labId', image);



// update lab
router.put("/update-lab/:labId", authCheck, adminCheck, update);

// remove lab
router.delete("/lab/:labId", authCheck, adminCheck, remove);


module.exports = router;
