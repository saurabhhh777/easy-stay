module.exports.generateRandomOTP = function () {
  const otp = Math.floor(100000 + Math.random() * 900000); 
  return otp.toString();
};
