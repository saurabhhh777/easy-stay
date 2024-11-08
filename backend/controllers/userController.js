const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateRandomOTP } = require("../utils/generateRandomOTP");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

module.exports.registerController = async function (req, res) {
  let { name, email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (user)
      return res.status(409).json({ message: "You are already registered" });
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    user = await userModel.create({
      name,
      email,
      password: hash,
    });
    let token = jwt.sign({ name, email }, process.env.JWT_KEY);
    res.cookie("token", token);
    if (user) {
      const otp = generateRandomOTP();
      user.verificationToken = otp;
      await user.save();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "priyanjal362@gmail.com",
          pass: "mvxv vckk bvvw xwco",
        },
      });

      const mailOptions = {
        from: "priyanjal362@gmail.com",
        to: email,
        subject: "Email Verification - Your OTP Code",
        text: `Your OTP code is: ${otp}`,
      };

      await transporter.sendMail(mailOptions);

      res.status(201).json({
        message: "Check your email for verification",
      });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.verifyEmailController = async function (req, res) {
  let { email, otp } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (otp.toString() === user.verificationToken.toString()) {
      user.isVerified = true;
      user.verificationToken = null;
      await user.save();
      return res.status(200).json({ message: "Email Verified Successfully" });
    }
    return res.status(400).json({ message: "Incorrect OTP provided" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.loginController = async function (req, res) {
  let { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "You are not registered" });
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign({ email, name: user.name }, process.env.JWT_KEY);
        res.cookie("token", token);
        return res.status(200).json({ message: "You are logged in" });
      } else {
        return res.status(401).json({ message: "Incorrect password" });
      }
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.logoutController = function (req, res) {
  try {
    res.cookie("token", "");
    res.status(200).json({ message: "You are logged out" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.forgotPasswordController = async function (req, res) {
  let { email } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "User with this email not found" });
    let resettoken = crypto.randomBytes(10).toString("hex");
    user.resetPasswordToken = resettoken;
    await user.save();
    let resetUrl = `http://localhost:5173/reset-password/${resettoken}`;
    res
      .status(200)
      .json({ resetUrl,resettoken });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.resetPasswordController = async function (req, res) {
  let { password } = req.body;
  try {
    let user = await userModel.findOne({
      resetPasswordToken: req.params.token,
    });
    if (!user)
      return res.status(404).json({ message: "User with the token not found" });
    let newSalt = await bcrypt.genSalt(10);
    let newHash = await bcrypt.hash(password, newSalt);
    user.password = newHash;
    user.resetPasswordToken = null;
    await user.save();
    res.status(200).json({ message: "Password Reset Successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.getLoggedinUserController = async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
