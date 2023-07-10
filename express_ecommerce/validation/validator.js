const {check,validationResult}= require('express-validator')

exports.categoryValidation=[
    check('category_name','category is mandatory').notEmpty()
    .isLength({min:3}).withMessage('category name must be at least 3 characters')
]

exports.productValidation=[
    check('product_name','product name is required').notEmpty()
    .isLength({min:3})
    .withMessage('product name must be at leats 3 characters'),
    check('product_price','price is required').notEmpty()
    .isNumeric().withMessage('price must be a numeric value'),
    check('countInStock','stock is required').notEmpty()
    .isNumeric().withMessage('stock must be a numeric value'),
    check('product_description','description is required')
    .isLength({min:20})
    .withMessage('description must at least 20 characters'),
    check('category','category is required').notEmpty()
]

exports.userValidation=[
    check('name','name is required').notEmpty()
    .isLength({min:3})
    .withMessage('name must be at leats 3 characters'),
    check('email','email is required').notEmpty()
    .isEmail().withMessage('Email format incorrect'),
    check('password','password is required').notEmpty()
    .matches(/[a-z]/).withMessage('password must consist at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('password must consist at least one uppercase letter')
    .matches(/[0-9]/).withMessage('password must consist at least one numeric value')
    .matches(/[@#-_$?!.]/).withMessage('password must consist at least one special character')
    .isLength({min:8}).withMessage('password must be of at least 8 characters')
]

exports.passwordValidation=[
    check('password','password is required').notEmpty()
    .matches(/[a-z]/).withMessage('password must consist at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('password must consist at least one uppercase letter')
    .matches(/[0-9]/).withMessage('password must consist at least one numeric value')
    .matches(/[@#-_$?!.]/).withMessage('password must consist at least one special character')
    .isLength({min:8}).withMessage('password must be of at least 8 characters')
]



exports.validation=(req,res,next)=>{
    const errors=validationResult(req)
    if(errors.isEmpty()){
        next()
    }
    else{
        return res.status(400).json({error:errors.array()[0].msg})
    }
}
