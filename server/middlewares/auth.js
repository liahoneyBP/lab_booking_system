const admin = require("../firebase");

exports.authCheck = (req, res, next) => {
  console.log("REQ.HEADERS from Middleware -->", req.headers); // token
  next();
};
