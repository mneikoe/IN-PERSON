const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackListTokenModel = require("../models/blacklistToken.model");
//const captainModel = require("../models/captain.model");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const isBlacklisted = await blackListTokenModel.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    /*if(!user){
            return res.status(401).json({message:'Unauthorized'})
        }*/
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
