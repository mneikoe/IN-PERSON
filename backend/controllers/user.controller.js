const { validationResult } = require("express-validator");
const userModel = require("../models/User");
const userService = require("../services/user.service");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, password, email } = req.body;
  isUserAlreadyRegistered = await userModel.findOne({ email: email });
  if (isUserAlreadyRegistered) {
    return res
      .status(400)
      .json({ message: "User already registered with this email" });
  }
  const hashedPassword = await userModel.hashPassword(password);
  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });
  const token = user.generateAuthToken();
  res
    .status(201)
    .json({ message: "User registered successfully", user, token });
};
module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password " });
  }
  const isPasswordValid = await user.comparepassword(password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const token = user.generateAuthToken();
  res.status(200).json({ message: "User logged in successfully", user, token });
};
module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json({ user: req.user });
};
