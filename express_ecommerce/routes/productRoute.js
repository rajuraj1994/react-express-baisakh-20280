const express=require('express')
const { postProduct, productList, productDetails, updateProduct, deleteProduct } = require('../controllers/productController')
const upload=require('../middleware/file-upload')
const router= express.Router()
const {productValidation,validation} =require('../validation/validator')
const { requireSignin } = require('../controllers/authController')


router.post('/postproduct',requireSignin,upload.single('product_image'),productValidation,validation,postProduct)
router.get('/productlist',productList)
router.get('/productdetails/:id',productDetails)
router.put('/updateproduct/:id',requireSignin,upload.single('product_image'),updateProduct)
router.delete('/deleteproduct/:id',requireSignin,deleteProduct)

module.exports= router