const User = require('../models/authModel')
const Token=require('../models/tokenModel')
const crypto=require('crypto')
const sendEmail=require('../utils/setEmail')
const jwt=require('jsonwebtoken') // authentication
const {expressjwt}=require('express-jwt') // authorization

// to register user
exports.postUser = async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    // to check if email already registered 
    User.findOne({ email: user.email })
        .then(async data => {
            if (data) {
                return res.status(400).json({ error: 'email must be unique' })
            }
            else {
                user = await user.save();
                if (!user) {
                    return res.status(400).json({ error: 'something went wrong' });
                }
                let token=new Token({
                    token:crypto.randomBytes(16).toString('hex'),
                    userId:user._id
                })
                token = await token.save()
                if(!token){
                    return res.status(400).json({error:'failed to create token'})
                }
                //send Email process 
                const url=process.env.FRONTEND_URL+'\/email\/confirmation\/'+token.token
                //http:localhost:3000/email/confirmation/6y62
                sendEmail({
                    from:'no-reply@expresscommerce.com',
                    to:user.email,
                    subject:'Email Verification Link',
                    text:`Hello, \n\n 
                    Please verify your email by click in the below link:\n\n
                    http:\/\/${req.headers.host}\/api\/confirmation\/${token.token}
                    `,
                    html:`
                    <h1>Verify Your Email Account</h1>
                    <a href="${url}"> Click to verify </a>
                    `
                })

                res.send(user);
            }
        })
        .catch(err => {
            return res.status(400).json({error:err})
        })
}

// confirming the email 
exports.postEmailConfirmation=(req,res)=>{
 // at first find the valid or matching token 
 Token.findOne({token:req.params.token})
 .then(token=>{
    if(!token){
        return res.status(400).json({error:'invalid token or token may have expired'})
    }
    //if we found the vaild token then find the valid user for that token
    User.findOne({_id:token.userId})
    .then(user=>{
        if(!user){
            return res.status(400).json({error:'we are unable to find the valid user for this token'})
        }
        // check if user is already verified or not
        if(user.isVerified){
            return res.status(400).json({error:'email is already verified,login to continue'})
        }
        // save the verified user 
        user.isVerified=true
        user.save()
    .then(user =>{
        if(!user){
            return res.status(400).json({error:'failed to verify your email,try again'})
           }
           res.json({message:'congrats,your email has been verified successfully'})
    })
    .catch(err=>{
        return res.status(400).json({error:err})
    })
    })
    .catch(err=>{
        return res.status(400).json({error:err})
    })
 })
 .catch(err=>{
    return res.status(400).json({error:err})
 })   
}

//signin process 
exports.signIn=async(req,res)=>{
    const{email,password}=req.body 
    // at first check email is registered in database or not
    const user= await User.findOne({email})
    if(!user){
        return res.status(400).json({error:'sorry the email you provided not found in our system, please try another'})
    } 
    // if email found then check password  for that email 
    if(!user.authenticate(password)){
        return res.status(400).json({error:'email or password doesnot match'})
    }
    // check if user is verified or not 
    if(!user.isVerified){
        return res.status(400).json({error:'verify your email first to continue'})
    }
    // now generate token with user id and jwt secret
    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET)
    // store token in the cookie
    res.cookie('myCookie',token,{expire:Date.now()+99999})
    //return user information to frontend 
    const{_id,name,role}=user
    return res.json({token,user:{name,email,role,_id}})
}

//forget password
exports.forgetPassword=async(req,res)=>{
    const user= await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).json({error:'sorry the email you provided not found in our system, please try another'})
    }
    let token= new Token({
        userId:user._id,
        token:crypto.randomBytes(16).toString('hex')
    })
    token = await token.save()
    if(!token){
        return res.status(400).json({error:'failed to create a token'})
    }
    //send Email process 
    sendEmail({
        from:'no-reply@expresscommerce.com',
        to:user.email,
        subject:'Password Reset Link',
        text:`Hello, \n\n 
        Please reser your password by click in the below link:\n\n
        http:\/\/${req.headers.host}\/api\/resetpassword\/${token.token}
        `
    })
    res.json({message:'password reset link has been sent to your email'})
}

//reset password 
exports.resetPassword=async(req,res)=>{
    // find the valid token 
    let token = await Token.findOne({token:req.params.token})
    if(!token){
        return res.status(400).json({error:'invalid token or token may have expired'})
    }
    //if token found then find the valid user for that token 
    let user= await User.findOne({_id:token.userId})
    if(!user){
        return res.status(400).json({error:'we are unable to find the valid user for this token'}) 
    }
    user.password=req.body.password

    user= await user.save()
    if(!user){
        return res.status(500).json({error:'failed to reset password'})
    }
    res.json({message:'password has been reset  successfully, login to continue'})
}
// user list 
exports.userList=async(req,res)=>{
    const user= await User.find()
    .select('-hashed_password')
    .select('-salt')
    if(!user){
        return res.status(400).json({error:'something went wrong'})
    }
    res.send(user)
}

//user details 
exports.userDetails=async(req,res)=>{
    const user= await User.findById(req.params.id)
    .select('-hashed_password')
    .select('-salt')
    if(!user){
        return res.status(400).json({error:'something went wrong'})
    }
    res.send(user)
}

//require signin 
exports.requireSignin=expressjwt({
    secret:process.env.JWT_SECRET,
    algorithms: ["HS256"] 
})

//signout 
exports.signout=(req,res)=>{
    res.clearCookie('myCookie')
    res.json({message:'signout success'})
}
// Middleware for user role
exports.requireUser = (req, res, next) => {
  // Verify the JWT
  expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
  })(req, res, (err) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check the user's role
    if (req.user.role === 0) {
      // User role, grant access
      next();
    } else {
      // Unauthorized role
      return res.status(403).json({ error: 'Forbidden' });
    }
  });
};

// Middleware for admin role
exports.requireAdmin = (req, res, next) => {
  // Verify the JWT
  expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
  })(req, res, (err) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check the user's role
    if (req.user.role === 1) {
      // Admin role, grant access
      next();
    } else {
      // Unauthorized role
      return res.status(403).json({ error: 'Forbidden' });
    }
  });
};
