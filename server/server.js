const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan")
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();



// app
const app = express();



// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));


// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json('Server Start...');
})

// routes middleware autoloading
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));


// port
const port = process.env.PORT || 8000;



app.listen(port, () => console.log(`Server is running on port ${port}`));








