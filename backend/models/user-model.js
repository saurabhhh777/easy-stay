const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "https://example.com/default-profile.png",
    },
    verificationToken: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
