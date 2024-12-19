// first step is require express and then call express like app = express();
// secondly require cors and use it
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const userRoutes = require("./routes/user.route");
//
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//

const connectToDb = require("./db/db");
connectToDb();

app.get("/", (req, res) => {
  res.send("welcome to IN-PERSON api");
});
app.use("/user", userRoutes);
module.exports = app;
