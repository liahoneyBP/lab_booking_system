const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
    create,
    listAll,
    read,
    readSlug,
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


router.get("/labslug/:slug", readSlug);


// search
router.post('/search/filters', searchFilters)

// image lab
router.get('/lab/image/:labId', image);




// update lab
router.put("/update-lab/:labId", authCheck, adminCheck, update);

// remove lab
router.delete("/remove-lab/:slug", authCheck, adminCheck, remove);




module.exports = router;
