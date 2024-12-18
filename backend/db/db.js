const mongoose = require("mongoose");

const uri = "mongodb://0.0.0.0/In-Person-Domain";

function connectToDb() {
  try {
    mongoose.connect(uri);
    console.log("successfully connected to database " + uri);
  } catch (error) {
    console.log("error connecting to database " + error);
  }
}
module.exports = connectToDb;
