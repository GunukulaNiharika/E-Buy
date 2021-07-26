const jwt = require('jsonwebtoken'); // to generate token
const bcrypt = require('bcrypt'); // encrypt password
// Check validation for requests
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar'); // get user image by email
const User= require('../../models/User')

module.exports.validateUserRegister=[
    check('firstName', 'Name is required').not().isEmpty(),
    check('lastName', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('username', 'please enter a username with 8 or more characters')
    .isLength({min:8,}),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
]

module.exports.validateUserLogin=[
    // Validation for email and password
    check('email', 'please include a valid email').isEmail(),
    check('password', 'password is required').exists()
]

module.exports.checkUser= async (req,res)=> {
    try{
        const user=await User.findById(req.user.id).select('-password')
        res.json(user)
    }
    catch(error){
        console.log(error.message);
        res.status(500).send('Server error');
    }
}

module.exports.register_post= async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    const { firstName, lastName, username, email, password } = req.body;
    try{
        let user= await User.findOne({email});
        if(user){
            return res.status(400).json({
                errors:[{
                    msg: 'Admin already exists',
                }],
            });
        }
        const avatar=gravatar.url(email,{
            s: '200', // Size
            r: 'pg', // Rate,
            d: 'mm',
        });
        const role='admin';
        user = new User({
            firstName,
            lastName,
            username,
            email,
            password,
            avatar,
            role,
        });

        const salt = await bcrypt.genSalt(10); // generate salt contains 10
        // save password
        user.password = await bcrypt.hash(password, salt); // use user password and salt to hash password
        //save user in databasw
        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign( payload, process.env.jwt_secret,{ expiresIn: 360000,},(err,token)=>{
            if(err) throw err;
            res.json({token});
        });
    }
    catch(error){
        console.log(error.message);
        res.status(500).send('Server error');
    }
}

module.exports.login_post= async(req,res)=>{
    const errors=validationResult(req);
    // If error 
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    const { email,password } = req.body;
    try{
        let user= await User.findOne({email});
        if(!user){
            return res.status(400).json({
                errors:[{
                    msg: 'Invalid credentials',
                }],
            });
        }
        // Know user founded by email let's compare passwords
        const isMatch= await bcrypt.compare(password,user.password);
        // passwords don't match
        if(!isMatch && user.role=='admin'){
            return res.status(400).json({
                errors: [{
                  msg: 'Invalid credentials'
                }]
              })
        }
        const payload = {
            user: {
              id: user.id
            }
        }
        jwt.sign( payload, process.env.jwt_secret,{ expiresIn: 360000,},(err,token)=>{
            if(err) throw err;
            res.json({token});
        });
    }
    catch(error){
        console.log(err.message);
        res.status(500).send('Server error');
    }

}