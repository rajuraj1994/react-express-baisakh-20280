const express=require('express')
const { postUser, postEmailConfirmation, signIn, forgetPassword, resetPassword, userList, userDetails, requireSignin, signout } = require('../controllers/authController')
const { userValidation, validation, passwordValidation } = require('../validation/validator')
const router=express.Router()


router.post('/postuser',userValidation,validation,postUser)
router.post('/confirmation/:token',postEmailConfirmation)
router.post('/signin',signIn)
router.post('/forgetpassword',forgetPassword)
router.put('/resetpassword/:token',passwordValidation,validation, resetPassword)
router.get('/userlist',requireSignin,userList)
router.get('/userdetails/:id',requireSignin,userDetails)
router.post('/signout',requireSignin,signout)

module.exports=router 
