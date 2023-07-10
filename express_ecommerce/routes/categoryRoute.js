const express=require('express')
const { testFunction, postCategory, categoryList, categoryDetails, updateCategory, deleteCategory } = require('../controllers/categoryController')
const router=express.Router()
const {categoryValidation,validation} =require('../validation/validator')
const { requireSignin } = require('../controllers/authController')


router.get('/demo',testFunction)
router.post('/postcategory',requireSignin,categoryValidation,validation,postCategory)
router.get('/categorylist',categoryList)
router.get('/categorydetails/:id', categoryDetails)
router.put('/updatecategory/:id',requireSignin,updateCategory)
router.delete('/deletecategory/:id',requireSignin,deleteCategory)

module.exports=router 

