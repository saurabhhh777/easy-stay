const express = require('express')
const router = express.Router()
const { registerController, verifyEmailController, loginController, logoutController, forgotPasswordController, resetPasswordController, getLoggedinUserController } = require('../controllers/userController')
const { isLoggedin } = require('../middlewares/isLoggedin')

router.post("/register",registerController)

router.post("/verify-email",verifyEmailController)

router.post("/login",loginController)

router.get("/logout",logoutController)

router.post("/forgot-password",forgotPasswordController)

router.post("/reset-password/:token",resetPasswordController)

router.get("/profile",isLoggedin,getLoggedinUserController)

module.exports = router